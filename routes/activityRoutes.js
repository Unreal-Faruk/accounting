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

// Add other CRUD routes here (create, update, delete)

module.exports = router;
