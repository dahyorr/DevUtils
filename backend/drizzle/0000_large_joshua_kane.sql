CREATE TYPE "public"."HashStatus" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."HashType" AS ENUM('md5', 'sha256', 'sha512', 'sha224');--> statement-breakpoint
CREATE TABLE "File" (
	"id" text PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"key" text NOT NULL,
	"size" integer NOT NULL,
	"mimetype" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Hash" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "HashType" NOT NULL,
	"file_id" text NOT NULL,
	"hash" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"status" "HashStatus" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Hash" ADD CONSTRAINT "Hash_file_id_File_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."File"("id") ON DELETE restrict ON UPDATE cascade;