const db = require('../db'); // Assuming you have a db.js for database connection

class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.createTime = data.createTime;
    }

    static async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM user');
            return rows.map(row => new User(row));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM user WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new User(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(newUser) {
        try {
            const [result] = await db.promise().query('INSERT INTO user SET ?', newUser);
            const createdUserId = result.insertId;
            return createdUserId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updatedUser) {
        try {
            await db.promise().query('UPDATE user SET ? WHERE id = ?', [updatedUser, id]);
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM user WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
