import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import ScrollFloat from "#/components/ui/scroll_float";
import { EXPERIENCES } from "#/data/experience";

export function Experience() {
	return (
		<section id="experience" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<ScrollFloat textClassName="font-bold">Experience</ScrollFloat>
					<Button asChild variant="secondary" className="rounded-xl">
						<Link to="/experience">
							See more experience <ArrowRight />
						</Link>
					</Button>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					{EXPERIENCES.map((role, i) => (
						<article
							key={role.company}
							className="flex flex-col rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg md:p-8"
						>
							<div className="flex flex-wrap items-center gap-2">
								<Briefcase className="size-4 text-primary" />
								<h3 className="text-xl font-bold">{role.title}</h3>
							</div>
							<p className="mt-1 text-sm font-semibold text-primary">
								{role.company}
							</p>
							<p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
								<span>{role.period}</span>
								<span className="inline-flex items-center gap-1">
									<MapPin className="size-3.5" /> {role.location}
								</span>
							</p>
							<p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
								{role.summary}
							</p>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{role.stack.slice(0, 8).map((t) => (
									<Badge
										key={t}
										variant="outline"
										className="text-[11px] font-medium"
									>
										{t}
									</Badge>
								))}
							</div>
							<Button
								asChild
								variant="link"
								className="mt-2 h-auto w-fit p-0 text-sm font-bold"
							>
								<Link to="/experience" hash={`exp-${i}`}>
									View details <ArrowRight />
								</Link>
							</Button>
						</article>
					))}
				</div>

				<div className="mt-6 flex justify-center">
					<Button asChild size="lg" className="rounded-xl">
						<Link to="/experience">
							See more experience <ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
