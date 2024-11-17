alter table "public"."project" drop constraint "project_hash_key";

drop index if exists "public"."project_hash_key";

alter table "public"."project" drop column "hash";

alter table "public"."project" drop column "iterations";

alter table "public"."project" drop column "salt";

alter table "public"."project" alter column "name" drop not null;

alter table "public"."project" alter column "name" set data type text using "name"::text;


