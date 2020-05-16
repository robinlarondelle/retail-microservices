CREATE DATABASE IF NOT EXISTS catalog;

USE catalog;

CREATE TABLE IF NOT EXISTS tpv(
    _id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product(
    _id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price NUMERIC,
    tpv VARCHAR(255)
);

CREATE INDEX id_index ON product(_id);

CREATE INDEX name_index ON product(name);