\connect mondinerodb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;


CREATE TABLE users (
  "_id" serial NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
)
