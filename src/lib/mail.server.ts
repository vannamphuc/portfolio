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
		console.log(
			`[mail] No SMTP configured in .env. Contact from ${opts.name} <${opts.from}>:\nSubject: ${opts.subject || "(none)"}\nMessage: ${opts.message}`,
		);
		return { success: true, simulated: true };
	}

	await smtp.sendMail({
		from: `"${opts.name}" <${env.SMTP_USER}>`,
		replyTo: opts.from,
		to,
		subject: opts.subject?.trim() || `[Portfolio] Message from ${opts.name}`,
		text: opts.message,
		html: `
			<div style="font-family: sans-serif; line-height: 1.6; color: #111;">
				<h2 style="margin-bottom: 8px;">New message from portfolio contact form</h2>
				<p><strong>Name:</strong> ${opts.name}</p>
				<p><strong>Email:</strong> <a href="mailto:${opts.from}">${opts.from}</a></p>
				${opts.subject ? `<p><strong>Subject:</strong> ${opts.subject}</p>` : ""}
				<hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
				<p style="white-space: pre-wrap;">${opts.message}</p>
			</div>
		`,
	});

	return { success: true, simulated: false };
}
