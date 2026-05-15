const express = require('express');
const router = express.Router();

const {
    bookAppointment,
    getPatientAppointments,
    updateAppointmentStatus
} = require('../controllers/appointmentController');

router.post('/', bookAppointment);
router.get('/patient/:id', getPatientAppointments);
router.put('/:id/status', updateAppointmentStatus);

module.exports = router;