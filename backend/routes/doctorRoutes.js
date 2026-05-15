const express = require('express');
const router = express.Router();

const {
    getAllDoctors,
    getDoctorAppointments
} = require('../controllers/doctorController');

router.get('/', getAllDoctors);
router.get('/:id/appointments', getDoctorAppointments);

module.exports = router;