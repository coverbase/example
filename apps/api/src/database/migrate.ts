import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({ path: ".dev.vars" });

const database = drizzle(postgres(`${process.env.DATABASE_URL}`, { ssl: "require", max: 1 }));

const main = async () => {
    try {
        await migrate(database, { migrationsFolder: "src/drizzle" });

        console.log("Migration complete");
    } catch (error) {
        console.log(error);
    }

    process.exit(0);
};

main();
