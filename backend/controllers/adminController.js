const db = require('../config/db');

const getDashboardStats = (req, res) => {
    const stats = {};

    db.query(
        'SELECT COUNT(*) AS totalPatients FROM patient_profiles',
        (err, patientResults) => {
            if (err) return res.status(500).json({ error: err.message });

            stats.totalPatients = patientResults[0].totalPatients;

            db.query(
                'SELECT COUNT(*) AS totalDoctors FROM doctor_profiles',
                (err, doctorResults) => {
                    if (err) return res.status(500).json({ error: err.message });

                    stats.totalDoctors = doctorResults[0].totalDoctors;

                    db.query(
                        'SELECT COUNT(*) AS totalAppointments FROM appointments',
                        (err, appointmentResults) => {
                            if (err) return res.status(500).json({ error: err.message });

                            stats.totalAppointments = appointmentResults[0].totalAppointments;

                            db.query(
                                'SELECT COUNT(*) AS todayAppointments FROM appointments WHERE appointment_date = CURDATE()',
                                (err, todayResults) => {
                                    if (err) return res.status(500).json({ error: err.message });

                                    stats.todayAppointments = todayResults[0].todayAppointments;

                                    db.query(
                                        "SELECT COUNT(*) AS pendingBills FROM billing WHERE payment_status IN ('pending', 'unpaid')",
                                        (err, billResults) => {
                                            if (err) return res.status(500).json({ error: err.message });

                                            stats.pendingBills = billResults[0].pendingBills;

                                            db.query(
                                                "SELECT IFNULL(SUM(amount), 0) AS totalRevenue FROM billing WHERE payment_status = 'paid'",
                                                (err, revenueResults) => {
                                                    if (err) return res.status(500).json({ error: err.message });

                                                    stats.totalRevenue = revenueResults[0].totalRevenue;

                                                    res.json(stats);
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};

const getAuditLogs = (req, res) => {
    const sql = `
        SELECT
            log_id,
            action_type,
            table_name,
            description,
            performed_by,
            created_at
        FROM audit_logs
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

module.exports = {
    getDashboardStats,
    getAuditLogs
};