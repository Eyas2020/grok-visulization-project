import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AmbientEngine, MAX_VOLUME } from "@/lib/ambient-audio";

const STORAGE_KEY = "invisible-thread:sound";

type SoundPrefs = { muted: boolean; volume: number };

function readPrefs(): SoundPrefs | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SoundPrefs>;
    return {
      muted: parsed.muted === true,
      volume: typeof parsed.volume === "number" ? Math.min(1, Math.max(0, parsed.volume)) : 1,
    };
  } catch {
    return null;
  }
}

function writePrefs(prefs: SoundPrefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage can be unavailable (private mode); the choice just won't persist.
  }
}

export function AmbientSound() {
  const engineRef = useRef<AmbientEngine | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const resumeOnVisibleRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const prefsRef = useRef<SoundPrefs>({ muted: false, volume: 1 });

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new AmbientEngine();
      engineRef.current.setVolume(prefsRef.current.volume * MAX_VOLUME);
    }
    return engineRef.current;
  }, []);

  const startPlayback = useCallback(() => {
    void getEngine().play(2);
    setPlaying(true);
    setUnlocked(true);
    setShowPrompt(false);
  }, [getEngine]);

  const persist = useCallback((next: Partial<SoundPrefs>) => {
    prefsRef.current = { ...prefsRef.current, ...next };
    writePrefs(prefsRef.current);
  }, []);

  useEffect(() => {
    const stored = readPrefs();
    if (stored) {
      prefsRef.current = stored;
      setMuted(stored.muted);
      setVolume(stored.volume);
    } else {
      setShowPrompt(true);
    }
    setMounted(true);
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mounted || unlocked) return;

    const ignoredKeys = new Set(["Escape", "Shift", "Control", "Alt", "Meta", "Tab"]);

    const handleGesture = (event: Event) => {
      if (event.target instanceof Node && rootRef.current?.contains(event.target)) return;
      if (event instanceof KeyboardEvent && ignoredKeys.has(event.key)) return;

      setUnlocked(true);
      setShowPrompt(false);
      if (prefsRef.current.muted) return;
      persist({ muted: false });
      startPlayback();
    };

    const options = { capture: true } as const;
    window.addEventListener("click", handleGesture, options);
    window.addEventListener("touchend", handleGesture, options);
    window.addEventListener("keydown", handleGesture, options);
    return () => {
      window.removeEventListener("click", handleGesture, options);
      window.removeEventListener("touchend", handleGesture, options);
      window.removeEventListener("keydown", handleGesture, options);
    };
  }, [mounted, unlocked, persist, startPlayback]);

  useEffect(() => {
    const handleVisibility = () => {
      const engine = engineRef.current;
      if (!engine) return;
      if (document.hidden) {
        if (engine.isPlaying) {
          resumeOnVisibleRef.current = true;
          void engine.pause(0.25);
        }
      } else if (resumeOnVisibleRef.current) {
        resumeOnVisibleRef.current = false;
        if (!prefsRef.current.muted) void engine.play(1.2);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const toggleSound = () => {
    if (playing) {
      setMuted(true);
      setPlaying(false);
      persist({ muted: true });
      resumeOnVisibleRef.current = false;
      void engineRef.current?.pause(0.8);
    } else {
      setMuted(false);
      persist({ muted: false });
      startPlayback();
    }
  };

  const changeVolume = (next: number) => {
    setVolume(next);
    persist({ volume: next });
    getEngine().setVolume(next * MAX_VOLUME);
  };

  if (!mounted) return null;

  const percent = Math.round(volume * 100);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6"
    >
      {showPrompt && (
        <button
          type="button"
          onClick={() => {
            persist({ muted: false });
            setMuted(false);
            startPlayback();
          }}
          className="sound-prompt rounded-full border border-thread/30 bg-forest/80 px-3.5 py-1.5 text-xs tracking-wide text-cream/85 shadow-lg backdrop-blur-md hover:text-cream"
        >
          Tap to enable sound
        </button>
      )}

      <div className="flex items-center gap-1 rounded-full border border-cream/10 bg-canopy/85 py-1 pr-3 pl-1 text-cream shadow-lg shadow-black/30 backdrop-blur-md">
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-[460] tracking-wide text-cream/90 transition-colors hover:bg-cream/10 hover:text-cream"
        >
          {playing ? (
            <Volume2 className="size-4 text-thread" aria-hidden="true" />
          ) : (
            <VolumeX className="size-4 text-mist" aria-hidden="true" />
          )}
          <span>{playing ? "Sound on" : "Sound off"}</span>
          <span className="sr-only">
            {playing ? ", mute background music" : ", play background music"}
          </span>
        </button>

        <label className="flex items-center">
          <span className="sr-only">Background music volume</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={percent}
            aria-valuetext={`${percent}%`}
            onChange={(event) => changeVolume(Number(event.target.value) / 100)}
            className={`h-1 w-16 cursor-pointer accent-thread transition-opacity sm:w-20 ${
              playing && !muted ? "opacity-100" : "opacity-50"
            }`}
          />
        </label>
      </div>
    </div>
  );
}
