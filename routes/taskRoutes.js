const express = require('express');
const Task = require('../models/TaskSqlModel');

const router = express.Router();

const { authenticateToken } = require('../utils/token');

// Get all tasks TODO: (For the logged in user, authentiicateToken)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming authenticateToken sets req.user with user information
        const tasks = await Task.getAllWithActivitiesAndPrices(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get task by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = await Task.getById(taskId);
        if (!taskData) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // TODO: Check if task belongs to the authenticated user
        if (taskData.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

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

// TODO: CHECK IF THE TASKS BELONGS TO THE Authenticated user if so then you can update
// In this Update method in the body I also expect besides the task table information also activities and prices, 
// Because when updated I want to update all together
// please adjust also the code for Task.update to where updatedTask also contain activity and price table information 
// Update task by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;

        // TODO: Check if task belongs to the authenticated user
        const existingTask = await Task.getById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        if (existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Merge userId from the authenticated user into the updatedTask object
        updatedTask.userId = req.user.userId;

        // TODO: Implement logic to update activities and prices if needed
        await Task.update(taskId, updatedTask);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete task by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;

        const existingTask = await Task.getById(taskId);
        if (existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        // TODO: CHECK IF THE TASKS BELONGS TO THE Authenticated user 

        await Task.delete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
