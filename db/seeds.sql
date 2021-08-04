INSERT INTO departments (department_name)
VALUES ("Sales"),
       ("Human Resources"),
       ("Customer Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 14.00, 1),
       ("Recruiting Officer", 25.00, 2),
       ("Customer Service Rep", 15.00, 3),
       ("Payroll", 30.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
VALUES ("Stacey", "Dyer", 3, 3, 1),
       ("Marci", "Akermann", 2, 2, 2),
       ("Foster", "Bryon", 1, 1, 3),
       ("Milo", "Hampton", 6, 1, 2),
       ("Marlowe", "Gibb", 5, 1, 3),
       ("Griselda", "Grenville", 4, 3, 3);
