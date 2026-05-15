const db = require('../config/db');

const getPatientMedicalRecords = (req, res) => {
    const patientId = req.params.id;

    const sql = `
        SELECT
            mr.record_id,
            su.full_name AS doctor_name,
            dp.specialization,
            mr.diagnosis,
            mr.notes,
            mr.created_at
        FROM medical_records mr
        JOIN doctor_profiles dp ON mr.doctor_id = dp.doctor_id
        JOIN system_users su ON dp.user_id = su.user_id
        WHERE mr.patient_id = ?
        ORDER BY mr.created_at DESC
    `;

    db.query(sql, [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

const addMedicalRecord = (req, res) => {
    const {
        appointment_id,
        patient_id,
        doctor_id,
        diagnosis,
        notes
    } = req.body;

    const sql = `
        INSERT INTO medical_records (
            appointment_id,
            patient_id,
            doctor_id,
            diagnosis,
            notes
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [appointment_id, patient_id, doctor_id, diagnosis, notes],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Medical record added successfully',
                record_id: result.insertId
            });
        }
    );
};

module.exports = {
    getPatientMedicalRecords,
    addMedicalRecord
};