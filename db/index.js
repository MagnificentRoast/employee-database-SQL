const { query } = require("express");
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    findAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    };

    findAllPossibleManagers() {
        return this.connection.query("SELECT id, first_name, last_name FROM employee WHERE id = ?", employeeId);
    };

    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    removeEmployee(employeeId) {
        return this.connection.query(
        "DELETE FROM employee WHERE id = ?", 
        employeeId
        );
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    findAllRoles() {
        return this.connection.query(
            "SELECT * FROM role"
            );
    }

    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department"
        );
    }

    createDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }

    removeDepartment(departmentId) {
        return this.connection.query(
            "DELETE FROM department WHERE id = ?",
            departmentId
            );
    }
}

module.exports = new DB(connection);