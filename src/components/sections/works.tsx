import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import {
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Images,
	X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import FlexCarousel from "#/components/ui/flex_carousel";
import ScrollFloat from "#/components/ui/scroll_float";
import { SMOOTH_SCROLL } from "./shared";

interface WorkProject {
	src: string;
	title: string;
	subtitle: string;
	images: string[];
}

const WORKS: WorkProject[] = [
	{
		src: "/works/oliny/oliny.jpg",
		title: "Oliny Business Phone",
		subtitle: "Twilio VoIP (WebRTC) • Shared Inbox • TwiML routing",
		images: ["/works/oliny/oliny.jpg", "/works/oliny/oliny_2.jpg"],
	},
	{
		src: "/works/skipli_buti/dashboard.png",
		title: "Skipli / BUTI Platform",
		subtitle: "Restaurant SaaS • Node.js monolith • React web & mobile",
		images: [
			"/works/skipli_buti/dashboard.png",
			"/works/skipli_buti/ordering.png",
			"/works/skipli_buti/website_builder.png",
			"/works/skipli_buti/website_builder_preview.png",
			"/works/skipli_buti/marketplace.png",
			"/works/skipli_buti/create_ordering.jpg",
		],
	},
	{
		src: "/works/trade/trade.png",
		title: "Trade - BO Platform",
		subtitle: "Crypto trading • KLineChart • Live WebSocket order books",
		images: ["/works/trade/trade.png"],
	},
	{
		src: "/works/review_ai/google_reviews.png",
		title: "Reviews AI auto-reply",
		subtitle: "Google Business API • OpenAI & Gemini dual-worker",
		images: ["/works/review_ai/google_reviews.png"],
	},
	{
		src: "/works/thermal_printers/thermal_printers.jpg",
		title: "Thermal printing engine",
		subtitle: "Star Micronics & Epson • BLE + TCP + LAN discovery",
		images: ["/works/thermal_printers/thermal_printers.jpg"],
	},
	{
		src: "/works/stripe/stripe.png",
		title: "Stripe & Cloud Infra",
		subtitle: "Stripe Connect payouts • AWS S3/CloudFront • CodePush OTA",
		images: ["/works/stripe/stripe.png"],
	},
];

export function Works() {
	const [activeProject, setActiveProject] = useState<WorkProject | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	function openGallery(index: number) {
		const project = WORKS[index];
		if (!project) return;
		setActiveProject(project);
		setCurrentImageIndex(0);
	}

	const closeGallery = useCallback(() => {
		setActiveProject(null);
		setCurrentImageIndex(0);
	}, []);

	const nextImage = useCallback(() => {
		if (!activeProject) return;
		setCurrentImageIndex((prev) => (prev + 1) % activeProject.images.length);
	}, [activeProject]);

	const prevImage = useCallback(() => {
		if (!activeProject) return;
		setCurrentImageIndex(
			(prev) =>
				(prev - 1 + activeProject.images.length) % activeProject.images.length,
		);
	}, [activeProject]);

	// Keyboard navigation in modal (ESC, Left, Right)
	useEffect(() => {
		if (!activeProject) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeGallery();
			} else if (e.key === "ArrowRight") {
				nextImage();
			} else if (e.key === "ArrowLeft") {
				prevImage();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [activeProject, closeGallery, nextImage, prevImage]);

	return (
		<section id="works" className="scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<ScrollFloat textClassName="font-bold">Selected work</ScrollFloat>
						<p className="mt-2 max-w-xl text-sm text-foreground/90">
							Production systems and flagship features I architected across
							Skipli, Oliny, and DKTech — click any project card to view
							high-resolution gallery.
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
						onSelect={(index) => openGallery(index)}
					/>
				</div>
			</div>

			{/* ================= PROJECT IMAGE MODAL / LIGHTBOX ================= */}
			{activeProject && (
				<div
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
					onClick={closeGallery}
					onKeyDown={(e) => {
						if (e.key === "Escape") closeGallery();
					}}
				>
					<div
						role="document"
						className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur sm:rounded-3xl"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5 sm:px-6 sm:py-4">
							<div className="min-w-0 pr-4">
								<div className="flex items-center gap-2">
									<h3 className="truncate text-base font-bold sm:text-lg">
										{activeProject.title}
									</h3>
									{activeProject.images.length > 1 && (
										<span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
											<Images className="size-3" />
											{activeProject.images.length} photos
										</span>
									)}
								</div>
								<p className="truncate text-xs text-muted-foreground sm:text-sm">
									{activeProject.subtitle}
								</p>
							</div>

							<button
								type="button"
								onClick={closeGallery}
								aria-label="Close gallery"
								className="rounded-full border border-border bg-muted/50 p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
							>
								<X className="size-4 sm:size-5" />
							</button>
						</div>

						{/* Main Image Stage */}
						<div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/30 p-2 sm:p-4">
							<Image
								key={activeProject.images[currentImageIndex]}
								src={activeProject.images[currentImageIndex]}
								alt={`${activeProject.title} screenshot ${currentImageIndex + 1}`}
								width={1600}
								height={1000}
								layout="constrained"
								priority
								className="max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-lg sm:max-h-[66vh]"
							/>

							{/* Previous / Next Arrows (only if multiple images) */}
							{activeProject.images.length > 1 && (
								<>
									<button
										type="button"
										onClick={prevImage}
										aria-label="Previous image"
										className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur transition-all hover:scale-105 hover:bg-black/90 sm:left-5 sm:p-3"
									>
										<ChevronLeft className="size-5" />
									</button>
									<button
										type="button"
										onClick={nextImage}
										aria-label="Next image"
										className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur transition-all hover:scale-105 hover:bg-black/90 sm:right-5 sm:p-3"
									>
										<ChevronRight className="size-5" />
									</button>

									{/* Current Counter Badge */}
									<div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-xs font-medium text-white/90 backdrop-blur">
										{currentImageIndex + 1} / {activeProject.images.length}
									</div>
								</>
							)}
						</div>

						{/* Thumbnails strip (only if multiple images) */}
						{activeProject.images.length > 1 && (
							<div className="flex gap-2 overflow-x-auto border-t border-border/60 bg-muted/20 p-3 sm:gap-3 sm:px-6">
								{activeProject.images.map((img, idx) => (
									<button
										key={img}
										type="button"
										onClick={() => setCurrentImageIndex(idx)}
										aria-label={`Go to slide ${idx + 1}`}
										className={`relative size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:size-16 ${
											idx === currentImageIndex
												? "border-primary ring-2 ring-primary/40 scale-105"
												: "border-border/60 opacity-60 hover:opacity-100"
										}`}
									>
										<Image
											src={img}
											alt={`Thumbnail ${idx + 1}`}
											width={80}
											height={80}
											className="h-full w-full object-cover"
										/>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
