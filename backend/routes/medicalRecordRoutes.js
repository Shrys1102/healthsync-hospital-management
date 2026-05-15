const express = require('express');
const router = express.Router();

const {
    getPatientMedicalRecords,
    addMedicalRecord
} = require('../controllers/medicalRecordController');

router.get('/patient/:id', getPatientMedicalRecords);
router.post('/', addMedicalRecord);

module.exports = router;