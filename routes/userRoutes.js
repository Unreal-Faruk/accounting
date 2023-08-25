const express = require('express');
const User = require('../models/UserSqlModel');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await User.getById(userId);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        const createdUserId = await User.create(newUser);
        res.status(201).json({ id: createdUserId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        await User.update(userId, updatedUser);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.delete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
