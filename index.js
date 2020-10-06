const inquirer = require("inquirer");
var mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const cTable = require("console.table");

const OUTPUT_DIR = path.resolve(__dirname, "output");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bax&Nel2020",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err)
        throw err;

    console.log("connected as id " + connection.threadId);

    updateEmployeeDB();
});

const updateEmployeeDB = () => {

    //Prompts used to build the database:

    //Inquirer Prompt #1 THIS IS THE INITIAL QUESTION FOR THE APP TO RUN.

    inquirer.prompt([
        {
            name: "menuChoice",
            message: "What would you like to do?",
            type: "list",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add New Department", "Add New Role", "Add New Employee", "Update Employee Role", "Exit"]
        }

    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "View All Employees":
                displayAllEmployees();
                break;
            case "View All Departments":
                displayAllDepartments();
                break;
            case "View All Roles":
                displayAllRoles();
                break;
            case "Add New Department":
                addNewDepartment();
                break;
            case "Add New Role":
                addNewRole();
                break;
            case "Add New Employee":
                addNewEmployees();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            default:
                connection.end();
        }
    });

};
//DISPLAY ALL EMPLOYEES CHART ON SCREEN. USE CONSOLE.TABLE HERE

// const displayAllEmployees = () => {

//     console.table({

//     })
// };

// //DISPLAY ALL DEPARTMENTS CHART ON SCREEN. USE CONSOLE.TABLE HERE

// const displayAllDepartments = () => {

//     console.table({

//     })
// };

// //DISPLAY ALL ROLES CHART ON THE SCREEN. USE CONSOLE.TABLE HERE

// const displayAllRoles = () => {

//     console.table({


//     })

// };
// //ADD NEW DEPARTMENT.

// const addNewDepartment = () => {


// };


// //ADD NEW ROLE.

// const addNewRole = () => {


// };

// //ADD A NEW EMPLOYEE.

// const addNewEmployees = () => {

//     //TO QUERY FOR THE EMPLOYEE ROLES
//     connection.query(`SELECT title, id FROM roles`, function (err, data) {
//         if (err)
//             throw err;
//         if (data.length > 0) {

//             const employeeRoles = data.map(item => item = item.title);
//         } else {
//             console.log('Sorry, you need to add a new role before adding an employee.');
//             return;
//         }

//         //TO QUERY FOR THE MANAGERS - find a way to get all the managers from the employees list.
//         connection.query(`SELECT * FROM employees`, function (err, data) {
//             if (err)
//                 throw err;

//             const employees = data.map(item => item = item.name);
//             employees.push("none");

//             inquirer.prompt([
//                 {
//                     name: "first_name",
//                     message: "What is the new employee's first name?",
//                     type: "input"
//                 },

//                 {
//                     name: "last_name",
//                     message: "What is the new employee's last name?",
//                     type: "input"
//                 },

//                 {
//                     name: "role",
//                     message: "What is the new employee's role?",
//                     type: "list",
//                     choices: employeeRoles
//                 },

//                 {
//                     name: "manager_name",
//                     message: "Who will be this employee's manager?",
//                     type: "list",
//                     choices: managerNames
//                 }

//             ]).then(postAnswers => {
//             connection.query("INSERT INTO employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
//                 if (err)
//                     throw err;
//                 console.log("new employee has successfully been added.");
//                 console.log(postAnswers);

//                 updateEmployeeDB();
//             };
//         });
//     };
// }

// //UPDATE AN EMPLOYEE'S ROLE.

// const updateEmployeeRole = () => {
//         connection.query("SELECT * FROM employees", function (err, employeeData) {
//             if (err)
//                 throw err;

//             // console.log(productData);

//             if (employeeData.length > 0) {

//                 const employeeNames = employeeData.map(item => item.name);

//                 inquirer.prompt([
//                     {
//                         name: "name",
//                         message: "Which employee do you wish to update?",
//                         type: "choice",
//                         choices: employeeNames,
//                         default: "none"
//                     },

//                     {   //THIS IS THE SAME PROMPT AS WHEN ADDING A NEW EMPLOYEE.
//                         name: "role",
//                         message: "What is the new employee's role?",
//                         type: "choice",
//                         choices: employeeRoles,
//                         default: "none"
//                     }
//                     //AT THIS POINT WE WANT TO SEND THE NEW INFORMATION TO THE DB TO UPDATE THIS EMPLOYEE'S ROLE IN THE EMPLOYEES TABLE.
//                 ]).then(postAnswers => {
//                     connection.query("UPDATE employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
//                         if (err)
//                             throw err;
//                         console.log("This employee's role  has successfully been updated.");
//                         console.log(postAnswers);

//                         updateEmployeeDB();
//                     });
//                 });
//             };
