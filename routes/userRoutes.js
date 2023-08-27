const express = require('express');
const User = require('../models/UserSqlModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
require('dotenv').config();

const { authenticateToken } = require('../utils/token');

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
router.get('/:id', authenticateToken, async (req, res) => {
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

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { password, email, firstName, lastName } = req.body;

        // Check if the email already exists
        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Assuming User.create method supports the new fields
        const createdUserId = await User.create({
            password: hashedPassword,
            email,
            firstName,
            lastName
        });

        res.status(201).json({ id: createdUserId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login and generate a token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getByEmail(email);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.sendStatus(401); // Unauthorized
        }

        const userId = parseInt(user.id);

        const token = jwt.sign({ userId, email }, process.env.SECRET_KEY, { expiresIn: '30m' });
        res.json({ token });
    } catch (error) {
        res.sendStatus(500); // Internal Server Error
    }
});

// Update user by ID
router.put('/:id', authenticateToken, async (req, res) => {
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
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        await User.delete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
