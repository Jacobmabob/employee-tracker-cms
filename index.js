const inquirer = require('inquirer');
const jest = require('jest');
const mysql = require('mysql2');
const table = require('console.table');

db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'mozambiquehere333!',
        database: 'employeecms_db'
    },
    console.log(`Connected to the Employee CMS database.`)
);

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
                new inquirer.Separator(),
                'Add a department',
                'Add a role',
                'Add an employee',
                new inquirer.Separator(),
                'Update an employee role',
                new inquirer.Separator(),
                'Quit',
                new inquirer.Separator()
            ]
        }])
        .then((answers) => {
            switch (answers.next) {
                case 'View all departments':
                    viewDepartments();
                    break
                case 'View all roles':
                    viewRoles()
                    break
                case 'View all employees':
                    viewEmployees()
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
        })

}



function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        mainMenu();
    })

}

function viewRoles() {
    const sql = `SELECT roles.id, 
                    roles.title,
                    roles.salary,
                    departments.department_name
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    `
    db.query(sql, function (err, results) {
        err ? console.log(err) : console.table(results);
        mainMenu();
    });
}

function viewEmployees() {
    const sql = `SELECT employees.id, 
                    employees.first_name,
                    employees.last_name,
                    roles.title,
                    departments.department_name,
                    roles.salary,
                    CONCAT (manager.first_name, ' ', manager.last_name) AS 'manager'
                    FROM employees
                    INNER JOIN roles on employees.role_id = roles.id
                    INNER JOIN departments ON departments.id = roles.department_id
                    LEFT JOIN employees AS manager ON (employees.manager_id = manager.id)
                    `

    db.query(sql, function (err, results) {
        if (err) {
            console.log(err)
        }
        console.table(results);
        mainMenu();
    });
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
            db.query('INSERT INTO departments (department_name) VALUES (?)', answers.department_name, (err, result) => {
                console.log(`Department Added Successfully`);
                mainMenu()
            })
        })
};



function addRole() {
    const departments = [];
    let departmentId = 0;

    function getDepartments() {
        db.query('SELECT department_name FROM departments', (err, result) => {
            for (let i = 0; i < result.length; i++) {
                departments.push(result[i].department_name)
            }
        })
    }

    function setDepartment(value) {
        departmentId = value;
        console.log(departmentId)
    }


    getDepartments()

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
                choices: departments
            }
        ])
        .then((answers) => {

            const { role_title, role_salary, new_role_department } = answers;

            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;


            db.promise().query(`SELECT id FROM departments WHERE department_name = "${new_role_department}"`)
                .then((answer) => {
                    setDepartment(answer[0][0].id)
                })
                .then(() => {
                    db.query(sql, [role_title, role_salary, departmentId], (err, result) => {
                        err ? console.log(err) : mainMenu()
                    });
                })

        })


};

function addEmployee() {
    let roles = [];
    let managers = [];
    let employeeId;
    let roleId

    function getRoles() {
        db.query('SELECT title FROM roles', (err, result) => {
            for (let i = 0; i < result.length; i++) {
                roles.push(result[i].title)
            }
        })
    }

    function getManagers() {
        db.query('SELECT first_name, last_name FROM employees', (err, result) => {
            for (let i = 0; i < result.length; i++) {
                managers.push(result[i].first_name.concat(" " + result[i].last_name))
            }
        })
    }

    getRoles();
    getManagers();

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
                type: 'list',
                name: 'employee_roles',
                message: 'Select the employee\'s role',
                choices: roles
            },
            {
                type: 'list',
                name: 'employee_manager',
                message: 'Select the name of the employee\'s manager',
                choices: managers
            },
        ])
        .then((answers) => {
            const { first_name, last_name, employee_roles, employee_manager } = answers

            const fullName = employee_manager.split(' ');
            const firstName = fullName[0];
            const lastName = fullName[1];



            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES( ? , ? , ? , ? )`

            db.promise().query(`SELECT id FROM roles WHERE title = "${employee_roles}"`)
                .then((answer) => {
                    setRole(answer[0][0].id)
                })
                .then(() => {
                    return db.promise().query(`SELECT id FROM employees WHERE first_name = "${firstName}" AND last_name = "${lastName}"`)
                })
                .then((answer) => {
                    setManager(answer[0][0].id)
                })
                .then(() => {
                    return db.promise().query(sql, [first_name, last_name, roleId, employeeId])
                })
                .then((answer) => {
                    console.log('Employee successfully added!')
                    mainMenu()
                })

        })


    function setManager(value) {
        employeeId = value;
    }

    function setRole(value) {
        roleId = value;
    }
};

function updateEmployeeRole() {
    const roles = [];
    const employees = [];

    function getRoles() {
        db.query('SELECT title FROM roles', (err, result) => {
            for (let i = 0; i < result.length; i++) {
                roles.push(result[i].title);
            }
        });
    };


    function getEmployees() {
        db.query('SELECT first_name, last_name FROM employees', (err, result) => {
            for (let i = 0; i < result.length; i++) {
                employees.push(result[i].first_name.concat(" " + result[i].last_name))
            }

            return employees
        })
    }

    getRoles();
    getEmployees();
    

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee_list',
                message: 'Select an employee',
                choices: employees
            },
            {
                type: 'list',
                name: 'selected_employee',
                message: 'Select a new role for the employee',
                choices: roles
            }
        ]);
};







mainMenu()



