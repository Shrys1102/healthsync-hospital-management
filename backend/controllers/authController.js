const db = require('../config/db');

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM system_users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = results[0];

        if (password !== user.password_hash) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user.user_id,
                name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = { loginUser };