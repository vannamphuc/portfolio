import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import FlexCarousel from "#/components/ui/flex_carousel";
import ScrollFloat from "#/components/ui/scroll_float";
import { SMOOTH_SCROLL } from "./shared";

const WORKS = [
	{
		src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop",
		title: "Oliny Business Phone",
		subtitle: "Twilio VoIP (WebRTC) • Shared Inbox • TwiML routing",
	},
	{
		src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop",
		title: "Skipli / BUTI Platform",
		subtitle: "Restaurant SaaS • Node.js monolith • React web & mobile",
	},
	{
		src: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&q=80&auto=format&fit=crop",
		title: "Trade - BO Platform",
		subtitle: "Crypto trading • KLineChart • Live WebSocket order books",
	},
	{
		src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
		title: "Reviews AI auto-reply",
		subtitle: "Google Business API • OpenAI & Gemini dual-worker",
	},
	{
		src: "https://images.unsplash.com/photo-1559329007-40dfad34bb52?w=1200&q=80&auto=format&fit=crop",
		title: "Thermal printing engine",
		subtitle: "Star Micronics & Epson • BLE + TCP + LAN discovery",
	},
	{
		src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80&auto=format&fit=crop",
		title: "Stripe & Cloud Infra",
		subtitle: "Stripe Connect payouts • AWS S3/CloudFront • CodePush OTA",
	},
];

export function Works() {
	return (
		<section id="works" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<ScrollFloat textClassName="font-bold">Selected work</ScrollFloat>
						<p className="mt-2 max-w-xl text-sm">
							Production systems and flagship features I architected across
							Skipli, Oliny, and DKTech — drag, scroll or click a card to explore.
						</p>
					</div>
					<Button asChild variant="secondary" className="rounded-xl">
						<Link to="/" hash="contact" hashScrollIntoView={SMOOTH_SCROLL}>
							Start a project <ArrowUpRight />
						</Link>
					</Button>
				</div>
				<div className="mt-8 h-[440px] overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-sm backdrop-blur md:h-[500px]">
					<FlexCarousel
						items={WORKS}
						preset="liquid"
						intro="rise"
						cardHeight={0.52}
						gap={14}
						radius={24}
						autoplay
						interval={4}
						captions
					/>
				</div>
			</div>
		</section>
	);
}
