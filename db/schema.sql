/* deletes the database if it exists */
DROP DATABASE IF EXISTS employees;

/* Creates employees database when sourced */
CREATE DATABASE employees;

/* selects the employees database when sourced */
USE employees;

/* department table */
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

/* role table */
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

/* employee table */
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);