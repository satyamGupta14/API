const express = require('express');
const mysql = require('mysql2');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'checklist',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());

// Request an OTP for login
app.post('/login', (req, res) => {
  const { email } = req.body;

  // Check if the user exists in the database
  const checkQuery = 'SELECT * FROM user_login WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).json({ error: 'Internal Server Errorss' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generate a random 6-digit OTP
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });

    // Save the OTP in the database
    const updateQuery = 'UPDATE user_login SET otp = ? WHERE email = ?';
    db.query(updateQuery, [otp, email], (updateErr) => {
      if (updateErr) {
        console.error('Error updating OTP in the database:', updateErr);
        res.status(500).json({ error: 'Internal Server Errorpp' });
        return;
      }
      const nodemailer = require('nodemailer');
      // Send the OTP via email
      const transporter = nodemailer.createTransport({
        host: 'smtp.rediffmailpro.com',
        port: 465,  
        secure: true, // for SSL
        auth: {
          user: 'trainee.software@buildint.co',
          pass: 'BuildINT@123',
        },
      });
      

      const mailOptions = {
        from: 'trainee.software@buildint.co',
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP for login is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (emailErr) => {
        if (emailErr) {
          console.error('Error sending email:', emailErr);
          res.status(500).json({ error: 'Internal dddServer Error' });
          return;
        }

        res.status(200).json({ message: 'OTP sent to your email for login' });
      });
    });
  });
});

// Verify OTP and log in
app.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  // Check if the provided OTP matches the one in the database
  const query = 'SELECT * FROM user_login WHERE email = ? AND otp = ?';
  db.query(query, [email, otp], (err, results) => {
    if (err) {
      console.error('Error checking OTP:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid OTP' });
      return;
    }

    // Successfully logged in
    res.status(200).json({ message: 'Login successful' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
