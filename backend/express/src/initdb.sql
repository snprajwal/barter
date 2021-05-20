DROP DATABASE IF EXISTS medicart;
DROP ROLE IF EXISTS express;
CREATE ROLE express WITH LOGIN PASSWORD 'medicart';
ALTER ROLE express CREATEDB;
\c postgres express;

CREATE DATABASE medicart;
\c medicart;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	email VARCHAR UNIQUE,
	phone VARCHAR UNIQUE,
	password VARCHAR
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	price INTEGER
);
