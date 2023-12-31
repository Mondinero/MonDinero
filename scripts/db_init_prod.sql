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
);

CREATE TABLE budget (
  "_id" serial NOT NULL,
  "month" varchar NOT NULL,
  "user_id" int NOT null,
  "income" varchar NOT NULL,
  "entertainment" varchar NOT NULL,
  "food_and_drink" varchar NOT NULL,
  "general_merchandise" varchar NOT NULL,
  "transportation" varchar NOT NULL,
  "travel" varchar NOT NULL,
  "rent_and_utilities" varchar NOT NULL,
  CONSTRAINT "budget_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "budget_users_fk" FOREIGN KEY (user_id) REFERENCES users (_id)
);

CREATE TABLE item_access (
  _id serial NOT NULL,
  item_id varchar NOT NULL,
  user_id int NOT null,
  access_token varchar NOT NULL,
  request_id varchar NOT null,
  PRIMARY KEY(item_id),
  CONSTRAINT item_access_users_fk FOREIGN KEY(user_id) references users(_id)
)
