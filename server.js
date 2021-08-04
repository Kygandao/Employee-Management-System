const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const { mainMenu } = require('./utils/mainMenu');

const PORT = process.env.PORT || 3007;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to the Company Database.')
);

//to envoke function in other file, 
mainMenu();