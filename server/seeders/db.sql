create user short_url with password 'short_url';

DROP database  IF EXISTS "short_url_db";
create database short_url_db;
grant all privileges on database short_url_db to short_url;

\c short_url_db;
DROP TABLE  IF EXISTS "urls";
CREATE TABLE "urls" (
  "id" SERIAL PRIMARY KEY,
  "longUrl" VARCHAR,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "urls" OWNER to short_url;
ALTER SEQUENCE "urls_id_seq" START 1001 RESTART 1001 MINVALUE 1000;

DROP database  IF EXISTS "short_url_test_db";
create database short_url_test_db;
grant all privileges on database short_url_test_db to short_url;

\c short_url_test_db;
DROP TABLE  IF EXISTS "urls";
CREATE TABLE "urls" (
  "id" SERIAL PRIMARY KEY,
  "longUrl" VARCHAR,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
ALTER TABLE "urls" OWNER to short_url;
