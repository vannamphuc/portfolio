import nodemailer, { type Transporter } from "nodemailer";
import { env } from "#/env/server";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
	if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
		return null;
	}
	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			secure: true,
			port: env.SMTP_PORT ?? 465,
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS,
			},
		});
	}
	return transporter;
}

export async function sendMagicLinkEmail(to: string, url: string) {
	const from = env.SMTP_FROM ?? "onboarding@resend.dev";
	const subject = "Sign in to Phuc Nam's portfolio";
	const html = `<p>Click the link below to sign in. It expires in 5 minutes.</p><p><a href="${url}">Sign in</a></p><p>If you did not request this, you can ignore this email.</p>`;

	const smtp = getTransporter();
	if (!smtp) {
		console.log(`[magic-link] No SMTP configured. Sign-in URL for ${to}: ${url}`);
		return;
	}

	await smtp.sendMail({ from, to, subject, html });
}
