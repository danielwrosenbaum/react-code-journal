set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."journal" (
  "entryId"             serial,
  "createdAt"           timestamp not null default now(),
  "title"               text,
  "photoUrl"            text,
  "notes"               text,
  primary key ("entryId")
);
