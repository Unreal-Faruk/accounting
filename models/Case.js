const db = require('../db'); // Assuming you have a db.js for database connection

class Case {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.subject = data.subject;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.hourRate = data.hourRate;
        this.personId = data.personId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            subject: this.subject,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            hourRate: this.hourRate,
            personId: this.personId
        };
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM Cases');
            return rows.map(row => new Case(row));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM Cases WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null; // Return null if case is not found
            }
            return new Case(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const result = await db.promise().query('INSERT INTO Cases SET ?', [data]);
            return result[0].insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const result = await db.promise().query('UPDATE Cases SET ? WHERE id = ?', [data, id]);
            return result[0].affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await db.promise().query('DELETE FROM Cases WHERE id = ?', [id]);
            return result[0].affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Case;
