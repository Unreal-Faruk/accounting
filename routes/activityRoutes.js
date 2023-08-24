const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.getAll();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const activityData = await Activity.getById(activityId);
        res.json(activityData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newActivityData = req.body;
        const result = await Activity.create(newActivityData);
        res.json({ message: 'Activity created', insertId: result[0].insertId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const updatedActivityData = req.body;
        await Activity.update(activityId, updatedActivityData);
        res.json({ message: 'Activity updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        await Activity.delete(activityId);
        res.json({ message: 'Activity deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
