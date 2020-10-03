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
    department_id INT, --this is a foreign key coming from departments
    PRIMARY KEY(id)
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, -- this is a foreign key coming from a list of managers. may be null.
    PRIMARY KEY(id)
);

-- DO WE NEED A SEPERATE TABLE FOR MANAGERS ONLY? CAN WE DO THIS BY DRAWING FROM --THE EMPLOYEES TABLE AND USING ROLE TO INDICATE THAT THIS PERSON IS A MANAGER? --OR DO WE JUST USE THE ROLE AS A FILTER ON THE EMPLOYEES LIST AND NOT CREATE A --SEPERATE TABLE?