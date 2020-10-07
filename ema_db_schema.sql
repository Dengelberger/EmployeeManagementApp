DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);
