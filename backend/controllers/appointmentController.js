const db = require('../config/db');

const bookAppointment = (req, res) => {
    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason
    } = req.body;

    const sql = `
        INSERT INTO appointments (
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [patient_id, doctor_id, appointment_date, appointment_time, reason],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Appointment booked successfully',
                appointment_id: result.insertId
            });
        }
    );
};

const getPatientAppointments = (req, res) => {
    const patientId = req.params.id;

    const sql = `
        SELECT
            a.appointment_id,
            su.full_name AS doctor_name,
            dp.specialization,
            a.appointment_date,
            a.appointment_time,
            a.status,
            a.reason
        FROM appointments a
        JOIN doctor_profiles dp ON a.doctor_id = dp.doctor_id
        JOIN system_users su ON dp.user_id = su.user_id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date DESC
    `;

    db.query(sql, [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

const updateAppointmentStatus = (req, res) => {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const sql = `
        UPDATE appointments
        SET status = ?
        WHERE appointment_id = ?
    `;

    db.query(sql, [status, appointmentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: 'Appointment status updated successfully'
        });
    });
};

module.exports = {
    bookAppointment,
    getPatientAppointments,
    updateAppointmentStatus
};