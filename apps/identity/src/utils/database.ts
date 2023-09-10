import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Context } from "hono";
import { env } from "hono/adapter";
import * as schema from "../database/schema";

neonConfig.fetchConnectionCache = true;

export function useDatabase(context: Context) {
    const { DATABASE_URL } = env(context);

    const sql = neon(DATABASE_URL);

    return drizzle(sql, {
        schema,
    });
}
