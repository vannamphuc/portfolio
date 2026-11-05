import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "#/components/ui/button";

export function NotFound() {
	return (
		<section className="relative flex min-h-[70vh] items-center justify-center px-4 pt-32 md:pt-36">
			<div className="mx-auto max-w-xl text-center">
				<p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
					404 — Page not found
				</p>
				<h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
					This page went on a coffee break.
				</h1>
				<p className="mt-4 text-base leading-relaxed text-muted-foreground">
					The link you followed may be broken, or the page may have been moved.
					Let&apos;s get you back to the good stuff.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="lg" className="rounded-xl">
						<Link to="/">
							<Home /> Back to home
						</Link>
					</Button>
					<Button
						size="lg"
						variant="secondary"
						className="rounded-xl"
						onClick={() => window.history.back()}
					>
						<ArrowLeft /> Go back
					</Button>
				</div>
			</div>
		</section>
	);
}
