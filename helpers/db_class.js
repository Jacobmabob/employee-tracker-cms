const db = require('mysql2-promise')();
const table = require('console.table');

db.configure (
  {
    host: 'localhost',
    user: 'root',
    password: 'mozambiquehere333!',
    database: 'employeecms_db'
  },
  console.log(`Connected to the Employee CMS database.`)
);



class Database  {
  constructor(){
    this.departments = []
  }

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

  insertRole(answers) {
    const {role_title, role_salary, new_role_department} = answers;
    console.log('Im here')

    return db.query(`SELECT id FROM departments WHERE department_name =  "${new_role_department}"  `, (err, results) => {
    err ? console.log(err) : console.log(results[0].id)});

    
    // console.log(role_title)
    // console.log(role_salary)
    // console.log(new_role_department)

  }

  refreshCurrentDepartments(){
      return db.query('SELECT department_name FROM departments', (err, result) => {
      if(err) {
        throw err
      }
      for (let i = 0; i < result.length; i++){
        this.departments.push(result[i].department_name)
      }
    })
  }


}

const database = new Database



module.exports = database