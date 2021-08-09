INSERT INTO department
    (department_name)
VALUES
    ('Customer Service'),
    ('Human Resources'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Resources Manager', 65000, 2),
    ('Customer Service Rep', 45000, 1),
    ('Accounts Receivable', 50000, 3),
    ('Billing', 50000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Stacey', 'Dyer', 2, 1),
    ('Marci', 'Akermann', 1, 2),
    ('Foster', 'Bryon', 4, 2),
    ('Milo', 'Hampton', 3, 2),
    ('Marlowe', 'Gibb', 4, 1),
    ('Griselda', 'Grenville', 4, 2);