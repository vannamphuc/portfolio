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
					<div className="space-y-4 text-base leading-relaxed text-foreground sm:text-lg">
						<p>
							Full-Stack & Mobile Engineer with 2+ years of experience
							architecting and shipping production systems across React Native,
							ReactJS, and Node.js.
						</p>
						<p>
							At <strong className="text-primary">Skipli</strong>, I spearheaded
							cross-platform architecture across a Node.js backend monolith, a
							React merchant dashboard, and a React Native staff app. I
							engineered <strong className="text-primary">Oliny</strong> — a
							Quo-like VoIP business phone featuring Twilio Voice SDK over
							WebRTC, multi-member dynamic call distribution (blast ring & hunt
							groups), and a collaborative SMS/MMS inbox.
						</p>
						<p>
							At <strong className="text-primary">DKTech</strong>, I delivered
							5+ production mobile and web applications, including{" "}
							<strong className="text-primary">Trade - BO</strong>—a
							high-frequency cryptocurrency trading platform with real-time
							candlestick charts (KLineChart) and low-latency WebSocket order
							book feeds.
						</p>
						<p className="border-l-2 border-primary/60 pl-4 text-sm italic text-foreground/90">
							Graduated with Distinction (GPA: 8.5/10) in Computer Programming
							from FPT College.
						</p>
					</div>
					<Button asChild variant="secondary" className="mt-6 px-0 font-bold">
						<Link to="/" hash="contact" hashScrollIntoView={SMOOTH_SCROLL}>
							Contact me <ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
