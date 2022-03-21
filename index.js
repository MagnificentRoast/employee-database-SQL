const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
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
            choices: [
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

async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt ([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's manager would you like to update?",
            choices: employeeChoices
        }
    ]);
    console.log("MANAGERS");
    const managers = await db.findAllPossibleManagers(employeeId);
    console.log(managers);
    const managerChoices = managers.map((id, first_name, last_name) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { managerId } = await prompt ([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to assign a manager?",
            choices: managerChoices
        }
    ]);

    await db.updateEmployeeManager(employeeId, managerId);

    loadMainPrompts();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log();
    console.table(roles);

    loadMainPrompts();
}

async function addRole() {
    console.log("DEPARTMENTS")
    const departments = await db.findAllDepartments();
    console.log(departments);
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await prompt ([
        {
            name: "title",
            message: "What is your role?"
        },
        {
            name: "salary",
            message: "What is your salary?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department are you in?",
            choices: departmentChoices
        }
    ]);

    await db.createRole(role);

    loadMainPrompts();
}

async function removeRole() {
    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt ([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to remove? (THIS IS PERMANENT)",
            choices: roleChoices
        }
    ]);

    await db.removeRole(roleId);

    loadMainPrompts();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.table(departments);

    loadMainPrompts();
}

async function addDepartments() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ]);

    await db.createDepartment(department);

    loadMainPrompts();
}

async function removeDepartment() {
    const department = await db.findAllDepartments();

    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const {departmentId} = await prompt ({
        type: "list",
        name: "departmentId",
        message: "Which department would you like to remove? This will remove associated roles and employees!",
        choices: departmentChoices
    })

    await db.removeDepartment(departmentId);

    loadMainPrompts();
}

async function addEmployees() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt ([
        {
            name: "first_name",
            message: "What is your employee's first name?"
        },
        {
            name: "last_name",
            message: "What is your employee's last name?"
        },
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const roleId = await prompt ({
        type: "list",
        name: "roleId",
        message: "What is your employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null});

    const { managerId } = await prompt ({
        type: "list",
        name: "mangerId",
        message: "What is your employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    loadMainPrompts();
}

function quit(){
    console.log("bye")
    process.exit();
}