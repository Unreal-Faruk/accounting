const express = require('express');
const Price = require('../models/PriceSqlModel');

const router = express.Router();

// Get all prices
router.get('/', async (req, res) => {
    try {
        const prices = await Price.getAll();
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get price by ID
router.get('/:id', async (req, res) => {
    try {
        const priceId = req.params.id;
        const priceData = await Price.getById(priceId);
        if (!priceData) {
            return res.status(404).json({ error: 'Price not found' });
        }
        res.json(priceData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new price
router.post('/', async (req, res) => {
    try {
        const newPriceId = await Price.create(req.body);
        res.status(201).json({ id: newPriceId });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a price
router.put('/:id', async (req, res) => {
    try {
        const priceId = req.params.id;
        const success = await Price.update(priceId, req.body);
        if (!success) {
            return res.status(404).json({ error: 'Price not found' });
        }
        res.status(200).json({ message: 'Price updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a price
router.delete('/:id', async (req, res) => {
    try {
        const priceId = req.params.id;
        const success = await Price.delete(priceId);
        if (!success) {
            return res.status(404).json({ error: 'Price not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
