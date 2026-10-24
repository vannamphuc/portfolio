import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Cloud, Database, Printer, Workflow, Zap } from "lucide-react";
import { Button } from "#/components/ui/button";
import ScrollFloat from "#/components/ui/scroll_float";
import { Nodejs } from "#/components/ui/svgs/nodejs";
import { ReactDark } from "#/components/ui/svgs/reactDark";
import { ReactLight } from "#/components/ui/svgs/reactLight";
import { Typescript } from "#/components/ui/svgs/typescript";
import { SMOOTH_SCROLL } from "./shared";

const SKILL_BARS = [
	{ label: "Backend — Node / Express / Firebase / Stripe", value: 90 },
	{ label: "Web — React 18 / Router 6 / Vite / Sass", value: 88 },
	{ label: "Mobile — RN 0.77 / Navigation / BLE printing", value: 84 },
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
				<ScrollFloat textClassName="font-bold">Tech stack</ScrollFloat>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					The production stack behind Skipli/BUTI — backend monolith,
					merchant dashboard, and staff mobile app.
				</p>

				<div className="mt-8 grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<h3 className="text-sm font-bold uppercase tracking-widest text-primary">
							Backend & Infra
						</h3>
						<div className="mt-4 grid grid-flow-row-dense grid-cols-3 gap-3 sm:grid-cols-3">
							<StackTile name="Node.js 22">
								<Nodejs />
							</StackTile>
							<StackTile name="Firebase">
								<Database className="size-5 text-foreground" />
							</StackTile>
							<StackTile name="AWS S3/CF">
								<Cloud className="size-5 text-foreground" />
							</StackTile>
							<StackTile name="Socket.io">
								<Workflow className="size-5 text-foreground" />
							</StackTile>
							<StackTile name="TypeScript">
								<Typescript />
							</StackTile>
							<StackTile name="Jest 308">
								<Zap className="size-5 text-foreground" />
							</StackTile>
						</div>
						<ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
							<li>• Express 5 / Firebase RTDB + Admin / jose JWT</li>
							<li>• Stripe Connect / Twilio / SES / S3 + CloudFront</li>
							<li>• OpenAI GPT-4o-mini + Gemini / OAuth2 / webhooks</li>
						</ul>
					</div>
					<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur">
						<h3 className="text-sm font-bold uppercase tracking-widest text-primary">
							Web & Mobile
						</h3>
						<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
							<StackTile name="React 18">
								<ReactLight className="dark:hidden" />
								<ReactDark className="hidden dark:block" />
							</StackTile>
							<StackTile name="RN 0.77">
								<ReactLight className="dark:hidden" />
								<ReactDark className="hidden dark:block" />
							</StackTile>
							<StackTile name="Printing">
								<Printer className="size-5 text-foreground" />
							</StackTile>
						</div>
						<ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
							<li>• Router 6 / Vite 8 / pnpm / Sass / TanStack Table</li>
							<li>• Navigation 6 / CodePush / Sentry / BLE + TCP</li>
							<li>• Recharts / hCaptcha / Algolia / i18next</li>
						</ul>
					</div>
				</div>

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
						Also: E.164, Search Console, Canva Connect, Meta/TikTok/Google
						OAuth, DoorDash/Postmates, QZ Tray, EAS, Metro, Flipper. Need
						something specific?{" "}
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
