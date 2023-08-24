const db = require('../db'); 

class Person {
    static getAll() {
        return db.promise().query('SELECT * FROM people');
    }

    static create(newPerson) {
        return db.promise().query('INSERT INTO people SET ?', [newPerson]);
    }

    static getById(id) {
        return db.promise().query('SELECT * FROM people WHERE id = ?', [id]);
    }

    static update(id, updatedPerson) {
        return db.promise().query('UPDATE people SET ? WHERE id = ?', [updatedPerson, id]);
    }

    static delete(id) {
        return db.promise().query('DELETE FROM people WHERE id = ?', [id]);
    }
}

module.exports = Person;
