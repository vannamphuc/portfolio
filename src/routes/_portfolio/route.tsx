import {
	Outlet,
	createFileRoute,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "#/components/arc/blocks/site-header/site-header";
import { HeaderAuth } from "#/components/auth/header-auth";
import { AnimatedThemeToggle } from "#/components/ui/animated-theme-toggle";
import authClient from "#/lib/auth/auth-client";
import GlowCursor from "#/components/ui/glow_cursor";
import PatternWaves from "#/components/ui/pattern_waves";

export const Route = createFileRoute("/_portfolio")({
	component: PortfolioLayout,
});

const NAV = [
	{ label: "Home", hash: "home" },
	{ label: "Experience", hash: "experience" },
	{ label: "Works", hash: "works" },
	{ label: "What I ship", hash: "services" },
	{ label: "Stack", hash: "skills" },
] as const;

function scrollToId(id: string) {
	document
		.getElementById(id)
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useEffectColors() {
	const [colors, setColors] = useState({
		wave: "#34d399",
		glow: "#34d399",
		glowSecondary: "#a7f3d0",
	});
	useEffect(() => {
		const read = () => {
			const cs = getComputedStyle(document.documentElement);
			const wave = cs.getPropertyValue("--effect-wave").trim() || "#34d399";
			const glow =
				cs.getPropertyValue("--effect-glow").trim() || wave || "#34d399";
			const glowSecondary =
				cs.getPropertyValue("--effect-glow-secondary").trim() || "#a7f3d0";
			setColors({ wave, glow, glowSecondary });
		};
		read();
		const obs = new MutationObserver(read);
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});
		return () => obs.disconnect();
	}, []);
	return colors;
}

function PortfolioLayout() {
	const effectColors = useEffectColors();
	const navigate = useNavigate();
	const location = useLocation();
	const onHomePage = location.pathname === "/";
	const { data: session } = authClient.useSession();

	function goSection(hash: string) {
		if (onHomePage) {
			scrollToId(hash);
		} else {
			void navigate({ to: "/", hash });
		}
	}

	return (
		<div className="relative min-h-screen bg-background font-mono text-foreground">
			{/* full-app wave background — màu lấy từ --effect-wave trong styles.css */}
			<div className="pointer-events-none fixed inset-0 z-0">
				<PatternWaves
					preset="silk"
					color={effectColors.wave}
					backgroundColor="rgba(0,0,0,0)"
					opacity={0.35}
					fade="edges"
					fadeSize={0.7}
					interactive
					cursorSize={90}
					cursorStrength={0.6}
				/>
			</div>
			<GlowCursor
				color={effectColors.glow}
				secondaryColor={effectColors.glowSecondary}
				trailLength={36}
				trailWidth={7}
				glowIntensity={1.6}
				glowSpread={1.1}
				opacity={0.85}
				blendMode="screen"
				className="pointer-events-none"
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 5,
					pointerEvents: "none",
				}}
			/>

			<div className="relative z-10">
				{/* ---------- HEADER ---------- */}
				<SiteHeader
					variant="simple"
					brand={{
						name: "Van Nam Phuc",
						mark: <></>,
					}}
					items={NAV.map((item) => ({
						value: item.hash,
						label: item.label,
					}))}
					secondaryAction={
						session?.user
							? null
							: {
									label: "Sign in",
									onClick: () => {
										void navigate({ to: "/admin/login" });
									},
								}
					}
					primaryAction={{
						label: "Contact me",
						onClick: () => goSection("contact"),
					}}
					trailing={
						<span className="flex items-center gap-1">
							<HeaderAuth />
							<AnimatedThemeToggle />
						</span>
					}
					onNavigate={(destination) => {
						if (destination.label === "Phuc Nam") {
							if (onHomePage) {
								window.scrollTo({ top: 0, behavior: "smooth" });
							} else {
								void navigate({ to: "/" });
							}
							return;
						}
						if (destination.section) {
							goSection(destination.section);
						}
					}}
				/>

				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
