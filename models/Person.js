const db = require('../db'); 

class Person {
    static getAll() {
        return db.promise().query('SELECT * FROM person');
    }

    static create(newPerson) {
        return db.promise().query('INSERT INTO person SET ?', [newPerson]);
    }

    static getById(id) {
        return db.promise().query('SELECT * FROM person WHERE id = ?', [id]);
    }

    static update(id, updatedPerson) {
        return db.promise().query('UPDATE person SET ? WHERE id = ?', [updatedPerson, id]);
    }

    static delete(id) {
        return db.promise().query('DELETE FROM person WHERE id = ?', [id]);
    }
}

module.exports = Person;
