INSERT INTO departments (department_name)
VALUES ('Management'),
       ('Accounting'),
       ('Human Resources'),
       ('Sales'),
       ('Shipping and Logistics');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 100000.00, 1),
       ('Accountant', 80000.99, 2),
       ('HR Specialist', 70000.00, 3),
       ('Sales Person', 75000.99, 4),
       ('Warehouse Clerk', 65000.6, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, null),
       ('Oscar', 'Martinez', 2, 1),
       ('Toby', 'Flenderson', 3, 1),
       ('Jim', 'Halpert', 4, 1),
       ('Daryl', 'Philbin', 5, 1);
      
