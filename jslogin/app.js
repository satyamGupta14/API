const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'checklist',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    db.query('SELECT * FROM user_login WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        const user = results[0];

        // User is authenticated; generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username, role_id: user.role_id }, 'secretkey', {
            expiresIn: '1h', // Token expires in 1 hour
        });
          // Update the database with the JWT token
        db.query('UPDATE user_login SET jwt_token = ? WHERE username = ?', [token, user.username], (updateErr, updateResults) => {
            if (updateErr) {
                console.log(updateErr);
                res.status(500).json({ error: 'Failed to update JWT token in the database' });
                return;
            }
            
        res.status(200).json({ "token":token, "user": user.jwt_token});
    });
});
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
