DROP DATABASE IF EXISTS barter;
DROP ROLE IF EXISTS express;
CREATE ROLE express WITH LOGIN PASSWORD 'barter';
ALTER ROLE express CREATEDB;
\c postgres express;

CREATE DATABASE barter;
\c barter;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	email VARCHAR UNIQUE,
	phone VARCHAR UNIQUE,
	password VARCHAR
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	owner VARCHAR,
	name VARCHAR,
	quantity INTEGER,
	price INTEGER
);
