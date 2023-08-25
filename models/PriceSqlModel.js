const db = require('../db'); // Assuming you have a db.js for database connection

class Price {
    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.price = data.price;
        this.taskId = data.taskId;
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM price');
            return rows.map(row => new Price(row));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM price WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null; // Return null if price is not found
            }
            return new Price(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const [result] = await db.promise().query('INSERT INTO price SET ?', [data]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            await db.promise().query('UPDATE price SET ? WHERE id = ?', [data, id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM price WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Price;
