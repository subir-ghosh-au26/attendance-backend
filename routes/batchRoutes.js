// backend/routes/batchRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // For simplicity, let's just send a hardcoded array of batch names
    const batches = ['Batch A', 'Batch B', 'Batch C'];
    res.json(batches);
});

module.exports = router;