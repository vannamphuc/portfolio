import {
	Layers,
	LineChart,
	PhoneCall,
	Printer,
	Server,
	Smartphone,
	Sparkles,
	Zap,
} from "lucide-react";
import FlipCard from "#/components/ui/flip_card";
import ScrollFloat from "#/components/ui/scroll_float";

const MAIN_SERVICES = [
	{
		icon: PhoneCall,
		title: "VoIP & Cloud Telephony",
		desc: "Twilio Voice SDK over WebRTC, dynamic TwiML multi-member call distribution (blast ring & hunt groups), and collaborative SMS/MMS inboxes.",
		tags: ["Twilio Voice", "WebRTC", "TwiML", "Conversations"],
	},
	{
		icon: Server,
		title: "Backend & Cloud Systems",
		desc: "Express monolith on Firebase RTDB, Stripe Connect payouts, AWS S3/CloudFront edge routing, and dual-AI review workers.",
		tags: ["Node 22", "Express 5", "Firebase", "AWS"],
	},
	{
		icon: Smartphone,
		title: "Cross-Platform Mobile",
		desc: "Production React Native & Expo applications with BLE/TCP thermal receipt printing (Star/Epson), zero-downtime CodePush OTA, and Sentry analytics.",
		tags: ["RN 0.77", "Expo", "BLE Printing", "CodePush"],
	},
];

const SERVICE_LIST = [
	{ icon: PhoneCall, label: "Twilio VoIP calling (WebRTC) & dynamic TwiML" },
	{ icon: Server, label: "Node.js REST APIs & webhooks" },
	{
		icon: LineChart,
		label: "Real-time trading & WebSocket feeds (KLineChart)",
	},
	{ icon: Sparkles, label: "Dual-AI automation (OpenAI & Gemini APIs)" },
	{ icon: Printer, label: "Thermal kitchen printing (Star SP700/TSP & Epson)" },
	{ icon: Zap, label: "Stripe Connect marketplace payouts & billing" },
	{ icon: Smartphone, label: "React Native & Expo cross-platform mobile apps" },
	{
		icon: Layers,
		label: "Zero-downtime CodePush OTA & Sentry crash analytics",
	},
];

export function Services() {
	return (
		<section id="services" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<ScrollFloat textClassName="font-bold">What I ship</ScrollFloat>
				<div className="mt-4 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
					<div>
						<h3 className="text-xl font-bold">
							Full-Stack & Mobile Architecture
						</h3>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
							End-to-end product engineering spanning cloud infrastructure,
							telephony engines, high-frequency trading platforms, and native
							hardware drivers with 2+ years of production experience.
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
