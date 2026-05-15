const express = require('express');
const router = express.Router();
const { getPatientBills } = require('../controllers/billingController');

router.get('/patient/:id', getPatientBills);

module.exports = router;