const express = require('express');
const Task = require('../models/TaskSqlModel');

const router = express.Router();

const { authenticateToken } = require('../utils/token');

// Middleware to check if the task belongs to the authenticated user
const checkTaskOwnership = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const existingTask = await Task.getById(taskId);

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all tasks for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Task.getAllWithActivitiesAndPrices(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get task by ID
router.get('/:id', authenticateToken, checkTaskOwnership, async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = await Task.getById(taskId);
        res.json(taskData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newTask = req.body;
        const createdTaskId = await Task.create(newTask);
        res.status(201).json({ id: createdTaskId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update task by ID along with activities and prices if provided
router.post('/:id', authenticateToken, checkTaskOwnership, async (req, res) => {
    
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;

        // Merge userId from the authenticated user into the updatedTask object
        updatedTask.userId = req.user.userId;

        await Task.update(taskId, updatedTask);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete task by ID
router.delete('/:id', authenticateToken, checkTaskOwnership, async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.delete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
