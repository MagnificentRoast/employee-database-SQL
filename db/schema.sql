DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMEMT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);