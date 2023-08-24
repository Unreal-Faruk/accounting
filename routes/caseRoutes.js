const express = require('express');
const Case = require('../models/Case');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cases = await Case.getAll();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const caseId = req.params.id;
        const caseData = await Case.getById(caseId);
        if (!caseData) {
            res.status(404).json({ error: 'Case not found' });
        } else {
            res.json(caseData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const createdId = await Case.create(req.body);
        res.json({ id: createdId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const caseId = req.params.id;
        const updated = await Case.update(caseId, req.body);
        if (updated) {
            res.json({ message: 'Case updated successfully' });
        } else {
            res.status(404).json({ error: 'Case not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const caseId = req.params.id;
        const deleted = await Case.delete(caseId);
        if (deleted) {
            res.json({ message: 'Case deleted successfully' });
        } else {
            res.status(404).json({ error: 'Case not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
