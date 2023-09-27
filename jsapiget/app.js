// app.js
const express = require('express');
const mysql = require('mysql2');

const app = express();

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: 'localhost',     // Change to your MySQL server host
  user: 'root', // Change to your MySQL username
  password: '12345', // Change to your MySQL password
  database: 'checklist', // Change to your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/data', (req, res) => {
  const query = `
    SELECT * 
    FROM ba_inst_images
    JOIN atm_asset_report ON ba_inst_images.atm_id = atm_asset_report.atm_id
    JOIN project_engg ON ba_inst_images.atm_id = project_engg.atm_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
