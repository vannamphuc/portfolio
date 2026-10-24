import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { isAdminEmail } from "./admin";
import { auth } from "./auth";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
	const session = await auth.api.getSession({
		headers: getRequest().headers,
		returnHeaders: true,
	});

	// forward any Set-Cookie headers to the client, e.g. for session/cache refresh
	const cookies = session.headers?.getSetCookie();
	if (cookies?.length) {
		setResponseHeader("Set-Cookie", cookies);
	}

	return session.response?.user || null;
});

export const $getSessionUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await auth.api.getSession({
			headers: getRequest().headers,
			returnHeaders: true,
		});

		const cookies = session.headers?.getSetCookie();
		if (cookies?.length) {
			setResponseHeader("Set-Cookie", cookies);
		}

		const user = session.response?.user || null;
		return {
			user,
			isAdmin: isAdminEmail(user?.email),
		};
	},
);
