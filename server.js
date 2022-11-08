
const inquirer = require('inquirer')
const mysql = require('mysql2');
const cTable = require('console.table');

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
            choices: [
            'View all Departments',
            'View all Roles', 
            'View all Employees', 
            'Add a Department', 
            'Add a Role', 
            'Add an Employee', 
            'Update Employee Role',
            'Delete A Department', 
            'Delete a Role', 
            'Exit']
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
            case "Delete A Department":
                deleteDepartment()
                break;
            case "Delete a Role":
                deleteRoles()
                break;
            case "Exit":
                db.end()
                break;
        }
    })
    .catch((err) => console.log(err))
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
    inquirer.prompt([
        {
            type: 'input',
            name: 'dep_name',
            message: 'Insert Name of New Department'
        }
    ]).then(function(response) {
        const sql = `INSERT INTO department (dep_name) VALUES (?)`;

        const employee_values = [response.dep_name]

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

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'Insert Name of New Role'
        },
        {
            type: 'input',
            name: 'role_salary',
            message: "Insert the Role's Salary"
        },
        {
            type: 'list',
            name: 'role_dep_id',
            message: 'Insert Department Id',
            choices: [1, 2, 3, 4, 5, 6, 7]
        }
    ]).then(function(response) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ( ?, ?, ?)`;

        const employee_values = [response.role_title, response.role_salary, response.role_dep_id]

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
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Choose employee id',
            choices: [1, 2, 3, 4, 5, 6, 7]
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Choose new Role Id',
            choices: [1, 2, 3, 4, 5, 6]
        },
    ]).then(function(response) {
        const sql = `update employee set role_id=? where id=? ;`;

        const employee_values = [response.role_id, response.id]

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

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'del_dep',
            message: 'Which Department Would You Like to Delete?',
            choices: [1, 2, 3, 4]
        }
    ]).then(function(response) {
        const sql = 'DELETE FROM department WHERE id = ?';

        const employee_values = [response.del_dep]

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

function deleteRoles() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'del_role',
            message: 'Which Role Would You Like to Delete?',
            choices: [1, 2, 3, 4, 5, 6, 7]
        }
    ]).then(function(response) {
        const sql = 'DELETE FROM roles WHERE id = ?';

        const employee_values = [response.del_role]

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

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'del_employee',
            message: 'Which Employee Would You Like to Delete?',
            choices: [1, 2, 3, 4, 5, 6, 7]
        }
    ]).then(function(response) {
        const sql = 'DELETE FROM employee WHERE id = ?';

        const employee_values = [response.del_employee]

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


