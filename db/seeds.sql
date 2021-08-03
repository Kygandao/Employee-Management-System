INSERT INTO departments (department_name)
VALUES ("Sales"),
       ("Human Resources"),
       ("Customer Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 14.00, 1),
       ("Recruiting Officer", 25.00, 2),
       ("Customer Service Rep", 15.00, 3),
       ("Payroll", 30.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Stacey", "Dyer", 3, 2),
       ("Marci", "Akermann", 2, 2),
       ("Foster", "Bryon", 1, 1),
       ("Milo", "Hampton", 2, 1),
       ("Marlowe", "Gibb", 3, 1),
       ("Griselda", "Grenville", 1, 3);
