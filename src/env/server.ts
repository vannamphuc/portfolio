import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
	server: {
		VITE_BASE_URL: z.url().default("http://localhost:3000"),

		// SMTP for contact form emails (nodemailer), optional
		// Without these, emails are logged to the server console instead
		SMTP_HOST: z.string().optional(),
		SMTP_PORT: z.coerce.number().optional(),
		SMTP_USER: z.string().optional(),
		SMTP_PASS: z.string().optional(),
		// The address that receives contact form submissions
		SMTP_FROM: z.string().optional(),
	},
	runtimeEnv: process.env,
});
