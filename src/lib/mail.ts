import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import * as z from "zod";

const contactPayloadSchema = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.email().max(254),
	subject: z.string().trim().max(200).optional(),
	message: z.string().trim().min(1).max(5000),
});

export const $sendContactEmail = createServerFn({ method: "POST" })
	.validator((data: unknown) => contactPayloadSchema.parse(data))
	.handler(async ({ data }) => {
		const { checkContactRateLimit, sendContactEmail } = await import(
			"./mail.server"
		);
		try {
			const forwardedFor = getRequestHeader("x-forwarded-for");
			const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
			if (!checkContactRateLimit(clientIp)) {
				throw new Error("Too many contact submissions");
			}
			const res = await sendContactEmail({
				name: data.name,
				from: data.email,
				subject: data.subject,
				message: data.message,
			});
			if (!res.success) {
				throw new Error("Failed to send email");
			}
			return res;
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "Too many contact submissions"
			) {
				throw error;
			}
			if (
				error instanceof Error &&
				error.message === "Contact email service is not configured"
			) {
				throw error;
			}
			console.error("[mail] Error sending email:", error);
			throw new Error("Failed to send email");
		}
	});
