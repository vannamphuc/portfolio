export interface ExperienceProject {
	title: string;
	period: string;
	desc: string;
	tags: string[];
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
		companyUrl: "https://home.skiplinow.com/",
		title: "Full-Stack Engineer",
		period: "Dec 2025 — Oct 2026",
		location: "Restaurant SaaS & Cloud Telephony · US Market",
		summary:
			"Spearheaded cross-platform architecture across Node.js backend, React web, and React Native mobile for a US restaurant management ecosystem and business phone app (Oliny). Engineered Twilio VoIP calling (WebRTC), Google Business integrations with dual-AI auto-reply, Star/Epson thermal printing, and AWS/Stripe infrastructure.",
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
				period: "Dec 2025 — Oct 2026",
				desc: "Comprehensive restaurant management SaaS ecosystem for the US market spanning a Node.js backend, multi-tenant merchant web dashboard, and kitchen/staff mobile application. Includes Google Business AI auto-reply (OpenAI & Gemini), ListingsHub, Star/Epson thermal printing (BLE/TCP/LAN), and Stripe Connect payouts.",
				tags: ["Node.js", "React", "React Native", "Firebase RTDB", "Stripe", "OpenAI & Gemini", "BLE"],
			},
			{
				title: "Oliny — Cloud Business Phone & Shared Inbox",
				period: "Dec 2025 — Oct 2026",
				desc: "Quo-like VoIP business phone and team messaging application for US businesses. Twilio Voice SDK over WebRTC with JWT authentication, dynamic TwiML simultaneous/hunt group call distribution, Twilio Subaccounts multi-tenant isolation, automated phone number provisioning, and collaborative SMS/MMS inbox with signature verification.",
				tags: ["React Native", "Twilio Voice", "WebRTC", "TwiML", "Node.js", "Conversations API"],
			},
		],
	},
	{
		company: "DKTech",
		companyUrl: "https://dk-tech.vn/",
		title: "Mobile & Web Developer",
		period: "Dec 2023 — Oct 2025",
		location: "Ho Chi Minh City, Vietnam",
		summary:
			"Delivered 5+ production mobile and web applications in fintech, health, and e-commerce using React Native and TypeScript. Built cryptocurrency trading platforms featuring real-time candlestick charts (KLineChart, Highcharts) with low-latency WebSocket order book feeds. Enforced type-safe form validation standards (React Hook Form, Zod), conducted code reviews, and guided junior engineers.",
		highlights: [
			"Delivered 5+ production mobile and web applications in fintech, health, and e-commerce using React Native and TypeScript.",
			"Built cryptocurrency trading platforms featuring real-time candlestick charts (KLineChart, Highcharts) with low-latency WebSocket order book feeds.",
			"Enforced type-safe form validation standards (React Hook Form, Zod), conducted code reviews, and guided junior engineers.",
			"Built mobile commerce features: product catalogs, carts, payment integration, and order tracking.",
			"Integrated Web3 wallets (MetaMask, WalletConnect) for USDT payments and token reward systems.",
			"Implemented secure flows including KYC verification, 2FA (Google Authenticator API), and digital signatures.",
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
				title: "Trade - BO",
				period: "Dec 2023 — Oct 2025",
				desc: "Professional cryptocurrency trading platform featuring advanced technical charting (KLineChart) for multi-timeframe analysis, real-time WebSocket feeds for live order book streaming, interactive portfolio management, and Google Authenticator 2FA security.",
				tags: ["React", "KLineChart", "Socket.io", "Redux Toolkit", "Tailwind CSS"],
			},
			{
				title: "HEWE Fitness",
				period: "Jan 2024 — Mar 2024",
				desc: "Gamified fitness application with GPS tracking, referral reward systems, push notifications, and multi-language support (i18n).",
				tags: ["React Native", "Reanimated", "Maps", "Notifee"],
			},
			{
				title: "HeweCard",
				period: "Dec 2023 — Jan 2024",
				desc: "Digital card platform with Web3 USDT payments, KYC verification flow, referral tree hierarchy, and zero-downtime CodePush updates.",
				tags: ["React Native", "Web3", "CodePush"],
			},
		],
	},
];
