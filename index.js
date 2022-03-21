const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { init } = require("express/lib/application");
require("console.table");

init();

function init() {
    const logoText = logo({
        name: "Employee Management"}).render();

        console.log(logoText)

        loadMainPrompts();
}

async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choises: [
                {
                    type: "input",
                    name: "View all Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    type: "input",
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    type: "input",
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    type: "input",
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    type: "input",
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    type: "imput",
                    name: "View all roles",
                    value: "VIEW_ROLES"
                },
                {
                    type: "input",
                    name: "Add new role",
                    value: "ADD_ROLE"
                },
                {
                    type: "input",
                    name: "Remove existing role",
                    value: "REMOVE_ROLES"
                },
                {
                    type: "input",
                    name: "View all departments",
                    value: "VIEW_DEPARTMENT"
                },
                {
                    type: "input",
                    name: "Add new department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    type: "input",
                    name: "Delete existing department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "End session?",
                    value: "quit"
                },
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployee();
        case "ADD_EMPLOYEE":
            return addEmployees();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        case "VIEW_DEPARTMENT":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartments();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLES":
            return removeRole();
        default:
            return quit();
    }
}

async function viewEmployee() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.log(employees);

    loadMainPrompts();
}

async function removeEmployee() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee do you want to remove?",
            choices: employeeChoices
        }
    ]);

    await db.removeEmployee(employeeId);

loadMainPrompts();
}

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const {employeeId} = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee role do you want to modify?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign to the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    loadMainPrompts();
}

updateEmployeeManager

viewRoles

removeRole

viewDepartments

addDepartments

removeDepartment

addEmployees

function quit(){
    console.log("bye")
}