import { env } from "#/env/server";

function parseAdminEmails(raw: string): string[] {
	return raw
		.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

export function getAdminEmails(): string[] {
	return parseAdminEmails(env.ADMIN_EMAILS);
}

export function isAdminEmail(email: string | null | undefined): boolean {
	if (!email) return false;
	return getAdminEmails().includes(email.trim().toLowerCase());
}
