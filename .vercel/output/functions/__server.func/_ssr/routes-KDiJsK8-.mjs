import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ArrowDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KDiJsK8-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BEATS = [
	{
		n: "01",
		src: "/essay/forest.jpg",
		alt: "A standing forest beside a field of fresh stumps at dawn",
		title: "A forest is cut down.",
		body: "Habitat shrinks. What lived in the canopy has fewer places left to go."
	},
	{
		n: "02",
		src: "/essay/bats.jpg",
		alt: "Fruit bats flying at dusk from a tree line toward a lit farmhouse",
		title: "Stressed bats move closer to farms.",
		body: "Not out of malice. Out of hunger, heat, and nowhere else to roost."
	},
	{
		n: "03",
		src: "/essay/livestock.jpg",
		alt: "Cattle in a wooden pen beside a farmhouse at twilight",
		title: "A virus finds livestock.",
		body: "A new host. A short distance. A shared fence line."
	},
	{
		n: "04",
		src: "/essay/hospital.jpg",
		alt: "A quiet hospital corridor with stretchers and a cart of supply boxes",
		title: "Then the chain reaches us.",
		body: "Supply lines stutter. Halls that were empty start to fill."
	}
];
var LEGS = [
	{
		id: "human",
		src: "/essay/human.jpg",
		alt: "Two pairs of hands meeting across a wooden table beside a glass of water",
		kicker: "Human health",
		title: "People",
		short: "Us, our communities, and our well-being.",
		long: "The clinic is where illness becomes visible. It is rarely where it begins. Personal health and public health both sit on this leg — and both depend on the other two staying standing."
	},
	{
		id: "animal",
		src: "/essay/animal.jpg",
		alt: "A fruit bat hanging from a branch above a calf grazing at golden hour",
		kicker: "Animal health",
		title: "Animals",
		short: "Wildlife, livestock, and the animals beside us.",
		long: "More than six in ten known infectious diseases in people can spread from animals. Three in four new or emerging ones start there. Care for the bat and the herd is care for the person who never meets either."
	},
	{
		id: "place",
		src: "/essay/soil.jpg",
		alt: "A hand holding dark soil above a clear forest stream",
		kicker: "Environmental health",
		title: "Places",
		short: "Water, living soil, forests, a stable climate.",
		long: "Cut the forest, drain the stream, exhaust the soil, and the other two legs carry a weight they were never built for. The place is not a backdrop. It is a leg of the tripod."
	}
];
function ThreadEssay() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [leg, setLeg] = (0, import_react.useState)("animal");
	const [motion, setMotion] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setMotion(!mq.matches);
		apply();
		mq.addEventListener("change", apply);
		const onScroll = () => {
			const el = document.documentElement;
			const max = el.scrollHeight - el.clientHeight;
			setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			mq.removeEventListener("change", apply);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	const active = LEGS.find((item) => item.id === leg) ?? LEGS[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 top-0 z-40 h-1 bg-canopy",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full w-full origin-left bg-thread",
				style: { transform: `scaleX(${progress})` }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative min-h-svh bg-forest text-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 overflow-hidden",
				children: [motion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "h-full w-full object-cover",
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					poster: "/essay/hero.jpg",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: "/essay/hero.mp4",
						type: "video/mp4"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/essay/hero.jpg",
					alt: "",
					className: "h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim absolute inset-0" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-svh max-w-5xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-xs font-medium uppercase tracking-widest text-thread",
						children: "One Health · a field note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-display text-5xl font-medium leading-none text-balance text-cream md:text-7xl",
						children: "The Invisible Thread"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl font-display text-xl font-medium italic leading-snug text-cream text-balance md:text-2xl",
						children: "Why your health depends on a bat, the food on your plate, a patch of soil — and a medicine in your cabinet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#story",
						className: "mt-10 inline-flex w-fit items-center gap-2 border border-thread/50 px-4 py-3 font-sans text-sm text-cream transition-colors duration-200 hover:border-thread hover:text-thread",
						children: ["Follow the thread", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
							className: "size-4",
							"aria-hidden": true
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "story",
			className: "bg-cream text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-xs font-medium uppercase tracking-widest text-thread-deep",
						children: "Zoom out"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "drop mt-6 font-display text-2xl leading-relaxed text-pretty md:text-3xl",
						children: "You’ve probably heard of public health. You might even be familiar with personal health. Then you step back, and a third fact appears: human health does not live in a vacuum."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-sans text-lg leading-relaxed text-pretty text-moss",
						children: "The health of people, animals, and the environment we share is one story. One Health is the name for refusing to tell it in pieces."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-forest text-cream",
			"aria-labelledby": "tuesday-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-xs font-medium uppercase tracking-widest text-thread",
						children: "Picture this"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "tuesday-title",
						className: "mt-4 max-w-xl font-display text-4xl font-medium leading-tight text-balance md:text-5xl",
						children: "Four moves. One chain."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-14 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16",
						children: BEATS.map((beat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
								className: "frame-wide overflow-hidden bg-canopy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: beat.src,
									alt: beat.alt,
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-sans text-xs tracking-widest text-thread",
								children: beat.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl font-medium leading-snug text-balance",
								children: beat.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md font-sans text-base leading-relaxed text-mist",
								children: beat.body
							})
						] }, beat.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "mx-auto mt-20 max-w-3xl border-t border-thread/40 pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl font-medium italic leading-snug text-balance md:text-4xl",
							children: "It sounds like a thriller. On this planet, it is just another Tuesday."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl font-sans text-base leading-relaxed text-mist",
							children: "This is the pattern behind real spillovers — a forest lost, wildlife displaced, a jump into livestock, then into people and the systems that feed and treat them."
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "takeaway",
			className: "bg-cream text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-xs font-medium uppercase tracking-widest text-thread-deep",
						children: "The takeaway"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-balance md:text-5xl",
						children: "Think of it as a tripod."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl font-sans text-lg leading-relaxed text-moss",
						children: "If one leg breaks, the whole structure falls. These are not three stories. They are the same story, told from three angles."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 600 120",
								className: "mx-auto mb-2 hidden w-full max-w-3xl text-thread-deep md:block",
								"aria-hidden": true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "300",
										y1: "22",
										x2: "100",
										y2: "112",
										stroke: "currentColor",
										strokeWidth: "1.25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "300",
										y1: "22",
										x2: "300",
										y2: "112",
										stroke: "currentColor",
										strokeWidth: "1.25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "300",
										y1: "22",
										x2: "500",
										y2: "112",
										stroke: "currentColor",
										strokeWidth: "1.25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "300",
										cy: "22",
										r: "7",
										fill: "currentColor"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 text-center font-display text-lg font-medium tracking-wide text-thread-deep md:absolute md:inset-x-0 md:top-0",
								children: "One Health"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-3",
								role: "tablist",
								"aria-label": "The three legs of One Health",
								children: LEGS.map((item) => {
									const on = item.id === leg;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "tab",
										"aria-selected": on,
										onClick: () => setLeg(item.id),
										className: `border bg-paper text-left transition-colors duration-200 ${on ? "border-thread-deep" : "border-line hover:border-moss"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
											className: "frame-tall overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.src,
												alt: item.alt,
												className: "h-full w-full object-cover"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-4 py-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-sans text-xs uppercase tracking-widest text-thread-deep",
													children: item.kicker
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-1 font-display text-2xl font-medium",
													children: item.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 font-sans text-sm leading-relaxed text-moss",
													children: item.short
												})
											]
										})]
									}, item.id);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border border-line bg-paper px-5 py-6 md:px-8",
						role: "tabpanel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sans text-xs uppercase tracking-widest text-thread-deep",
							children: active.kicker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-3xl font-display text-2xl leading-snug text-balance md:text-3xl",
							children: active.long
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-3xl font-sans text-sm leading-relaxed text-moss",
						children: "The animal-health figures are the U.S. CDC’s: more than 6 of every 10 known infectious diseases in people can spread from animals, and 3 of every 4 new or emerging infectious diseases in people come from animals."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-canopy text-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-sans text-xs font-medium uppercase tracking-widest text-thread",
						children: "Together"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl font-medium leading-tight text-balance md:text-5xl",
						children: "Let’s build a healthier future, together."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-sans text-lg leading-relaxed text-pretty text-mist",
						children: "Protecting our health no longer starts only at the clinic door. It starts in the fields, the forests, and our backyards."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-sans text-lg leading-relaxed text-pretty text-mist",
						children: "This space is here to explore how the planet, animals, and we ourselves can keep thriving — as one story, not three."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-sans text-lg leading-relaxed text-pretty text-mist",
						children: "Stay for the deep dives: practical insight, and stories where nature, animals, and human health meet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 font-display text-2xl italic leading-snug text-balance",
						children: "If this stayed with you, subscribe on Substack — or follow along on LinkedIn — so the next thread doesn’t pass you by."
					})
				]
			})
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadEssay, {});
}
//#endregion
export { Home as component };
