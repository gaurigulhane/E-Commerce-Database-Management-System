const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('E-Commerce Backend is Running');
});

// Products Route
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM Products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Auth Route (Simplified)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.execute(
            'SELECT * FROM Users WHERE username = :username',
            [username]
        );
        if (result.rows.length > 0) {
            // In real app, verify password_hash
            res.json({ message: 'Login successful', user: result.rows[0] });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cart and Order Logic
app.post('/api/orders', async (req, res) => {
    const { user_id } = req.body;
    try {
        const result = await db.execute(
            'BEGIN Process_Order(:user_id, :status); END;',
            {
                user_id: user_id,
                status: { dir: require('oracledb').BIND_OUT, type: require('oracledb').STRING, maxSize: 200 }
            }
        );
        res.json({ status: result.outBinds.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        await db.initialize();
    } catch (err) {
        console.log('Database initialization skipped (DB offline). Running in mock mode.');
    }
});
