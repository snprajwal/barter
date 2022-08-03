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

CREATE TYPE transaction_type AS ENUM ('credit', 'debit');

CREATE TABLE transactions (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users,
	transfer_type TRANSACTION_TYPE,
	amount INT,
	created_at DATE DEFAULT NOW()
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	price INT
);

CREATE TABLE inventory (
	product_id INT PRIMARY KEY REFERENCES products,
	seller_id INT REFERENCES users,
	quantity INT
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	buyer_id INT REFERENCES users,
	product_id INT REFERENCES products,
	quantity INT,
	price INT,
	created_at DATE DEFAULT NOW()
);

CREATE TABLE delivery (
	order_id PRIMARY KEY REFERENCES orders,
	due_at DATE DEFAULT NOW() + INTERVAL '2 days',
	delivered_at DATE
);
