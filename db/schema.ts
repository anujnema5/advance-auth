import { PgTable, pgTable, primaryKey, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id : serial('id').primaryKey().notNull(),
    username : varchar('username', {length: 25}).notNull(),
    email : varchar('email', {length: 25}).notNull(),
    fullName: text('full_name').notNull(),
    password : text('password').notNull(),
    refreshToken : text('refresh_token')
})