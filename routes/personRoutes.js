const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.get('/', (req, res) => {
    Person.getAll((err, people) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving people' });
        } else {
            res.json(people);
        }
    });
});

router.post('/', (req, res) => {
    const newPerson = req.body;
    Person.create(newPerson, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error creating person' });
        } else {
            res.json({ id: result.insertId });
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Person.getById(id, (err, person) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving person' });
        } else {
            res.json(person[0]);
        }
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedPerson = req.body;
    Person.update(id, updatedPerson, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error updating person' });
        } else {
            res.json({ success: true });
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Person.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting person' });
        } else {
            res.json({ success: true });
        }
    });
});

module.exports = router;
