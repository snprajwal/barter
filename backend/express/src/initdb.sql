DROP ROLE IF EXISTS express;
CREATE ROLE express WITH LOGIN PASSWORD 'medicart';
ALTER ROLE express CREATEDB;
\c postgres express;

DROP DATABASE IF EXISTS medicart;
CREATE DATABASE medicart;
\c medicart;

CREATE SCHEMA consumer;
CREATE SCHEMA seller;

CREATE TABLE consumer."user" (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	email VARCHAR UNIQUE,
	phone VARCHAR UNIQUE,
	password VARCHAR
);

CREATE TABLE seller.product (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	price INTEGER
);
