import { Link } from "@tanstack/react-router";
import {
	Cloud,
	Cpu,
	Database,
	Layers,
	PhoneCall,
	Printer,
	Sparkles,
	Workflow,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "#/components/ui/button";
import ScrollFloat from "#/components/ui/scroll_float";
import { Nodejs } from "#/components/ui/svgs/nodejs";
import { ReactDark } from "#/components/ui/svgs/reactDark";
import { ReactLight } from "#/components/ui/svgs/reactLight";
import { Typescript } from "#/components/ui/svgs/typescript";
import { SMOOTH_SCROLL } from "./shared";

const SKILL_BARS = [
	{
		label: "Backend & Cloud — Node.js / Express / Firebase / AWS / Stripe",
		value: 92,
	},
	{
		label: "Mobile & Telephony — React Native / Twilio WebRTC / BLE Printing",
		value: 90,
	},
	{
		label: "Frontend & Real-Time — React / Vite / Socket.io / KLineChart",
		value: 88,
	},
];

function StackTile({ name, children }: { name: string; children: ReactNode }) {
	return (
		<div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg">
			<span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/80 p-1.5 dark:bg-white/10 dark:p-1.5 [&_svg]:size-full">
				{children}
			</span>
			<span className="text-sm font-semibold">{name}</span>
		</div>
	);
}

export function Skills() {
	return (
		<section id="skills" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<ScrollFloat textClassName="font-bold">Tech stack & skills</ScrollFloat>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Comprehensive production toolchain across mobile engineering, cloud
					telephony, backend monoliths, and real-time financial charting.
				</p>

				{/* Key stack tiles */}
				<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
					<StackTile name="Node.js 22">
						<Nodejs />
					</StackTile>
					<StackTile name="TypeScript">
						<Typescript />
					</StackTile>
					<StackTile name="ReactJS">
						<ReactLight className="dark:hidden" />
						<ReactDark className="hidden dark:block" />
					</StackTile>
					<StackTile name="React Native">
						<ReactLight className="dark:hidden" />
						<ReactDark className="hidden dark:block" />
					</StackTile>
					<StackTile name="Twilio / WebRTC">
						<PhoneCall className="size-5 text-foreground" />
					</StackTile>
					<StackTile name="Firebase RTDB">
						<Database className="size-5 text-foreground" />
					</StackTile>
					<StackTile name="AWS S3 / CF">
						<Cloud className="size-5 text-foreground" />
					</StackTile>
					<StackTile name="Socket.io">
						<Workflow className="size-5 text-foreground" />
					</StackTile>
					<StackTile name="OpenAI / Gemini">
						<Sparkles className="size-5 text-foreground" />
					</StackTile>
					<StackTile name="Thermal Printing">
						<Printer className="size-5 text-foreground" />
					</StackTile>
				</div>

				{/* 4 Detailed Skill Groups matching cv.tex */}
				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<div className="flex items-center gap-2 text-primary">
							<Cpu className="size-4" />
							<h3 className="text-sm font-bold uppercase tracking-widest">
								Languages & Frontend
							</h3>
						</div>
						<div className="mt-4 space-y-3 text-sm leading-relaxed">
							<div>
								<span className="font-semibold text-primary">Languages: </span>
								<span>JavaScript (ES6+), TypeScript, Node.js, HTML5, CSS3</span>
							</div>
							<div>
								<span className="font-semibold text-primary">Frontend: </span>
								<span>
									ReactJS, Next.js, Vite, Tailwind CSS, Ant Design, Material UI,
									Shadcn/ui
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									Forms & Validation:{" "}
								</span>
								<span>React Hook Form, Zod, Type-safe state management</span>
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<div className="flex items-center gap-2 text-primary">
							<PhoneCall className="size-4" />
							<h3 className="text-sm font-bold uppercase tracking-widest">
								Mobile Development & Telephony
							</h3>
						</div>
						<div className="mt-4 space-y-3 text-sm leading-relaxed">
							<div>
								<span className="font-semibold text-primary">Mobile: </span>
								<span>
									React Native, Expo, React Navigation, Reanimated, Native
									Modules (Java/Kotlin), CodePush
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									Telephony & Real-time:{" "}
								</span>
								<span>
									Twilio (Voice SDK, Conversations, Subaccounts, TwiML), WebRTC,
									Socket.io, WebSocket
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									Hardware Printing:{" "}
								</span>
								<span>
									Thermal Printers (Star Micronics SP700/TSP, Epson via
									BLE/TCP/LAN), ESC/POS
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<div className="flex items-center gap-2 text-primary">
							<Database className="size-4" />
							<h3 className="text-sm font-bold uppercase tracking-widest">
								Backend & Cloud Infrastructure
							</h3>
						</div>
						<div className="mt-4 space-y-3 text-sm leading-relaxed">
							<div>
								<span className="font-semibold text-primary">Backend: </span>
								<span>Node.js, Express, RESTful APIs, JWT Auth, Webhooks</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									Database & Cloud:{" "}
								</span>
								<span>
									Firebase (RTDB, Admin SDK, FCM), AWS (S3, CloudFront, SES)
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									DevOps & Diagnostics:{" "}
								</span>
								<span>
									Git, GitHub Actions CI/CD, Sentry crash analytics, Flipper,
									Reactotron
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<div className="flex items-center gap-2 text-primary">
							<Layers className="size-4" />
							<h3 className="text-sm font-bold uppercase tracking-widest">
								APIs, AI & Integrations
							</h3>
						</div>
						<div className="mt-4 space-y-3 text-sm leading-relaxed">
							<div>
								<span className="font-semibold text-primary">Payments: </span>
								<span>
									Stripe Connect (merchant onboarding, payouts, webhooks)
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									AI Workflows:{" "}
								</span>
								<span>
									OpenAI API, Google Gemini API, dual-AI auto-reply workers
								</span>
							</div>
							<div>
								<span className="font-semibold text-primary">
									Integrations & SEO:{" "}
								</span>
								<span>
									Google Business Profile API, OAuth2 (Google/Meta/TikTok),
									JSON-LD LocalBusiness SEO
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Progress Bars */}
				<div className="mt-6 rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur">
					{SKILL_BARS.map((s) => (
						<div key={s.label} className="mb-4 last:mb-0">
							<div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
								<span>{s.label}</span>
								<span className="text-primary">{s.value}%</span>
							</div>
							<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
								<div
									className="h-full rounded-full bg-primary"
									style={{ width: `${s.value}%` }}
								/>
							</div>
						</div>
					))}
					<p className="mt-4 text-xs text-muted-foreground">
						Looking for something specific or customized?{" "}
						<Button
							asChild
							variant="link"
							className="h-auto p-0 text-xs font-bold"
						>
							<Link to="/" hash="contact" hashScrollIntoView={SMOOTH_SCROLL}>
								Contact me to discuss
							</Link>
						</Button>
						.
					</p>
				</div>
			</div>
		</section>
	);
}
