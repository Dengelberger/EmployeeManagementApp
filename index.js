const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");

var employees = [];
//Prompts used to build the database:

//Inquirer Prompt #1 THIS IS THE INITIAL QUESTION FOR THE APP TO RUN.

inquirer.prompt([
    {
        name: "type",
        message: "What would you like to do?",
        type: "choice",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add New Employee", "Delete Employee", "Update Employee Role", "Update Employee Manager"]
    }
]),
//CHOICES [0], [1], AND [2] FROM THE CHOICES ARRAY IN THE FIRST PROMPT DO NOT LEAD TO MORE PROMPTS, BUT DISPLAY ON SCREEN THE RESULTS.

//IF CHOICE [0], DISPLAY ALL EMPLOYEES CHART ON SCREEN.

//IF CHOICE [1], DISPLAY ALL EMPLOYEES SORTED BY DEPARTMENT ON SCREEN.

//IF CHOICE [2], DISPLAY ALL EMPLOYEES SORTED BY MANAGER ON THE SCREEN.

//IF CHOICE [3] Inquirer Prompt #2 THIS IS TO ADD A NEW EMPLOYEE.
    
addNewEmployees();
    function addNewEmployees() {
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
            type: "choice",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"] //IF THE USER CHOICE IS ITEM [0] OR ITEM [2] OR ITEM [5] OR ITEM [6], THEN THERE SHOULD BE NO CHOICE FOR MANAGER. ALSO, ONE OF THESE FOUR CHOICES SHOULD PUT THIS EMPLOYEE IN A MANAGER CLASS.
        },

        //THIS QUESTION SHOULD ONLY COME UP IF ITEM [1], [3], OR [4] IS CHOSEN, ABOVE.
        {
            name: "manager",
            message: "Who is the new employee's manager?",
            type: "choice",
            choices: []  //these will be provided from the existing list of managers, plus a choice of none.
        }
    ]) //AT THIS POINT WE WANT TO SEND THE INFORMATION TO THE DB AND POPULATE THE EMPLOYEES TABLE.
};

//IF CHOICE [4] Inquirer Prompt #3 THIS IS TO REMOVE AN EXISTING EMPLOYEE.
deleteEmployee();
    function deleteEmployee() {
    inquirer.prompt([
    {
        name: "name",
        message: "Which employee do you wish to delete?",
        type: "choice",
        choices: [] //this will be populated with the entire list of current employees.
    }
]) //AT THIS POINT WE WANT TO SEND THE INFORMATION TO THE DB TO UPDATE THE EMPLOYEES TABLE TO EXCLUDE THIS EMPLOYEE.
    };

//IF CHOICE [5] Inquirer Prompt #4  THIS PROMPT IS TO UPDATE AN EMPLOYEE'S ROLE.

updateEmployeeRole();
    function updateEmployeeRole() {
    inquirer.prompt([
    {
        name: "name",
        message: "Which employee do you wish to update?",
        type: "choice",
        choices: [] //this will be populated with the entire list of current employees.
    },
    {   //THIS IS THE SAME PROMPT AS WHEN ADDING A NEW EMPLOYEE.
        name: "role",
        message: "What is the new employee's role?",
        type: "choice",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"] //IF THE USER CHOICE IS ITEM [0] OR ITEM [2] OR ITEM [5] OR ITEM [6], THEN THERE SHOULD BE NO CHOICE FOR MANAGER. ALSO, ONE OF THESE FOUR CHOICES SHOULD PUT THIS EMPLOYEE IN A MANAGER CLASS.
    }
])//AT THIS POINT WE WANT TO SEND THE NEW INFORMATION TO THE DB TO UPDATE THIS EMPLOYEE'S ROLE IN THE EMPLOYEES TABLE.
    };

//IF CHOICE [6] Inquirer Prompt #5  THIS PROMPT IS TO UPDATE AN EMPLOYEE'S MANAGER.

updateEmployeeManager();
    function updateEmployeeManager() {
    inquirer.prompt([
        {   //THIS IS THE SAME PROMPT AS WHEN UPDATING AN EMPLOYEE'S ROLE.
            name: "name",
            message: "Which employee do you wish to update?",
            type: "choice",
            choices: [] //this will be populated with the entire list of current employees.
        },

        {   //THIS IS THE SAME PROMPT AS WEHN ADDING A NEW EMPLOYEE.
            name: "manager",
            message: "Who is the new employee's manager?",
            type: "choice",
            choices: []  //these will be provided from the existing list of managers, plus a choice of none.
        }
        
    ])//AT THIS POINT WE WANT TO SEND THE NEW INFORMATION TO THE DB TO UPDATE THIS EMPLOYEE'S MANAGER IN THE EMPLOYEES TABLE.
};    

//THIS IS THE END OF THE PROMPTS.
