import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { CardProfile } from "#/components/ui/card_profile";
import CircularText from "#/components/ui/circular_text";
import { TypewriterText } from "#/components/ui/typewritter-text";
import { SMOOTH_SCROLL } from "./shared";

const STATS = [
	["3", "Production repos"],
	["2", "Companies"],
	["6+", "Flagship features"],
] as const;

export function Hero() {
	return (
		<section
			id="home"
			className="relative scroll-mt-24 overflow-hidden pt-32 md:pt-36"
		>
			<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
				<div>
					<p className="inline-block w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						● Full-Stack Engineer — Skipli / BUTI
					</p>
					<h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
						Hi, I&apos;m Phuc Nam.
						<br />
						Full-Stack <span className="text-primary">Engineer</span>
						<br />I build{" "}
						<TypewriterText
							words={[
								"restaurant SaaS.",
								"backend APIs.",
								"merchant dashboards.",
								"mobile apps.",
							]}
							className="text-muted-foreground"
						/>
					</h1>
					<p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
						Feature owner across backend, web and mobile for Skipli/BUTI — a
						restaurant SaaS for the US market: Node.js monolith, merchant
						dashboard, and React Native staff app.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Button asChild size="lg" className="rounded-xl">
							<Link to="/" hash="works" hashScrollIntoView={SMOOTH_SCROLL}>
								View my work <ArrowDown />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="rounded-xl">
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
