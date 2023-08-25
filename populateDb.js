const mysql = require('mysql2/promise');

// Replace with your actual database connection details
const dbConfig = {
    host: 'sql7.freesqldatabase.com',
    user: 'sql7642158',
    password: 'RLlWZEfliB',
    database: 'sql7642158'
};

const seedData = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Drop existing tables if they exist
        await connection.query('DROP TABLE IF EXISTS Cases');
        await connection.query('DROP TABLE IF EXISTS person');
        await connection.query('DROP TABLE IF EXISTS persons');
        await connection.query('DROP TABLE IF EXISTS activities');

        // Create tables if they don't exist
        await connection.query(`
 CREATE TABLE IF NOT EXISTS person (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     surname VARCHAR(255) NOT NULL
 )
`);

        await connection.query(`
 CREATE TABLE IF NOT EXISTS Cases (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     subject VARCHAR(255) NOT NULL,
     description TEXT,
     hourRate DECIMAL(10, 2) NOT NULL,
     personId INT,
     FOREIGN KEY (personId) REFERENCES person(id) ON DELETE CASCADE
 )
`);

        await connection.query(`
 CREATE TABLE IF NOT EXISTS activity (
     id INT AUTO_INCREMENT PRIMARY KEY,
     date DATE NOT NULL,
     description TEXT,
     minutes INT NOT NULL,
     caseId INT,
     FOREIGN KEY (caseId) REFERENCES Cases(id) ON DELETE CASCADE
 )
`);


        // Insert 2 Persons
        await connection.query('INSERT INTO person (name, surname) VALUES (?, ?)', ['John', 'Doe']);
        await connection.query('INSERT INTO person (name, surname) VALUES (?, ?)', ['Jane', 'Smith']);

        // Get the IDs of the inserted Persons
        const [johnId, janeId] = await connection.query('SELECT id FROM person');

        // Insert 2 Cases for each Person
        await connection.query('INSERT INTO Cases (name, subject, description, hourRate, personId) VALUES (?, ?, ?, ?, ?)', ['Case 1', 'Subject 1', 'Description 1', 50, johnId[0].id]);
        await connection.query('INSERT INTO Cases (name, subject, description, hourRate, personId) VALUES (?, ?, ?, ?, ?)', ['Case 2', 'Subject 2', 'Description 2', 75, johnId[0].id]);
        await connection.query('INSERT INTO Cases (name, subject, description, hourRate, personId) VALUES (?, ?, ?, ?, ?)', ['Case 3', 'Subject 3', 'Description 3', 60, janeId[0].id]);
        await connection.query('INSERT INTO Cases (name, subject, description, hourRate, personId) VALUES (?, ?, ?, ?, ?)', ['Case 4', 'Subject 4', 'Description 4', 90, janeId[0].id]);

        // Get the IDs of the inserted Cases
        const [caseIds] = await connection.query('SELECT id FROM Cases');

        // Insert 2 Activities for each Case
        for (const caseId of caseIds) {
            await connection.query('INSERT INTO activity (date, description, minutes, caseId) VALUES (?, ?, ?, ?)', ['2023-08-01', 'Activity 1', 60, caseId.id]);
            await connection.query('INSERT INTO activity (date, description, minutes, caseId) VALUES (?, ?, ?, ?)', ['2023-08-02', 'Activity 2', 90, caseId.id]);
        }

        console.log('Database populated successfully');
        connection.end();
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

seedData();
