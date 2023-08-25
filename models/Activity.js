const db = require('../db'); // Assuming you have a db.js for database connection

class Activity {
    static getAll() {
        return db.promise().query('SELECT * FROM activity');
    }

    static getById(id) {
        return db.promise().query('SELECT * FROM activity WHERE id = ?', [id]);
    }

    static create(data) {
        return db.promise().query('INSERT INTO activity SET ?', [data]);
    }

    static update(id, data) {
        return db.promise().query('UPDATE activity SET ? WHERE id = ?', [data, id]);
    }

    static delete(id) {
        return db.promise().query('DELETE FROM activity WHERE id = ?', [id]);
    }
}

module.exports = Activity;
