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

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select from the options below:',
                name: 'choice',
                choices: [
                    {
                        name: 'View All Departments',
                        value: 'viewDepartments'
                    },
                    {
                        name: 'View All Roles',
                        value: 'viewRoles'
                    },
                    {
                        name: 'View All Employees',
                        value: 'viewEmployees'
                    },
                    {
                        name: 'Add A Department',
                        value: 'addDepartment'
                    },
                    {
                        name: 'Add a Role',
                        value: 'addRole'
                    },
                    {
                        name: 'Add an Employee',
                        value: 'addEmployee'
                    },
                    {
                        name: 'Update Existing Employee Role',
                        value: 'updateRole'
                    },
                    {
                        name: 'Exit',
                        value: 'exit'
                    },
                ]
            }
        ]).then(response => {
            switch (response.choice) {
                case 'viewDepartments':
                    viewAllDepartments();
                    break;
                case 'viewRoles':
                    viewAllRoles();
                    break;
                case 'viewEmployees':
                    viewAllEmployees();
                    break;
                case 'addDepartment':
                    addDepartment();
                    break;
                case 'addRole':
                    addRole();
                    break;
                case 'addEmployee':
                    newEmployee();
                    break;
                case 'updateRole':
                    updateRole();
                    break;
                case 'exit':
                    db.end();
            }
        })
}


const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startApp();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the new Department',
            name: 'newDeptName',
        }
    ]) .then(function (answer) {
        db.query('INSERT INTO department SET ?',
            {
                department_name: answer.newDeptName
            }
        );
    }) .then(function (answer) {
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            startApp();
        })
    })

};


//TODO: fix add role, write add employee, write update employee.

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the New Role',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please enter the annual salary of the New Role',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'Please enter the department ID of the New Role',
            name: 'deptID',
        },
    ]) .then(function ({ title, salary, deptID }) {
        db.query('INSERT INTO role SET ?',
            {
                title: answer.title
            }
        );
    }) .then(function (answer) {
        db.query('INSERT INTO role SET ?',
            {
                salary: answer.salary
            }
        );
    }) .then(function (answer) {
        db.query('INSERT INTO role SET ?',
            {
                department_id: answer.deptID
            }
        );
    }) .then(function (answer) {
        db.query('SELECT * FROM role', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            startApp();
        })
    })
}


module.exports = { startApp }