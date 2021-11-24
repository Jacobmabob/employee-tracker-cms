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
    db.query('SELECT * FROM departments', function (err, results) {
      console.table(results);
    })
    
  }

  viewRoles(){

    const sql = ` SELECT roles.role_id, 
                  roles.title,
                  roles.salary,
                  departments.department_name
                  FROM roles
                  INNER JOIN departments
                  ON roles.department_id = departments.id
                `
    db.query(sql, function (err, results) {
      console.table(results);
    });
  }

  viewEmployees(){
    
    const sql = `SELECT employees.employee_id, 
                        employees.first_name,
                        employees.last_name,
                        roles.title,
                        departments.department_name,
                        roles.salary
                 FROM employees
                 INNER JOIN roles on employees.role_id = roles.role_id
                 INNER JOIN departments ON departments.id = roles.department_id

                `

    return db.query(sql, function (err, results) {
      err ? console.log(err) : console.table(results);
    });
  }

  addDepartment(name){
    db.query('INSERT INTO departments (department_name) VALUES (?)', name, (err, result) => {
      err ? console.log(err) : console.log(`Department Added Successfully`)
    })
  }

  insertRole(answers) {
    const {role_title, role_salary, new_role_department} = answers;
    console.log('Im here')

    return db.query(`SELECT id FROM departments WHERE department_name =  "${new_role_department}"  `, (err, results) => {
    err ? console.log(err) : console.log(results[0].id)});

    

  }

   async refreshCurrentDepartments(){

      db.query('SELECT department_name FROM departments', (err, result) => {
        const departments = []
        if(err) {
        throw err
      } else {

      for (let i = 0; i < result.length; i++){
        departments.push(result[i].department_name)
      }
      console.log(departments)
    }
    
    })
    
  }


}

const database = new Database



module.exports = database