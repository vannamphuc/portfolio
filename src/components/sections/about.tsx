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
					<p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary"></p>
				</div>
				<div>
					<p className="whitespace-pre-line text-lg leading-relaxed">
						{`Full-stack feature owner on Skipli/BUTI — an end-to-end\nrestaurant SaaS for the US market: Node.js backend\nmonolith with ~344 REST endpoints, a merchant\ndashboard web app, and a React Native staff app.\n\nI ship across all three repos: Google Business\nintegrations, SEO/GEO infrastructure, order systems,\ndashboard UI, auth flows, thermal printing, and\nOTA-ready mobile builds.`}
					</p>
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
