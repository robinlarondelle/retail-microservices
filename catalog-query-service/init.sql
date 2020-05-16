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
    price  VARCHAR(24),
    tpv VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX id_index ON product(_id);

CREATE INDEX name_index ON product(name);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '5D4U9hjra2F9x4TD';

flush PRIVILEGES;