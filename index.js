const inquirer = require('inquirer');
const jest = require('jest');
const db = require('./helpers/db_class');



function mainMenu() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "next",
            choices: [
                'View all departments',
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Quit',
                new inquirer.Separator()
            ]
        }])
        .then((answers) => {
            console.log(answers.next)
            menuSelect(answers);
        })
        .then(() => {
            db.refreshCurrentDepartments()
            
        })
         
}



function menuSelect(answers) {
    const nextStep = answers.next;

    switch (nextStep) {
        case 'View all departments':
        db.viewDepartments()
        break
        case 'View all roles':
        db.viewRoles()
        break
        case 'View all employees':
        db.viewEmployees()
        break
        case 'Add a department':
        addDepartment()
        break
        case 'Add a role':
        addRole()
        break
        case 'Add an employee':
        addEmployee()
        break
        case 'Update an employee role':
        updateEmployeeRole()
        break
        case 'Quit':
        break
    }
}




// functions for adding/ammending tables 

function addDepartment() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter a name for the new department'
        }
    ])
        .then((answers) => {
            const {department_name} = answers
            db.addDepartment(department_name);
        })
};



function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'Enter a title for the new role'
            },
            {
                type: 'input',
                name: 'role_salary',
                message: 'Enter a salary for the new role'
            },
            {
                type: 'list',
                name: 'new_role_department',
                message: 'Select a department for the new role',
                choices: db.departments
            }
        ])
        .then((answers) => {
            db.insertRole(answers);
        })
        .then(() => mainMenu());
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee\'s first name'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee\'s last name'
            },
            {
                type: 'input',
                name: 'employee_role',
                message: 'Enter the employee\'s role'
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the name of the employee\'s manager'
            },
        ])
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee_list',
                message: 'Select an employee',
                choices: []
            },
            {
                type: 'list',
                name: 'selected_employee',
                message: 'Select a new role for the employee',
                choices: []
            }
        ])
};




mainMenu()