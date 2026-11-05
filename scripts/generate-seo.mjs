// Generates `public/sitemap.xml` and `public/robots.txt` at build time,
// using the deployment base URL (falls back to localhost for local builds).
// Run automatically via the `build` script.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

function readDotEnv(key) {
	try {
		const envFile = readFileSync(join(rootDir, ".env"), "utf8");
		const match = envFile.match(new RegExp(`^${key}=(.*)$`, "m"));
		return match?.[1]?.trim().replace(/^["']|["']$/g, "");
	} catch {
		return undefined;
	}
}

const baseUrl = (
	process.env.VITE_BASE_URL ??
	readDotEnv("VITE_BASE_URL") ??
	"http://localhost:3000"
).replace(/\/$/, "");

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/experience</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

const robots = `# Generated at build time — do not edit manually.
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

writeFileSync(join(rootDir, "public", "sitemap.xml"), sitemap);
writeFileSync(join(rootDir, "public", "robots.txt"), robots);
console.log(`[seo] Generated sitemap.xml and robots.txt for ${baseUrl}`);
