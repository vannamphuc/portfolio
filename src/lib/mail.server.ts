import nodemailer, { type Transporter } from "nodemailer";
import { env } from "#/env/server";

const submissionWindowMs = 60 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const submissionsByIp = new Map<string, number[]>();

export function checkContactRateLimit(ip: string): boolean {
	const now = Date.now();
	if (submissionsByIp.size >= 10_000 && !submissionsByIp.has(ip)) {
		for (const [key, timestamps] of submissionsByIp) {
			if (
				timestamps.every((timestamp) => now - timestamp >= submissionWindowMs)
			) {
				submissionsByIp.delete(key);
			}
		}
		if (submissionsByIp.size >= 10_000) {
			return false;
		}
	}
	const recentSubmissions = (submissionsByIp.get(ip) ?? []).filter(
		(timestamp) => now - timestamp < submissionWindowMs,
	);
	if (recentSubmissions.length >= maxSubmissionsPerWindow) {
		submissionsByIp.set(ip, recentSubmissions);
		return false;
	}
	recentSubmissions.push(now);
	submissionsByIp.set(ip, recentSubmissions);
	return true;
}

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};
		return entities[char];
	});
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
	if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
		return null;
	}
	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			secure: env.SMTP_PORT === 465,
			port: env.SMTP_PORT ?? 465,
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS,
			},
		});
	}
	return transporter;
}

export async function sendContactEmail(opts: {
	from: string;
	name: string;
	subject?: string;
	message: string;
}) {
	const to = env.SMTP_FROM ?? env.SMTP_USER;
	if (!to) {
		console.warn(
			"[mail] No destination address configured (SMTP_FROM / SMTP_USER).",
		);
		return { success: false, reason: "no_destination" };
	}

	const smtp = getTransporter();
	if (!smtp) {
		console.error(
			"[mail] SMTP is not configured; contact message was not sent.",
		);
		return { success: false, reason: "smtp_not_configured" };
	}
	const smtpUser = env.SMTP_USER;
	if (!smtpUser) {
		console.error(
			"[mail] SMTP is not configured; contact message was not sent.",
		);
		return { success: false, reason: "smtp_not_configured" };
	}
	const name = escapeHtml(opts.name);
	const email = escapeHtml(opts.from);
	const subject = opts.subject ? escapeHtml(opts.subject) : "";
	const message = escapeHtml(opts.message);

	await smtp.sendMail({
		from: { name: opts.name, address: smtpUser },
		replyTo: opts.from,
		to,
		subject: opts.subject?.trim() || `[Portfolio] Message from ${opts.name}`,
		text: opts.message,
		html: `
			<div style="font-family: sans-serif; line-height: 1.6; color: #111;">
				<h2 style="margin-bottom: 8px;">New message from portfolio contact form</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
				${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
				<hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
				<p style="white-space: pre-wrap;">${message}</p>
			</div>
		`,
	});

	return { success: true };
}
