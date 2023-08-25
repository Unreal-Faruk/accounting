const db = require('../db'); // Assuming you have a db.js for database connection

class Task {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.subject = data.subject;
        this.description = data.description;
        this.clientFirstName = data.clientFirstName;
        this.clientLastName = data.clientLastName;
        this.clientEmail = data.clientEmail;
        this.clientAddress = data.clientAddress;
        this.createdTime = data.createdTime;
        this.updatedTime = data.updatedTime;
        this.hourRate = data.hourRate;
        this.isArchived = data.isArchived;
        this.userId = data.userId;
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM task');
            return rows.map(row => new Task(row));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM task WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new Task(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(newTask) {
        try {
            const [result] = await db.promise().query('INSERT INTO task SET ?', newTask);
            const createdTaskId = result.insertId;
            return createdTaskId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updatedTask) {
        try {
            await db.promise().query('UPDATE task SET ? WHERE id = ?', [updatedTask, id]);
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM task WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Task;
