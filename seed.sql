--Delete database if already it aleady exists
DROP DATABASE IF EXISTS employee_trackerdb;

--Create Database
CREATE DATABASE employee_trackerdb;

--Use this database
USE employee_trackerdb;

--Create table for departments
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NULL,
    PRIMARY KEY (id)    
);

--Create table for roles
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

--Create table foe employees
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NULL,
    last_name VARCHAR (30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

--Seed data for departments
INSERT INTO department(name)
VALUES ("Sales");

INSERT INTO department(name)
VALUES ("Engineering");

INSERT INTO department(name)
VALUES ("Finance");

INSERT INTO department(name)
VALUES ("Legal");

--Seed data for roles, salaries, and corresponding department
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

--Seed data for intial employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriguez", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Malia", "Brown", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sarah", "Lourd", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 7, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckenrode", 3, 2);

--Query for viewing All employees
SELECT employee.first_name, employee.last_name, role.title, departments.department, role.salary, employee.manager_id
FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)
ORDER BY employee.last_name;

--Query for Viewing all employees by department
SELECT departments.department, employee.first_name, employee.last_name
FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)
ORDER BY departments.department;

--Query for viewing employees for deletion
SELECT employee.first_name, employee.last_name, departments.department
FROM employee INNER JOIN role on (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)
ORDER BY employee.last_name;