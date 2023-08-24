const connection = require('../db');

class Person {
    static getAll(callback) {
        connection.query('SELECT * FROM people', callback);
    }

    static create(newPerson, callback) {
        connection.query('INSERT INTO people SET ?', newPerson, callback);
    }

    static getById(id, callback) {
        connection.query('SELECT * FROM people WHERE id = ?', [id], callback);
    }

    static update(id, updatedPerson, callback) {
        connection.query('UPDATE people SET ? WHERE id = ?', [updatedPerson, id], callback);
    }

    static delete(id, callback) {
        connection.query('DELETE FROM people WHERE id = ?', [id], callback);
    }
}

module.exports = Person;
