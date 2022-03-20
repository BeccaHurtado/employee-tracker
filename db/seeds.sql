USE employee_tracker;

INSERT INTO department (dep_name)
VALUES
('sales'),('engineering'),('finance');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Manager', 15000, 1),
('Manager', 20000, 2),
('Manager', 15000, 3),
('Lead Engineer', 20000, 2),
('Sales Person', 15000, 1),
('Finance Person', 20000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Becca', 'Hurts', 1, NULL),
('Josh', 'Hurts', 2, NULL),
('Jose', 'Hurts', 3, NULL),
('Cristian', 'Hurts', 1, 1),
('Jill', 'Hurts', 2, 2),
('Jeremy', 'Hurts', 3, 3);
