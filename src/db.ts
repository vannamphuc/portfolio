import { neon } from "@neondatabase/serverless";
import { env } from "./env/server";

let client: ReturnType<typeof neon>;

export async function getClient() {
	const databaseUrl = env.DATABASE_URL;
	if (!databaseUrl) {
		return undefined;
	}
	if (!client) {
		client = await neon(databaseUrl);
	}
	return client;
}
