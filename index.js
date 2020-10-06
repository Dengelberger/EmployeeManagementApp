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
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add New Employee", "Delete Employee", "Update Employee Role", "Update Employee Manager", "Quit"]
        }

    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "View All Employees":
                displayAllEmployees();
                break;
            case "View All Employees by Department":
                displayEmployeesByDepartment();
                break;
            case "View All Employees by Manager":
                displayEmployeesByManager();
                break;
            case "Add New Employee":
                addNewEmployees();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            default:
                connection.end();
        }
    });

};
//IF CHOICE [0], DISPLAY ALL EMPLOYEES CHART ON SCREEN.

const displayAllEmployees = ()=> {
    
    console.table({

    })
};

//IF CHOICE [1], DISPLAY ALL EMPLOYEES SORTED BY DEPARTMENT ON SCREEN.

const displayEmployeesByDepartment = () => {

    console.table({

    })
};

//IF CHOICE [2], DISPLAY ALL EMPLOYEES SORTED BY MANAGER ON THE SCREEN.

const displayEmployeesByManager = () => {

    console.table({

        
    })

};

//IF CHOICE [3] Inquirer Prompt #2 THIS IS TO ADD A NEW EMPLOYEE.

var employeeRoles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"];

const addNewEmployees = () => {

    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the new employee's first name?",
            type: "input"
        },

        {
            name: "last_name",
            message: "What is the new employee's last name?",
            type: "input"
        },

        {
            name: "role",
            message: "What is the new employee's role?",
            type: "list",
            choices: employeeRoles,
            default: "none"
        }
    ])
}.then(addManager => {
    connection.query(`SELECT "Sales Lead", "Lead Engineer", "Accountant", "Legal Team Lead" FROM employees.role`, function (err, managerData) {
        if (err)
            throw err;
        if (managerData.length > 0) {

            const managerNames = managerData.map(item = item.name);

            inquirer.prompt([
                {
                    name: "manager_name",
                    message: "Who will be this employee's manager?",
                    type: "list",
                    choices: managerNames,
                    default: "none"
                }
        }
    }
    ]).then(postAnswers => {
        connection.query("INSERT INTO employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
            if (err)
                throw err;
            console.log("new employee has successfully been added.");
            console.log(postAnswers);

            updateEmployeeDB();
        });
    });
}

//IF CHOICE [4] Inquirer Prompt #3 THIS IS TO REMOVE AN EXISTING EMPLOYEE.

const deleteEmployee = () => {

    connection.query("SELECT * FROM employees", function (err, employeeData) {
        if (err)
            throw err;

        // console.log(productData);

        if (employeeData.length > 0) {

            const employeeNames = employeeData.map(item => item.name);

            inquirer.prompt([
                {
                    name: "nameToDelete",
                    message: "Which employee do you wish to delete?",
                    type: "choice",
                    choices: employeeNames,
                    default: "none"
                }
                //AT THIS POINT WE WANT TO SEND THE INFORMATION TO THE DB TO UPDATE THE EMPLOYEES TABLE TO EXCLUDE THIS EMPLOYEE.
            ]).then(postAnswers => {
                connection.query("DELETE FROM employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
                    if (err)
                        throw err;
                    console.log(`${nameToDelete} has been deleted.`);
                    console.log(postAnswers);

                    updateEmployeeDB();
                });
            });
        };
    });

    // IF CHOICE [5] Inquirer Prompt #4  THIS PROMPT IS TO UPDATE AN EMPLOYEE'S ROLE.

    const updateEmployeeRole = () => {
        connection.query("SELECT * FROM employees", function (err, employeeData) {
            if (err)
                throw err;

            // console.log(productData);

            if (employeeData.length > 0) {

                const employeeNames = employeeData.map(item => item.name);

                inquirer.prompt([
                    {
                        name: "name",
                        message: "Which employee do you wish to update?",
                        type: "choice",
                        choices: employeeNames,
                        default: "none"
                    },

                    {   //THIS IS THE SAME PROMPT AS WHEN ADDING A NEW EMPLOYEE.
                        name: "role",
                        message: "What is the new employee's role?",
                        type: "choice",
                        choices: employeeRoles,
                        default: "none"
                    }
                    //AT THIS POINT WE WANT TO SEND THE NEW INFORMATION TO THE DB TO UPDATE THIS EMPLOYEE'S ROLE IN THE EMPLOYEES TABLE.
                ]).then(postAnswers => {
                    connection.query("UPDATE employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
                        if (err)
                            throw err;
                        console.log("This employee's role  has successfully been updated.");
                        console.log(postAnswers);

                        updateEmployeeDB();
                    });
                });
            };

//IF CHOICE [6] Inquirer Prompt #5  THIS PROMPT IS TO UPDATE AN EMPLOYEE'S MANAGER.

const updateEmployeeManager = () => {
    connection.query("SELECT * FROM employees", function (err, employeeData) {
        if (err)
            throw err;
        if (employeeData.length > 0) {

            const employeeNames = employeeData.map(item => item.name);

            inquirer.prompt([
                {
                    name: "name",
                    message: "Which employee do you wish to update?",
                    type: "choice",
                    choices: employeeNames,
                    default: "none"
                },

                {
                    name: "manager",
                    message: "Who is the new employee's manager?",
                    type: "choice",
                    choices: managerNames,
                    default: "none"
                }

            ]).then(postAnswers => {
                connection.query("UPDATE employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
                    if (err)
                        throw err;
                    console.log("This employee's role  has successfully been updated.");
                    console.log(postAnswers);

                    updateEmployeeDB();
                });
            });
        };

