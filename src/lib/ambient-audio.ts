export const MAX_VOLUME = 0.4;

type DroneVoice = { frequency: number; type: OscillatorType; level: number };

const DRONE_VOICES: DroneVoice[] = [
  { frequency: 73.42, type: "sine", level: 0.32 },
  { frequency: 110.0, type: "triangle", level: 0.14 },
  { frequency: 146.83, type: "sine", level: 0.2 },
  { frequency: 164.81, type: "sine", level: 0.1 },
  { frequency: 185.0, type: "triangle", level: 0.08 },
  { frequency: 220.0, type: "sine", level: 0.1 },
  { frequency: 329.63, type: "sine", level: 0.035 },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

type AudioSessionNavigator = Navigator & { audioSession?: { type: string } };

/**
 * Generative ambient pad: detuned sine/triangle drones through a slowly
 * sweeping low-pass, plus band-passed pink-noise "wind". Every source is an
 * oscillator or a crossfaded looping buffer, so playback never has a seam.
 */
export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private targetVolume = MAX_VOLUME;
  private wantsPlayback = false;

  get isPlaying() {
    return this.wantsPlayback;
  }

  setVolume(volume: number) {
    this.targetVolume = clamp(volume, 0, MAX_VOLUME);
    if (this.wantsPlayback) this.rampTo(this.targetVolume, 0.15);
  }

  /** Must first be called from within a user gesture so the context can unlock. */
  async play(fadeSeconds = 2) {
    this.wantsPlayback = true;
    const ctx = this.ensureGraph();
    if (ctx.state !== "running") {
      try {
        await ctx.resume();
      } catch {
        return;
      }
    }
    if (this.wantsPlayback) this.rampTo(this.targetVolume, fadeSeconds);
  }

  async pause(fadeSeconds = 0.8) {
    this.wantsPlayback = false;
    const ctx = this.ctx;
    if (!ctx) return;
    this.rampTo(0, fadeSeconds);
    await wait(fadeSeconds * 1000 + 60);
    if (!this.wantsPlayback && ctx.state === "running") await ctx.suspend();
  }

  dispose() {
    this.wantsPlayback = false;
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
  }

  private rampTo(target: number, seconds: number) {
    if (!this.ctx || !this.master) return;
    const gain = this.master.gain;
    const now = this.ctx.currentTime;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(clamp(target, 0, MAX_VOLUME), now + seconds);
  }

  private ensureGraph(): AudioContext {
    if (this.ctx) return this.ctx;

    // Lets iOS Safari play Web Audio even when the ringer switch is silent.
    const nav = navigator as AudioSessionNavigator;
    if (nav.audioSession) nav.audioSession.type = "playback";

    const ctx = new AudioContext({ latencyHint: "playback" });
    const master = ctx.createGain();
    master.gain.value = 0;

    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -12;
    limiter.knee.value = 12;
    limiter.ratio.value = 4;
    limiter.attack.value = 0.05;
    limiter.release.value = 0.5;

    limiter.connect(master);
    master.connect(ctx.destination);

    this.buildPad(ctx, limiter);
    this.buildWind(ctx, limiter);

    this.ctx = ctx;
    this.master = master;
    return ctx;
  }

  private lfo(ctx: AudioContext, rate: number, depth: number, target: AudioParam) {
    const osc = ctx.createOscillator();
    osc.frequency.value = rate;
    const amount = ctx.createGain();
    amount.gain.value = depth;
    osc.connect(amount).connect(target);
    osc.start();
  }

  private buildPad(ctx: AudioContext, output: AudioNode) {
    const bus = ctx.createGain();
    bus.gain.value = 0.55;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.7;
    this.lfo(ctx, 0.031, 420, filter.frequency);
    this.lfo(ctx, 0.0127, 180, filter.frequency);

    bus.connect(filter).connect(output);

    for (const voice of DRONE_VOICES) {
      const voiceGain = ctx.createGain();
      voiceGain.gain.value = voice.level * 0.7;
      this.lfo(ctx, 0.02 + Math.random() * 0.05, voice.level * 0.3, voiceGain.gain);
      voiceGain.connect(bus);

      for (const cents of [-4, 4]) {
        const osc = ctx.createOscillator();
        osc.type = voice.type;
        osc.frequency.value = voice.frequency;
        osc.detune.value = cents;
        const half = ctx.createGain();
        half.gain.value = 0.5;
        osc.connect(half).connect(voiceGain);
        osc.start();
      }
    }
  }

  private buildWind(ctx: AudioContext, output: AudioNode) {
    const source = ctx.createBufferSource();
    source.buffer = createLoopingPinkNoise(ctx, 12, 1.5);
    source.loop = true;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 520;
    band.Q.value = 0.8;
    this.lfo(ctx, 0.047, 280, band.frequency);
    this.lfo(ctx, 0.109, 110, band.frequency);

    const soften = ctx.createBiquadFilter();
    soften.type = "lowpass";
    soften.frequency.value = 1800;

    const gust = ctx.createGain();
    gust.gain.value = 0.17;
    this.lfo(ctx, 0.038, 0.09, gust.gain);

    source.connect(band).connect(soften).connect(gust).connect(output);
    source.start();
  }
}

/** Pink noise whose tail is crossfaded into its head, so `loop = true` is seamless. */
function createLoopingPinkNoise(ctx: AudioContext, seconds: number, fadeSeconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const fade = Math.floor(ctx.sampleRate * fadeSeconds);
  const raw = new Float32Array(length + fade);

  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < raw.length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    if (i < fade) {
      const t = i / fade;
      data[i] = raw[i] * Math.sqrt(t) + raw[length + i] * Math.sqrt(1 - t);
    } else {
      data[i] = raw[i];
    }
  }
  return buffer;
}
