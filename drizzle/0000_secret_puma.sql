CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(25) NOT NULL,
	"email" varchar(25) NOT NULL,
	"full_name" text NOT NULL,
	"password" text NOT NULL,
	"refresh_token" text NOT NULL
);
