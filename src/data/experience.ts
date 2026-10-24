export interface ExperienceProject {
	title: string;
	period: string;
	desc: string;
	tags: string[];
}

export interface ExperienceRole {
	company: string;
	title: string;
	period: string;
	location: string;
	summary: string;
	highlights: string[];
	stack: string[];
	projects: ExperienceProject[];
}

export const EXPERIENCES: ExperienceRole[] = [
	{
		company: "Skipli / BUTI",
		title: "Full-Stack Engineer",
		period: "2025 — Present",
		location: "Restaurant SaaS · US market",
		summary:
			"Feature owner across a Node.js backend monolith, a React merchant dashboard, and a React Native staff app — integrations, realtime systems, and migrations end to end.",
		highlights: [
			"Owned Google Business integrations: OAuth, reviews reply, Gemini → OpenAI auto-reply worker with backfill.",
			"Built FoodMenus publish flow and ListingsHub business profiles (E.164 phone, Search Console, Yelp).",
			"Hardened S3/CloudFront delivery: canonical redirects, edge routing, prefix deletes, SEO files.",
			"Shipped order cutoff windows and migrated Stripe calls to axios with pnpm across the monolith.",
			"Built ListingsHub, Google Reviews/FoodMenus UI and SEO/GEO templates on the merchant dashboard.",
			"Rebuilt auth and onboarding with OTP, and led the React 18 / Router 6 / Vite 8 / pnpm migration.",
			"Shipped SP700/Epson/Star thermal printing over BLE/TCP/LAN on mobile, plus responsive orders UI and OTA builds.",
		],
		stack: [
			"Node 22",
			"Express 5",
			"Firebase RTDB",
			"Socket.io",
			"Stripe",
			"OpenAI",
			"React 18",
			"Vite 8",
			"RN 0.77",
			"BLE",
			"CodePush",
			"Jest",
		],
		projects: [
			{
				title: "ListingsHub + Reviews AI",
				period: "Backend + Dashboard",
				desc: "Google Business profiles, reviews reply and AI auto-reply worker — the largest feature area I owned.",
				tags: ["OAuth", "OpenAI", "Gemini", "React 18"],
			},
			{
				title: "FoodMenus publish",
				period: "Backend + Dashboard",
				desc: "Menu publishing pipeline with publish modal, Search Console and Yelp wiring.",
				tags: ["REST", "Vite", "Sass"],
			},
			{
				title: "Thermal printing",
				period: "Mobile",
				desc: "SP700/Epson/Star receipt printing over BLE/TCP/LAN with preview, test helper and responsive orders UI.",
				tags: ["RN 0.77", "BLE", "TCP"],
			},
		],
	},
	{
		company: "DK Tech",
		title: "Mobile & Web Developer",
		period: "Dec 2023 — 2025",
		location: "Ho Chi Minh City, Vietnam",
		summary:
			"Shipped 5+ production apps across fintech, health, and e-commerce — mobile commerce, Web3 payments, secure flows, and realtime trading.",
		highlights: [
			"Delivered 5+ production apps in fintech, health, and e-commerce domains.",
			"Built mobile commerce features: product catalogs, carts, payment integration, and order tracking.",
			"Integrated Web3 wallets (MetaMask, WalletConnect) for USDT payments and token reward systems.",
			"Implemented secure flows including KYC verification, 2FA, and digital signatures.",
			"Created smooth UX animations with Reanimated and advanced web interactions with GSAP / Framer Motion.",
			"Developed trading features with real-time candlestick charts using KLineChart / Highcharts and WebSocket.",
			"Optimized SEO and achieved Lighthouse 90+ through code splitting and lazy loading.",
		],
		stack: [
			"React Native",
			"Expo",
			"ReactJS",
			"Next.js",
			"TypeScript",
			"Redux Toolkit",
			"Reanimated",
			"Web3",
			"KLineChart",
		],
		projects: [
			{
				title: "Trade-BO",
				period: "Apr 2024 — Oct 2025",
				desc: "Crypto trading platform with advanced charting, real-time feeds, and Google Authenticator security.",
				tags: ["React", "KLineChart", "Socket.io", "Redux"],
			},
			{
				title: "HEWE Fitness",
				period: "Jan 2024 — Mar 2024",
				desc: "Gamified fitness app with GPS tracking, referral rewards, push notifications, and i18n.",
				tags: ["React Native", "Reanimated", "Maps", "Notifee"],
			},
			{
				title: "HeweCard",
				period: "Dec 2023 — Jan 2024",
				desc: "Digital card platform with Web3 USDT payments, KYC flow, referral tree, and CodePush updates.",
				tags: ["React Native", "Web3", "CodePush"],
			},
		],
	},
];
