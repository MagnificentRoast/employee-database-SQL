use employees;

SELECT * FROM employees;
SELECT * FROM department;
SELECT * FROM role;

INSERT INTO department
    (name)
    VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
    VALUES
        ('Management', 100000, 1),
        ('Administration', 80000, 1),
        ('Senior developer', 150000, 2),
        ('Back-end lead', 120000, 2),
        ('Account Management', 160000, 3),
        ('Account Supervisor', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Legal', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES
        ('Malory', 'Archer', 1, 1),
        ('Cyril', 'Figgis', 2, 1),
        ('Carol/Cheryl', 'Tunt', 3, 1),
        ('Algernop', 'Krieger', 4, 3),
        ('Sterling', 'Archer', 5, 1),
        ('Lana', 'Kane', 6, 5),
        ('Brett', 'Bunson', 7, 1),
        ('Pamela', 'Poovey', 8, 7);

