
const inquirer = require('inquirer')
const mysql = require('mysql2');
require('console.table')
// Connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'becca123',
        database: 'employee_tracker',
    })

db.connect(function (err) {
    console.log('Connected to database')
    init()
})


// functions that prompts user with options
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to view?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit']
        }
    ]).then(function (response) {
        switch (response.menu) {
            case "View all Departments":
                viewDepartments()
                break;
            case "View all Roles":
                viewRoles()
                break;
            case "View all Employees":
                viewEmployees()
                break;
            case "Add a Department":
                addDepartment()
                break;
            case "Add a Role":
                addRole()
                break;
            case "Add an Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployee()
                break;
            case "Exit":
                exitApp()
                break;
        }
    })
}

function viewDepartments() {
    
        const sql = `SELECT * FROM department`;

        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.table(rows)
            init()
        });
}

function viewRoles() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        init()
    });
}

function viewEmployees() {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        init()
    });
}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

}

function exitApp() {

}


