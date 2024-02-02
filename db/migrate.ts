import { db } from ".";
import { migrate } from 'drizzle-orm/postgres-js/migrator'

async function main() {
    console.log("Migration started 🔥");

    try {
        await migrate(db, { migrationsFolder: 'drizzle' })
        console.log("Migration ended 😋");
        process.exit(0)
    } 
    
    catch (error) {
        console.log(error);
        process.exit(0)
    }
}

main();