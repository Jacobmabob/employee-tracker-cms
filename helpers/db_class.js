const mysql = require('mysql2');
const table = require('console.table');

const db = mysql.createConnection (
  {
    host: 'localhost',
    user: 'root',
    password: 'mozambiquehere333!',
    database: 'employeecms_db'
  },
  console.log(`Connected to the Employee CMS database.`)
);



class Database  {
  constructor(){}

  viewDepartments(){
    return db.query('SELECT * FROM departments', function (err, results) {
      console.table(results);
    });

  }

  viewRoles(){
    return db.query('SELECT * FROM roles', function (err, results) {
      console.table(results);
    });
  }

  viewEmployees(){
    return db.query('SELECT * FROM employees', function (err, results) {
      console.table(results);
    });
  }

  addDepartment(name){
    return db.query('INSERT INTO departments (department_name) VALUES (?)', name, (err, result) => {
      err ? console.log(err) : console.log(`Success!`)
    })
  }


}

const database = new Database



module.exports = database