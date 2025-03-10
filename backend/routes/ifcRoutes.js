// backend/routes/ifcRoutes.js
const express = require('express');
const { uploadIFC, compareIFC } = require('../controllers/ifcController');
const router = express.Router();

router.post('/upload', uploadIFC);
router.post('/compare', compareIFC);

module.exports = router;