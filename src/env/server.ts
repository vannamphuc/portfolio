import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		VITE_BASE_URL: z.url().default("http://localhost:3000"),
		BETTER_AUTH_SECRET: z.string().min(1),

		// Comma-separated admin emails, e.g. "a@gmail.com,b@gmail.com"
		ADMIN_EMAILS: z.string().default(""),

		// OAuth2 providers, optional, update as needed
		GITHUB_CLIENT_ID: z.string().optional(),
		GITHUB_CLIENT_SECRET: z.string().optional(),
		GOOGLE_CLIENT_ID: z.string().optional(),
		GOOGLE_CLIENT_SECRET: z.string().optional(),

		// SMTP for magic-link emails (Resend SMTP), optional
		SMTP_HOST: z.string().optional(),
		SMTP_PORT: z.coerce.number().optional(),
		SMTP_USER: z.string().optional(),
		SMTP_PASS: z.string().optional(),
		SMTP_FROM: z.string().optional(),
	},
	runtimeEnv: process.env,
});
