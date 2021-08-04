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

//require functions built in another file
//const viewTables = require('./viewTables');
//const addValue = require('./addValue');
//const update = require('./update');

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
            name: 'newDepartmentName',
        }
    ])
};

function addRole() {

};

function addEmployee() {

};

function updateEmployee() {

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
            let newDepartment = await addDepartment();
            db.query(`INSERT INTO departments (department_name) VALUES ('${newDepartment.newDepartmentName}')`, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results)
            })
        } else if (userChoice.mainMenuOptions === 'Add a Role') {
            addRole();
        } else if (userChoice.mainMenuOptions === 'Add an Employee') {
            addEmployee();
        } else if (userChoice.mainMenuOptions === 'Update an Employee Role') {
            updateEmployee();
        } else if (userChoice.mainMenuOptions === 'Exit') {
            return console.log('Goodbye')
        }
    }


module.exports = { startApp }