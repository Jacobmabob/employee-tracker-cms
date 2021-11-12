const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const jest = require('jest');

const table = require('console.table');

const db = mysql.createConnection(
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
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Quit'
            ]
        }])
        .then((answers) => console.log(answers.next))
        
}

function viewDepts(){

}

mainMenu()