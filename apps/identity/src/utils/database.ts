import { env } from "@coverbase/http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { H3Event } from "h3";
import * as schema from "../database/schema";

neonConfig.fetchConnectionCache = true;

export function useDatabase(event: H3Event) {
    const { DATABASE_URL } = env(event);

    const sql = neon(DATABASE_URL);

    return drizzle(sql, {
        schema,
    });
}
