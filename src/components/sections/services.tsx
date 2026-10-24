import {
	Printer,
	Search,
	Server,
	ShoppingBag,
	Smartphone,
	Sparkles,
	Users,
} from "lucide-react";
import FlipCard from "#/components/ui/flip_card";
import ScrollFloat from "#/components/ui/scroll_float";

const MAIN_SERVICES = [
	{
		icon: Server,
		title: "Backend APIs",
		desc: "Express monolith on Firebase RTDB — ~344 REST endpoints, Socket.io realtime, Stripe, Twilio, OpenAI + Gemini.",
		tags: ["Node 22", "Express 5", "Firebase"],
	},
	{
		icon: ShoppingBag,
		title: "Merchant Dashboard",
		desc: "44 views and 14 website templates — orders, menus, payouts, social hub, SEO/GEO, auth, docs center.",
		tags: ["React 18", "Vite 8", "Sass"],
	},
	{
		icon: Smartphone,
		title: "Staff Mobile App",
		desc: "Kanban orders and thermal printing over BLE/TCP/LAN, responsive modals, CodePush OTA, Sentry.",
		tags: ["RN 0.77", "BLE", "CodePush"],
	},
];

const SERVICE_LIST = [
	{ icon: Server, label: "REST APIs & webhooks" },
	{ icon: Sparkles, label: "AI content (GPT-4o-mini + Gemini)" },
	{ icon: Search, label: "SEO / GEO + JSON-LD" },
	{ icon: Users, label: "Auth, OTP & onboarding" },
	{ icon: ShoppingBag, label: "Orders, payouts & social hub" },
	{ icon: Printer, label: "Thermal printing (SP700/Epson/Star)" },
	{ icon: Smartphone, label: "Responsive mobile UI" },
];

export function Services() {
	return (
		<section id="services" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<ScrollFloat textClassName="font-bold">What I ship</ScrollFloat>
				<div className="mt-4 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
					<div>
						<h3 className="text-xl font-bold">Full-stack feature owner</h3>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
							End-to-end ownership across a 59k-LOC backend, a 246k-LOC
							dashboard, and a 25k-LOC mobile app — integrations, realtime
							systems, payments, printing, and migrations.
						</p>
						<ul className="mt-6 space-y-2.5 text-sm font-medium">
							{SERVICE_LIST.map((s) => (
								<li
									key={s.label}
									className="flex w-fit items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-border hover:bg-card"
								>
									<s.icon className="size-4 text-primary" />
									{s.label}
								</li>
							))}
						</ul>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{MAIN_SERVICES.map((s) => (
							<div key={s.title}>
								<FlipCard
									width={230}
									height={320}
									className="mx-auto"
									front={
										<div className="flex h-full flex-col items-start justify-between rounded-[22px] border border-border bg-card p-5">
											<s.icon className="size-8 text-primary" />
											<div>
												<p className="text-lg font-bold leading-tight text-foreground">
													{s.title}
												</p>
												<p className="mt-2 text-xs text-muted-foreground">
													Hover / click to flip →
												</p>
											</div>
										</div>
									}
									back={
										<div className="flex h-full flex-col justify-between rounded-[22px] bg-primary p-5 text-primary-foreground">
											<p className="text-sm leading-relaxed">{s.desc}</p>
											<div className="flex flex-wrap gap-1.5">
												{s.tags.map((t) => (
													<span
														key={t}
														className="rounded-full border border-primary-foreground/40 px-2 py-0.5 text-[11px] font-semibold"
													>
														{t}
													</span>
												))}
											</div>
										</div>
									}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
