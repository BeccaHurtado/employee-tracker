
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
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Insert Employee Name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Insert Employee Last Name'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Choose Employee Role Id',
            choices: [1, 2, 3, 4, 5, 6]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Choose Employee Manager Id',
            choices: [1, 2, 3]
        },
    ]).then(function(response) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)`;

        const employee_values = [response.first_name, response.last_name, response.role_id, response.manager_id]

        db.query(sql, employee_values, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.table(rows)
            init()
        });
    })
}

function updateEmployee() {

}

function exitApp() {

}


