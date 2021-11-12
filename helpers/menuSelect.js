function menuSelect(answers) {
  const nextStep = answers.next;

  switch (nextStep) {
    case 'View all departments':
      viewDepartments()
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
}