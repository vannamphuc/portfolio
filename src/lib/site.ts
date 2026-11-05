import { env } from "#/env/client";

const SITE_URL = env.VITE_BASE_URL.replace(/\/$/, "");

export const SITE = {
	name: "Van Nam Phuc",
	title: "Van Nam Phuc — Full-Stack & Mobile Engineer",
	description:
		"Portfolio of Van Nam Phuc — Full-Stack & Mobile Engineer with 3 years of experience across React Native, ReactJS, Node.js, Twilio VoIP, and cloud systems.",
	url: SITE_URL,
	ogImage: `${SITE_URL}/og-image.png`,
	locale: "en_US",
	author: "Van Nam Phuc",
	email: env.VITE_MY_EMAIL,
	github: env.VITE_GITHUB_URL,
	linkedin: env.VITE_LINKEDIN_URL,
} as const;

export const SITE_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: SITE.name,
	jobTitle: "Full-Stack & Mobile Engineer",
	url: SITE.url,
	email: `mailto:${SITE.email}`,
	sameAs: [SITE.github, SITE.linkedin],
	knowsAbout: [
		"React Native",
		"ReactJS",
		"Node.js",
		"Twilio VoIP",
		"WebRTC",
		"AWS",
		"Firebase",
		"Stripe",
	],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Ho Chi Minh City",
		addressCountry: "VN",
	},
} as const;
