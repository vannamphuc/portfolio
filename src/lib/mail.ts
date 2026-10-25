import { createServerFn } from "@tanstack/react-start";

export interface ContactPayload {
	name: string;
	email: string;
	subject?: string;
	message: string;
}

export const $sendContactEmail = createServerFn({ method: "POST" })
	.validator((data: ContactPayload) => data)
	.handler(async ({ data }) => {
		const { sendContactEmail } = await import("./mail.server");
		try {
			const res = await sendContactEmail({
				name: data.name,
				from: data.email,
				subject: data.subject,
				message: data.message,
			});
			return res;
		} catch (error) {
			console.error("[mail] Error sending email:", error);
			throw new Error("Failed to send email");
		}
	});
