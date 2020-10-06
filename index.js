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

const addNewDepartment = () => {

    inquirer.prompt([
        {
            name: "departmentName",
            message: "What is the name of the department you want to create?",
            type: "input"
        }
    ]).then(postAnswers => {
        connection.query("INSERT INTO departments(name) VALUES(?)", [postAnswers.departmentName], function (err, postAnswers) {
            if (err)
                throw err;
            console.log("new department has successfully been added.");
            console.log(postAnswers);

            updateEmployeeDB();
        });
    });
};
//ADD NEW ROLE.

const addNewRole = () => {

    //TO QUERY FOR THE DEPARTMENTS 
    connection.query(`SELECT id, name FROM departments`, function (err, data) {
        if (err)
            throw err;
        let objects = [];
        let departArray = [];
        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {

                objects[i] = { id: parseInt(data[i].id), name: data[i].name }
                departArray.push(objects[i]);
            }
        } else {
            console.log('Sorry, you need to add a new role before adding an employee.');
            updateEmployeeDB();
        }

        inquirer.prompt([
            {
                name: "deptName",
                message: "What is the name of the department for your new role?",
                type: "list",
                choices: departArray
            },
            {
                name: "roleName",
                message: "What is the name of the role you want to create?",
                type: "input"
            },
            {
                name: "salary",
                message: "What is the salary amount for this role?",
                type: "input"
            }

        ]).then(postAnswers => {
            let departID = "";
            for (i = 0; i < departArray.length; i++) {
                if (postAnswers.deptName == departArray[i].name) {
                    departID = departArray[i].id;
                }
            }
            connection.query("INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)", [postAnswers.roleName, postAnswers.salary, departID], function (err, postData) {
                if (err)
                    throw err;
                console.log("new role has successfully been added.");
                console.log(postAnswers);

                updateEmployeeDB();
            });

        });
    })
};
//WE ARE GOOD UP TO THIS POINT!!!!  IF I CAN GET THIS PART, I WILL HAVE IT!

//ADD A NEW EMPLOYEE.
const addNewEmployees = () => {

    //TO QUERY FOR THE DEPARTMENTS 
    connection.query(`SELECT id, name FROM departments`, function (err, data) {
        if (err)
            throw err;
        let objects = [];
        let departArray = [];
        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {

                objects[i] = { id: parseInt(data[i].id), name: data[i].name }
                departArray.push(objects[i]);
            }
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
                    name: "dept",
                    message: "What is the new employee's department?",
                    type: "list",
                    choices: departArray
                }

            ]).then, function addDeptRole() {

                //TO QUERY FOR THE EMPLOYEE ROLES

                connection.query(`SELECT title, id FROM roles`, function (err, data) {
                    if (err)
                        throw err;
                    let employeeRoles;
                    if (data.length > 0) {
                        employeeRoles = data.map(item => item = item.title);
                    } else {
                        console.log('Sorry, you need to add a new role before adding an employee.');
                        updateEmployeeDB();
                    };
                    inquirer.prompt([
                        {
                            name: "role",
                            message: "What is the new employee's role?",
                            type: "list",
                            choices: employeeRoles
                        }
                    ]).then, function addMgrName() {
                         //TO QUERY FOR THE MANAGERS   
                        connection.query(`SELECT first_name, last_name, id FROM employees WHERE department_id = dept`, function (err, data) {
                            if (err)
                                throw err;

                            const managerNames = data.map(item => newObj = {
                                name: item.first_name + " " + item.last_name,
                                value: item.id
                            });
                            managerNames.push("none");
                            inquirer.prompt([
                                {
                                    name: "manager_name",
                                    message: "Who will be this employee's manager?",
                                    type: "list",
                                    choices: managerNames
                                }

                            ]).then(postAnswers => {
                                connection.query("INSERT INTO employees(first_name, last_name, role) VALUES(?, ?, ?)", [postAnswers.first_name, postAnswers.last_name, postAnswers.role], function (err, postData) {
                                    if (err)
                                        throw err;
                                    console.log("new employee has successfully been added.");
                                    console.log(postAnswers);

                                    updateEmployeeDB();
                                }
                                )
                            })

                        });
                    }
                
                })
            }
         }
     })
    }
