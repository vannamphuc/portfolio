import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import ScrollFloat from "#/components/ui/scroll_float";
import { SMOOTH_SCROLL } from "./shared";

export function About() {
	return (
		<section id="about" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-24">
				<div>
					<ScrollFloat textClassName="font-bold">About Me</ScrollFloat>
					<p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">
						Full-Stack & Mobile Engineer · Vietnam
					</p>
				</div>
				<div>
					<div className="space-y-4 font-sans text-base leading-relaxed text-foreground sm:text-lg">
						<p>
							Product-minded Full-Stack & Mobile Engineer with nearly 3 years of
							experience shipping 5+ production mobile and web apps across
							restaurant SaaS, communications, fintech, health, and e-commerce.
							Strongest in React Native + Node.js end-to-end delivery: realtime
							UX, device integrations, and cloud releases.
						</p>
						<p>
							At <strong className="text-primary">Skipli</strong>, I delivered
							merchant, kitchen, and business-phone workflows across Node.js,
							React, and React Native for a restaurant SaaS suite serving 300+
							merchants. I automated Google Business review syncing (500+
							reviews) with AI-assisted replies, cutting response time by ~80%,
							and engineered <strong className="text-primary">Oliny</strong> — a
							VoIP business phone featuring Twilio Voice SDK over WebRTC,
							multi-member dynamic call distribution (blast ring & hunt groups),
							and a collaborative SMS/MMS inbox.
						</p>
						<p>
							At <strong className="text-primary">DKTech</strong>, I shipped 5+
							distinct production apps plus 20+ white-label trading deployments
							reskinned from a shared core — including{" "}
							<strong className="text-primary">Trade-BO</strong>,{" "}
							<strong className="text-primary">EXTrade</strong>, and{" "}
							<strong className="text-primary">Hitech Trading</strong> — with
							real-time candlestick charts (KLineChart) and low-latency
							WebSocket order book feeds.
						</p>
						<p className="border-l-2 border-primary/60 pl-4 text-sm italic text-foreground/90">
							Graduated with Distinction (GPA: 8.5/10) in Computer Programming
							from FPT College.
						</p>
					</div>
					<Button asChild variant="link" className="mt-6 h-auto p-0 font-bold">
						<Link to="/" hash="contact" hashScrollIntoView={SMOOTH_SCROLL}>
							Contact me <ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
