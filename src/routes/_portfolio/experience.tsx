import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import {
	ArrowLeft,
	ArrowUpRight,
	Award,
	Briefcase,
	ExternalLink,
	GraduationCap,
	MapPin,
	TrendingUp,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import ScrollFloat from "#/components/ui/scroll_float";
import { EDUCATION, EXPERIENCES } from "#/data/experience";

export const Route = createFileRoute("/_portfolio/experience")({
	component: ExperiencePage,
});

function ExperiencePage() {
	return (
		<>
			<section className="scroll-mt-24 pt-32 md:pt-36">
				<div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
					<Button asChild variant="ghost" className="mb-6 w-fit">
						<Link to="/">
							<ArrowLeft /> Back to home
						</Link>
					</Button>
					<ScrollFloat textClassName="font-bold">
						Full experience & education
					</ScrollFloat>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Comprehensive record of engineering roles, production systems, and
						academic distinction across Skipli, DKTech, and FPT College.
					</p>
				</div>
			</section>

			{EXPERIENCES.map((role, i) => (
				<section
					key={role.company}
					id={`exp-${i}`}
					className="scroll-mt-24 border-t border-border"
				>
					<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
						<div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<Briefcase className="size-4 text-primary" />
										<h2 className="text-2xl font-bold">{role.title}</h2>
									</div>
									<div className="mt-1 flex items-center gap-2">
										{role.companyUrl ? (
											<a
												href={role.companyUrl}
												target="_blank"
												rel="noreferrer noopener"
												className="inline-flex items-center gap-1.5 text-base font-semibold text-primary transition-opacity hover:opacity-80 hover:underline"
											>
												{role.company}
												<ExternalLink className="size-3.5" />
											</a>
										) : (
											<p className="text-base font-semibold text-primary">
												{role.company}
											</p>
										)}
									</div>
									<p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
										<span>{role.period}</span>
										<span className="inline-flex items-center gap-1">
											<MapPin className="size-3.5" /> {role.location}
										</span>
									</p>
								</div>
								<Badge variant="secondary" className="font-mono text-[11px]">
									{role.projects.length} featured projects
								</Badge>
							</div>
							<p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
								{role.summary}
							</p>
							<ul className="mt-6 space-y-2.5 text-sm leading-relaxed">
								{role.highlights.map((h) => (
									<li key={h} className="flex gap-2.5">
										<span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" />
										{h}
									</li>
								))}
							</ul>
							<div className="mt-6 flex flex-wrap gap-1.5">
								{role.stack.map((t) => (
									<Badge
										key={t}
										variant="outline"
										className="text-[11px] font-medium"
									>
										{t}
									</Badge>
								))}
							</div>
						</div>

						<div
							className={`mt-6 grid gap-4 ${
								role.projects.length === 2
									? "md:grid-cols-2"
									: "md:grid-cols-2 lg:grid-cols-3"
							}`}
						>
							{role.projects.map((p) => (
								<article
									key={p.title}
									className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg"
								>
									{p.image && (
										<div className="relative overflow-hidden border-b border-border/60">
											<Image
												src={p.image}
												alt={`${p.title} screenshot`}
												width={800}
												height={450}
												layout="constrained"
												loading="lazy"
												className="aspect-video w-full object-cover object-top transition-transform duration-500 hover:scale-105"
											/>
											{p.status && (
												<span className="absolute left-3 top-3 rounded-full border border-border bg-background/90 px-2.5 py-1 font-mono text-[11px] font-semibold backdrop-blur">
													{p.status}
												</span>
											)}
										</div>
									)}
									<div className="flex flex-1 flex-col p-6">
										<div className="flex flex-wrap items-center justify-between gap-2">
											<p className="font-mono text-[11px] uppercase tracking-widest text-primary">
												{p.period}
											</p>
											{!p.image && p.status && (
												<span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] font-semibold">
													{p.status}
												</span>
											)}
										</div>
										<h3 className="mt-2 text-lg font-bold">{p.title}</h3>
										{p.metrics && p.metrics.length > 0 && (
											<div className="mt-3 flex flex-wrap gap-1.5">
												{p.metrics.map((m) => (
													<span
														key={m}
														className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
													>
														<TrendingUp className="size-3" />
														{m}
													</span>
												))}
											</div>
										)}
										<p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
											{p.desc}
										</p>
										{p.links && p.links.length > 0 && (
											<div className="mt-4 flex flex-wrap gap-2">
												{p.links.map((l) => (
													<a
														key={l.url}
														href={l.url}
														target="_blank"
														rel="noreferrer noopener"
														className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
													>
														{l.label}
														<ArrowUpRight className="size-3.5" />
													</a>
												))}
											</div>
										)}
										<div className="mt-4 flex flex-wrap gap-1.5">
											{p.tags.map((t) => (
												<Badge
													key={t}
													variant="outline"
													className="text-[11px] font-medium"
												>
													{t}
												</Badge>
											))}
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>
			))}

			{/* Education Section */}
			<section id="education" className="scroll-mt-24 border-t border-border">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
					<div className="mb-6 flex items-center gap-2">
						<GraduationCap className="size-5 text-primary" />
						<h2 className="text-2xl font-bold">Education</h2>
					</div>
					<div className="grid gap-6 md:grid-cols-1">
						{EDUCATION.map((edu) => (
							<div
								key={edu.institution}
								className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm backdrop-blur md:p-8"
							>
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="text-xl font-bold">{edu.institution}</h3>
										<p className="mt-1 text-base font-semibold text-primary">
											{edu.degree}
										</p>
										<p className="mt-2 text-sm text-muted-foreground">
											Graduated: {edu.period}
										</p>
									</div>
									<div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
										<Award className="size-3.5" />
										{edu.grade}
									</div>
								</div>
								<p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
									{edu.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-border">
				<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-16 sm:px-6">
					<p className="text-sm text-muted-foreground">
						Have an interesting project or role to discuss?
					</p>
					<Button asChild size="lg" className="rounded-xl">
						<Link to="/" hash="contact">
							Contact me
						</Link>
					</Button>
				</div>
			</section>
		</>
	);
}
