DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NULL,
    PRIMARY KEY (id)    
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NULL,
    last_name VARCHAR (30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES ("Sales");

INSERT INTO department(name)
VALUES ("Engineering");

INSERT INTO department(name)
VALUES ("Finance");

INSERT INTO department(name)
VALUES ("Legal");


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


SELECT employee.first_name, employee.last_name, role.title, departments.department, role.salary, employee.manager_id
FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)
ORDER BY employee.last_name;

SELECT departments.department, employee.first_name, employee.last_name
FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN departments ON (role.department_id = departments.id)
ORDER BY departments.department;

