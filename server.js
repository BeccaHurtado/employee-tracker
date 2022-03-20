const express = require('express');
const inquirer = require('inquirer')
const mysql = require('mysql2');
const PORT = process.env.PORT || 6000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'becca123',
        database: 'employee',
    },
    console.log('Connected to database')
)

// functions that prompts user with options
function init () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to view?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit']
        }
    ]).then(function(response) {
        switch(response.type) {
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
 app.get('/api/department', (req, res) => {
     const sql = `SELECT * FROM department`;

     db.query(sql, (err, rows) => {
         if (err) {
             res.status(500).json({ error: err.message });
             return;
         }
         res.json({
             message: 'success',
             data: rows
         });
     });
 });
 init();
}

function viewRoles() {

}

function viewEmployees() {

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

init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
