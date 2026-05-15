const express = require('express');
const router = express.Router();

const {
    getDashboardStats,
    getAuditLogs
} = require('../controllers/adminController');

router.get('/dashboard', getDashboardStats);
router.get('/audit-logs', getAuditLogs);

module.exports = router;