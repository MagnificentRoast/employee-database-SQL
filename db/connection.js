const util = require("util");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1Er@f!?xAqIii@b",
    database: "employees"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;