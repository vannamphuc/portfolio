import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { NotFound } from "#/components/not-found";
import { SITE, SITE_JSON_LD } from "#/lib/site";
import appCss from "../styles.css?url";

const Devtools = import.meta.env.DEV
	? lazy(() =>
		import("../integrations/devtools").then((m) => ({ default: m.Devtools })),
	)
	: null;

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: SITE.title,
			},
			{
				name: "description",
				content: SITE.description,
			},
			{
				name: "author",
				content: SITE.author,
			},
			{
				name: "theme-color",
				content: "#17150f",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			// Open Graph
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: SITE.name,
			},
			{
				property: "og:title",
				content: SITE.title,
			},
			{
				property: "og:description",
				content: SITE.description,
			},
			{
				property: "og:url",
				content: SITE.url,
			},
			{
				property: "og:image",
				content: SITE.ogImage,
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:locale",
				content: SITE.locale,
			},
			// Twitter Card
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: SITE.title,
			},
			{
				name: "twitter:description",
				content: SITE.description,
			},
			{
				name: "twitter:image",
				content: SITE.ogImage,
			},
			// Structured data
			{
				"script:ld+json": SITE_JSON_LD,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: SITE.url,
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico?v=2",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
			},
		],
		scripts: [
			{
				// Apply saved theme before first paint to avoid a light flash.
				children: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;}catch(e){}})();`,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Outlet />
				{Devtools && (
					<Suspense fallback={null}>
						<Devtools />
					</Suspense>
				)}
				<Scripts />
			</body>
		</html>
	);
}
