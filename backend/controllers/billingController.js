const db = require('../config/db');

const getPatientBills = (req, res) => {
    const patientId = req.params.id;

    const sql = `
        SELECT
            bill_id,
            appointment_id,
            amount,
            payment_status,
            payment_date,
            generated_at
        FROM billing
        WHERE patient_id = ?
        ORDER BY generated_at DESC
    `;

    db.query(sql, [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

module.exports = { getPatientBills };