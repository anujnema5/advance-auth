// MAKING AN INSTANCE OF OUR DB CLIENT
import * as Schema from './schema';
import postgres from 'postgres';
import {drizzle} from 'drizzle-orm/postgres-js'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL as string
const client = postgres(connectionString)

export const db = drizzle(client, {
    schema: Schema
})