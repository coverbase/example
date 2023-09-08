import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../database/schema";

neonConfig.fetchConnectionCache = true;

export function useDatabase() {
    const sql = neon(process.env.DATABASE_URL!);

    return drizzle(sql, {
        schema,
    });
}
