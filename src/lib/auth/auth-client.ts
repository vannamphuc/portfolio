import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { env } from "#/env/client";

const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [magicLinkClient()],
});

export default authClient;
