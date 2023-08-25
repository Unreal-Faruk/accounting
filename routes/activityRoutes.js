const express = require('express');
const Activity = require('../models/ActivitySqlModel');

const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.getAll();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const activityData = await Activity.getById(activityId);
        if (!activityData) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activityData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new activity
router.post('/', async (req, res) => {
    try {
        const newActivityId = await Activity.create(req.body);
        res.status(201).json({ id: newActivityId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an activity
router.put('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const success = await Activity.update(activityId, req.body);
        if (!success) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        const success = await Activity.delete(activityId);
        if (!success) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
