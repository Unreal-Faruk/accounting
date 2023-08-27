const express = require('express');
const Task = require('../models/TaskSqlModel');

const router = express.Router();

const { authenticateToken } = require('../utils/token');

// Get all tasks TODO: (For the logged in user, authentiicateToken)
// DONT JUST SEND THE TASK but send the task with all acitivities and all prices too 
router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log( req);
        const userId = req.user.userId; // Assuming authenticateToken sets req.user with user information
        const tasks = await Task.getAllWithActivitiesAndPrices(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*router.get('/', authentiicateToken, async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});*/

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = await Task.getById(taskId);
        if (!taskData) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(taskData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    try {
        const newTask = req.body;
        const createdTaskId = await Task.create(newTask);
        res.status(201).json({ id: createdTaskId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update task by ID
router.put('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        await Task.update(taskId, updatedTask);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete task by ID
router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.delete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
