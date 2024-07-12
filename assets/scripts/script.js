// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  const employees = []; // Array to hold all added employees

  let doneAddingEmployees = false;

  while (doneAddingEmployees == false){
    const employee = {}; // Individual object to hold employee data
  
    // Get employee data via browser prompt
    employee['firstName'] = prompt('Enter First Name');
    employee['lastName'] = prompt('Enter Last Name');

    const salaryPrompt = Number(prompt('Enter salary'));
    employee['salary'] = isNaN(salaryPrompt) ? 0 : salaryPrompt; // Convert text prompt answer to number for later calculation

    // Add new data to array
    employees.push(employee);

    // Check to see if new data should be presented
    doneAddingEmployees = !confirm("Do you want to add another employee?");
  }

  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {

  let sum = 0;
  const count = employeesArray.length;

  // Collect sum from each employee salary
  for(const employee of employeesArray){
    sum += employee.salary;
  }

  const averageSalary = (sum / count).toFixed(2); // Use .toFixed(2) to get average rounded to second decimal

  // Log results
  console.log(`The average employee salary between our ${count} employees is $${averageSalary}`);
}


// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // Get random index among those available in passed array by multiplying Math.random by number in array, then rounding
  const randomEmployeeIndex = Math.floor(Math.random() * employeesArray.length);
  // Select employee from array with generated index
  const chosenEmployee = employeesArray[randomEmployeeIndex]
  // Display first and last name of selected employee
  console.log(`Congratulations to ${chosenEmployee.firstName} ${chosenEmployee.lastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
