const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.post('/create-pdf', pdfController.createPdfAndSend);

module.exports = router;
