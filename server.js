const express = require('express');
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
        database: 'employee'
    },
    console.log('Connected to database')
)