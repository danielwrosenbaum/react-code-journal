set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."journal" (
  "entryId"             serial,
  "title"               text,
  "photoUrl"            text,
  "notes"               text,
  "createdAt"           timestamptz(6) not null default now(),
  primary key ("entryId")
);
