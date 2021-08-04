const inquirer = require('inquirer');

function mainMenu() {
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainChoice',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    ])
    .then((response) => {
        if(response === 'View All Departments') {
            viewDepartments();
        } else if (response === 'View All Roles') {
            viewRoles();
        } else if (response === 'View All Employees') {
            viewEmployees();
        } else if (response === 'Add a Department') {
            addDepartment();
        } else if (response === 'Add a Role') {
            addRole();
        } else if (response === 'Add an Employee') {
            addEmployee();
        } else if (response === 'Update an Employee Role') {
            updateEmployee();
        } else if (response === 'Exit') {
            console.log('Goodbye');
        }
    })
}

exports.mainMenu = mainMenu;