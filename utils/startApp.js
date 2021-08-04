const mysql = require('mysql2');
require('dotenv').config();
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to the Company Database.')
);

function mainMenu () {
    return inquirer.prompt([
        {
            type:'list',
            message: 'What would you like to do?',
            name: 'mainMenuOptions',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    ])
} 


function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the new Department',
            name: 'newDeptName',
        }
    ])

};

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the title of the new Role',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please enter the hour salary(decimal form) of the new Role',
            name: 'salary',
        },
        {
            type: 'input',
            message: "Please enter the new Role's Department ID",
            name: 'roleDept',
        },
    ])
};

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the First Name of the new Employee',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Please enter the Last Name of the new Employee',
            name: 'lastName',
        },
        {
            type: 'input',
            message: "Please enter the new Employee's Role ID",
            name: 'roleID',
        },
        {
            type: 'input',
            message: "Please enter the new Employee's Manager's ID",
            name: 'managerID',
        },
        {
            type: 'input',
            message: "Please enter the new Employee's Department ID",
            name: 'empDeptID',
        },
    ])
};

function updateEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the ID of the Epmloyee you wish to update',
            name: 'updateStart',
        },
        {
            type: 'input',
            message: "Please enter the Employee's new Role ID",
            name: 'updatedRole',
        },
        {
            type: 'input',
            message: "Please enter the Employeesn's new Manager ID",
            name: 'updatedManagerID',
        },
        {
            type: 'input',
            message: "Please enter the Employee's new Department ID",
            name: 'roleDept',
        },
    ])
};

async function startApp() {
    let userChoice = await mainMenu();
        if (userChoice.mainMenuOptions === 'View All Departments') {
            viewDepartments();
        } else if (userChoice.mainMenuOptions === 'View All Roles') {
            viewRoles();
        } else if (userChoice.mainMenuOptions === 'View All Employees') {
            viewEmployees();
        } else if (userChoice.mainMenuOptions === 'Add a Department') {
            const newDepartment = await addDepartment();
            db.query(`INSERT INTO departments (department_name) VALUES ('${newDepartment.newDeptName}')`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results);
            })
            startApp();
        } else if (userChoice.mainMenuOptions === 'Add a Role') {
            const newRole = await addRole();
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${newRole.title}', '${newRole.salary}', '${newRole.roleDept}')`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results);
            })
            startApp();
        } else if (userChoice.mainMenuOptions === 'Add an Employee') {
            const newEmployee = await addEmployee();
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES ('${newEmployee.firstName}', '${newEmployee.lastName}', '${newEmployee.roleID}', '${newEmployee.managerID}', '${newEmployee.empDeptID}')`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results);
            })
            startApp();
        } else if (userChoice.mainMenuOptions === 'Update an Employee Role') {
            const updatedEmployee = await updateEmployee();
            db.query(`UPDATE employee SET role_id = '${updatedEmployee.updatedRole}' WHERE id = ?`, updatedEmployee.updateStart, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results)
            });
            db.query(`UPDATE employee SET manager_id = '${updatedEmployee.updatedManagerID}' WHERE id = ?`, updatedEmployee.updatedManagerID, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results)
            });
            db.query(`UPDATE employee SET department_id = '${updatedEmployee.roleDept}' WHERE id = ?`, updatedEmployee.roleDept, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results)
            });
        } else if (userChoice.mainMenuOptions === 'Exit') {
            console.log('Goodbye')
            return;
        }
    }


module.exports = { startApp }