import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { CardProfile } from "#/components/ui/card_profile";
import CircularText from "#/components/ui/circular_text";
import { TypewriterText } from "#/components/ui/typewritter-text";
import { SMOOTH_SCROLL } from "./shared";

const STATS = [
	["2+", "Years Experience"],
	["3+", "Production Repos"],
	["5+", "Apps Shipped"],
] as const;

export function Hero() {
	return (
		<section
			id="home"
			className="relative scroll-mt-24 overflow-hidden pt-32 md:pt-36"
		>
			<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
				<div>
					<p className="inline-block w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest">
						● Full-Stack & Mobile Engineer — React Native · ReactJS · Node.js
					</p>
					<h1 className="mt-5 text-2xl font-bold leading-[1.1] tracking-tight lg:text-3xl">
						Hi, I&apos;m Van Nam Phuc.
						<br />
						Full-Stack & Mobile <span className="text-primary">Engineer</span>
						<br />I build{" "}
						<TypewriterText
							words={[
								"VoIP & cloud phone systems.",
								"restaurant SaaS platforms.",
								"real-time trading platforms.",
								"cross-platform mobile apps.",
							]}
							className="text-primary"
						/>
					</h1>
					<p className="mt-6 max-w-xl text-base leading-relaxed">
						Full-Stack & Mobile Engineer with 3 years of experience
						architecting and shipping production systems across React Native,
						ReactJS, and Node.js. Proven track record in owning end-to-end
						product lifecycles—from system architecture and cloud infrastructure
						to Twilio VoIP solutions, native hardware integrations, and App
						Store rollouts.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Button asChild size="lg" className="rounded-xl">
							<Link to="/" hash="works" hashScrollIntoView={SMOOTH_SCROLL}>
								View my work <ArrowDown />
							</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="secondary"
							className="rounded-xl"
						>
							<Link to="/" hash="contact" hashScrollIntoView={SMOOTH_SCROLL}>
								Contact me <ArrowRight />
							</Link>
						</Button>
					</div>
					<div className="mt-10 flex gap-8 border-t border-border pt-6">
						{STATS.map(([n, l]) => (
							<div key={l}>
								<p className="text-2xl font-bold">{n}</p>
								<p className="text-xs uppercase tracking-widest text-muted-foreground">
									{l}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* avatar + circular text */}
				<div className="relative mx-auto w-full max-w-[320px]">
					<div>
						<CardProfile />
					</div>
					<Button
						asChild
						className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-foreground text-background hover:bg-foreground/90"
					>
						<Link
							to="/"
							hash="about"
							hashScrollIntoView={SMOOTH_SCROLL}
							aria-label="Let's explore more • Let's explore more •"
						>
							<span className="scale-[0.5]">
								<CircularText
									text="LET'S EXPLORE MORE • LET'S EXPLORE MORE • "
									spinDuration={14}
									onHover="speedUp"
									className="text-background [&_span]:text-background [&_span]:text-xl"
								/>
							</span>
							<ArrowDown className="absolute size-5" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
