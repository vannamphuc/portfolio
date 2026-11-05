export interface ProjectLink {
	label: string;
	url: string;
}

export interface ExperienceProject {
	title: string;
	period: string;
	desc: string;
	tags: string[];
	/** Cover image shown on the experience page (optional). */
	image?: string;
	/** External links: live product, store listings, website (optional). */
	links?: ProjectLink[];
	/** Key impact metrics, e.g. "300+ merchants" (optional). */
	metrics?: string[];
	/** Status badge, e.g. "Pre-production" (optional). */
	status?: string;
}

export interface ExperienceRole {
	company: string;
	companyUrl?: string;
	title: string;
	period: string;
	location: string;
	summary: string;
	highlights: string[];
	stack: string[];
	projects: ExperienceProject[];
}

export interface EducationItem {
	institution: string;
	degree: string;
	period: string;
	grade: string;
	description: string;
}

export const EDUCATION: EducationItem[] = [
	{
		institution: "FPT College",
		degree: "Associate Degree in Computer Programming",
		period: "May 2024",
		grade: "Graduated with Distinction (GPA: 8.5/10)",
		description:
			"Specialized in core software engineering, modern JavaScript/TypeScript paradigms, cross-platform mobile architectures, database design, and real-time network systems.",
	},
];

export const EXPERIENCES: ExperienceRole[] = [
	{
		company: "Skipli",
		companyUrl: "https://www.skiplinow.com/",
		title: "Full-Stack Engineer",
		period: "Oct 2025 — Oct 2026",
		location: "Restaurant SaaS & Cloud Telephony · US Market",
		summary:
			"Delivered merchant, kitchen, and business-phone workflows across Node.js, React, and React Native for the restaurant SaaS suite (300+ merchants) and the Oliny app. Automated Google Business review syncing (500+ reviews) with AI-assisted replies, integrated Twilio/WebRTC calling and Stripe Connect, and managed mobile releases and CI checks.",
		highlights: [
			"Spearheaded cross-platform architecture across Node.js backend, React web, and React Native mobile for a US restaurant management ecosystem and business phone app (Oliny).",
			"Engineered Twilio VoIP calling (WebRTC), Google Business integrations with AI auto-reply, Star/Epson thermal printing, and AWS/Stripe infrastructure.",
			"Owned end-to-end mobile release lifecycles (Google Play / App Store submissions, CodePush OTA updates) and automated CI/CD checks via GitHub Actions.",
			"Developed Google Business OAuth2 integration, automated review syncing with dual-AI auto-reply worker (OpenAI & Gemini), AWS S3/CloudFront edge routing, and Stripe Connect payouts.",
			"Built ListingsHub and Reviews management UI with batch AI responses; created dynamic restaurant websites featuring automated JSON-LD schema (LocalBusiness) and SEO/GEO optimization.",
			"Engineered thermal receipt and kitchen order printing supporting Star Micronics (SP700, TSP) and Epson over BLE/TCP/LAN with print preview modals and diagnostic tools.",
			"Configured zero-downtime CodePush OTA updates, Sentry crash analytics, and standardized order cutoff timers to streamline kitchen operations.",
			"Architected VoIP calling with Twilio Voice SDK over WebRTC, dynamic TwiML multi-member simultaneous ring and hunt groups, and Twilio Subaccounts multi-tenant isolation.",
			"Built shared SMS/MMS messaging workspace using Twilio Conversations API, webhook verification (validateRequest), and automated US phone number provisioning via IncomingPhoneNumbers API.",
		],
		stack: [
			"Node.js",
			"Express",
			"React",
			"Vite",
			"React Native",
			"Twilio Voice",
			"WebRTC",
			"Firebase RTDB",
			"AWS (S3/CloudFront)",
			"Stripe Connect",
			"OpenAI & Gemini",
			"BLE / TCP Printing",
			"CodePush",
			"Sentry",
		],
		projects: [
			{
				title: "Skipli / BUTI — Restaurant SaaS Platform",
				period: "Oct 2025 — Oct 2026",
				desc: "Restaurant SaaS serving 300+ merchants, connecting merchant management, review operations, and kitchen workflows across web and mobile. Merchant dashboards for listings and reviews (500+ reviews synced) with batch AI-assisted replies, plus restaurant websites with LocalBusiness structured data.",
				tags: [
					"Node.js",
					"React",
					"React Native",
					"Firebase RTDB",
					"Stripe",
					"OpenAI & Gemini",
					"BLE",
				],
				image: "/works/skipli_buti/dashboard.webp",
				links: [{ label: "Skipli Website", url: "https://www.skiplinow.com/" }],
				metrics: [
					"300+ merchants",
					"500+ reviews synced",
					"~80% faster replies",
				],
			},
			{
				title: "Oliny — Cloud Business Phone & Shared Inbox",
				period: "Oct 2025 — Oct 2026",
				desc: "Shared business phone and inbox for teams handling calls and messages. Mobile calling with Twilio Voice SDK and WebRTC, tenant-specific number and routing workflows (Twilio Subaccounts, simultaneous and hunt-group routing, voicemail, automated provisioning), plus a shared SMS/MMS inbox with signature verification.",
				tags: [
					"React Native",
					"Twilio Voice",
					"WebRTC",
					"TwiML",
					"Node.js",
					"Conversations API",
				],
				image: "/works/oliny/oliny.webp",
				status: "Pre-production",
			},
		],
	},
	{
		company: "DKTech",
		companyUrl: "https://dk-tech.vn/",
		title: "Mobile & Web Developer · Intern → Full-time",
		period: "Dec 2023 — Oct 2025",
		location: "Ho Chi Minh City, Vietnam",
		summary:
			"Shipped 5+ distinct production mobile and web apps for fintech, health, and e-commerce using React Native and TypeScript, plus 20+ white-label trading deployments reskinned from a shared core. Built a reusable crypto-trading core with multi-timeframe charts and live WebSocket market data; collaborated with designers and backend teams, optimized performance, and contributed code reviews and junior mentoring.",
		highlights: [
			"Delivered 5+ production mobile and web applications in fintech, health, and e-commerce using React Native and TypeScript.",
			"Built 20+ white-label trading deployments reskinned from a shared core (Trade-BO, EXTrade, Hitech Trading), supporting ~200 peak active users — per-client work focused on branding/theming, feature flags, admin dashboards, and multilingual modules.",
			"Built cryptocurrency trading platforms featuring real-time candlestick charts (KLineChart, Highcharts) with low-latency WebSocket order book feeds.",
			"Enforced type-safe form validation standards (React Hook Form, Zod), conducted code reviews, and guided junior engineers.",
			"Built mobile commerce features: product catalogs, carts, payment integration, and order tracking.",
			"Integrated Web3 wallets (MetaMask, WalletConnect) and HyperPayOS for USDT payments and token reward systems.",
			"Implemented secure flows including KYC verification, multi-method 2FA (Google Authenticator), and digital signatures.",
			"Created smooth UX animations with Reanimated and advanced web interactions with GSAP / Framer Motion.",
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
			"Socket.io",
			"KLineChart",
			"React Hook Form",
			"Zod",
			"Tailwind CSS",
		],
		projects: [
			{
				title: "Trading Platforms & White-Label Deployments",
				period: "Dec 2023 — Oct 2025",
				desc: "Real-time crypto trading interfaces and automated strategy tools across 20+ white-label deployments built on a shared core (Trade-BO, EXTrade, Hitech Trading), supporting ~200 peak active users. Responsive trading UIs with KLineChart/Highcharts, technical indicators, live WebSocket price/order-book feeds, multi-method 2FA, and Hitech bot workflows for order execution, strategy automation, and backtesting.",
				tags: [
					"React",
					"KLineChart",
					"Highcharts",
					"Socket.io",
					"Redux Toolkit",
					"Tailwind CSS",
				],
				image: "/works/trade/trade.webp",
				links: [
					{ label: "Trade-BO", url: "https://bitnextex.net/" },
					{ label: "HEWE Website", url: "https://www.hewe.io/" },
				],
				metrics: ["20+ deployments", "~200 peak users"],
			},
			{
				title: "Ameritec Card",
				period: "Dec 2023 — Oct 2025",
				desc: "Mobile product for digital card management and Web3 payments. Integrated USDT wallet purchases through HyperPayOS, CVV/PIN access, KYC identity checks, digital signatures, referrals, and multilingual UI.",
				tags: ["React Native", "HyperPayOS", "USDT", "KYC", "CodePush"],
				links: [
					{
						label: "App Store",
						url: "https://apps.apple.com/vn/app/ameritec-card/id6680183702",
					},
					{
						label: "Google Play",
						url: "https://play.google.com/store/apps/details?id=com.hewecard",
					},
				],
			},
			{
				title: "HEWE Fitness",
				period: "Jan 2024 — Mar 2024",
				desc: "Gamified fitness application with GPS/step and route tracking, background monitoring, push notifications, token rewards, and referral flows.",
				tags: ["React Native", "Reanimated", "Maps", "Notifee"],
				links: [
					{
						label: "APKPure",
						url: "https://apkpure.com/hewe/com.heweapptoken",
					},
				],
			},
		],
	},
];
