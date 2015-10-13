-- DROP DATABASE "norsyncCloud";

CREATE DATABASE "norsyncCloud"
  WITH OWNER = root
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'English_United States.1252'
       LC_CTYPE = 'English_United States.1252'
       CONNECTION LIMIT = -1;

CREATE TABLE "User"
(
  username character varying(250) NOT NULL,
  password character varying(250),
  email character varying(250) NOT NULL,
  id integer NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY (id),
  CONSTRAINT "User_email_key" UNIQUE (email)
)
WITH (
OIDS=FALSE
);