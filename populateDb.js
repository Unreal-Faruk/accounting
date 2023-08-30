const mysql = require('mysql2/promise');
require('dotenv').config();

// Replace with your actual database connection details
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 1 // Adjust this value as needed
};

const seedData = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Drop existing tables if they exist
        await connection.query('DROP TABLE IF EXISTS price');
        await connection.query('DROP TABLE IF EXISTS activity');
        await connection.query('DROP TABLE IF EXISTS task');
        await connection.query('DROP TABLE IF EXISTS user');

        // Create tables if they don't exist
        await connection.query(`
 CREATE TABLE IF NOT EXISTS user (
     id INT AUTO_INCREMENT PRIMARY KEY,
     firstName VARCHAR(24) NOT NULL,
     lastName VARCHAR(24) NOT NULL,
     email VARCHAR(32) NOT NULL,
     password VARCHAR(255) NOT NULL,
     createTime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
 )
`);

        await connection.query(`
 CREATE TABLE IF NOT EXISTS task (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(24) NOT NULL,
     subject VARCHAR(24) NOT NULL,
     description VARCHAR(45) NULL,
     clientFirstName VARCHAR(16) NOT NULL,
     clientLastName VARCHAR(16) NOT NULL,
     clientEmail VARCHAR(32) NULL,
     clientAddress VARCHAR(32) NOT NULL,
     createdTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updatedTime TIMESTAMP NULL ,
     hourRate DECIMAL(10, 2) NOT NULL,
     isArchived INT NULL DEFAULT 0,
     invoice INT NULL DEFAULT 0,
     userId INT,
     FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION
 )
`);

        await connection.query(`
 CREATE TABLE IF NOT EXISTS activity (
     id INT AUTO_INCREMENT PRIMARY KEY,
     date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     description VARCHAR(255) NOT NULL,
     minutes INT NOT NULL,
     taskId INT,
     FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE ON UPDATE NO ACTION
 )
`);

        await connection.query(`
 CREATE TABLE IF NOT EXISTS price (
     id INT AUTO_INCREMENT PRIMARY KEY,
     description VARCHAR(255) NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     isPercentage INT NULL DEFAULT 0,
     taskId INT,
     FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE ON UPDATE NO ACTION
 )
`);

//         // Insert sample data
//         await connection.query(`
//  INSERT INTO user (firstName, lastName, email, password)
//  VALUES ('John', 'Doe', 'john@example.com', 'password123'),
//         ('Jane', 'Smith', 'jane@example.com', 'password456');
// `);

//         const [johnId, janeId] = await connection.query('SELECT id FROM user');

//         await connection.query(`
//  INSERT INTO task (title, subject, description, clientFirstName, clientLastName, clientEmail, clientAddress, hourRate, userId)
//  VALUES ('Task 1', 'Subject 1', 'Description 1', 'Client John', 'Doe', 'clientjohn@example.com', '123 Main St', 50, ?),
//         ('Task 2', 'Subject 2', 'Description 2', 'Client Jane', 'Smith', 'clientjane@example.com', '456 Elm St', 75, ?);
// `, [johnId[0].id, janeId[0].id]);

//         const [taskIds] = await connection.query('SELECT id FROM task');

//         for (const taskId of taskIds) {
//             await connection.query(`
//  INSERT INTO activity (date, description, minutes, taskId)
//  VALUES ('2023-08-01', 'Activity 1', 60, ?),
//         ('2023-08-02', 'Activity 2', 90, ?);
// `, [taskId.id, taskId.id]);

//             await connection.query(`
//  INSERT INTO price (description, price, taskId)
//  VALUES ('Price 1', 100, ?),
//         ('Price 2', 150, ?);
// `, [taskId.id, taskId.id]);
//         }

        console.log('Database populated successfully');
        connection.end();
    } catch (error) {
        console.error('Error populating database:', error);
    }
};

seedData();
