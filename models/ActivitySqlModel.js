const db = require('../db'); // Assuming you have a db.js for database connection

class Activity {
    constructor(data) {
        this.id = data.id;
        this.date = data.date;
        this.description = data.description;
        this.minutes = data.minutes;
        this.taskId = data.taskId;
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM activity');
            return rows.map(row => new Activity(row));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM activity WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null; // Return null if activity is not found
            }
            return new Activity(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.promise().query('INSERT INTO activity SET ?', [data]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            await db.promise().query('UPDATE activity SET ? WHERE id = ?', [data, id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM activity WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Activity;
