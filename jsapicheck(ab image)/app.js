const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'checklist',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.post('/submit', (req, res) => {
  const {
    atm_id,
    city_name,
    date_of_visit,
    atm_site_address,
    mse_name,
    mse_cnct_no,
    mse_email,
    before_inst_images, 
    after_inst_images ,
    remarks,
    engg_name,
    engg_cont_no
  } = req.body;

  // Insert form data into the MySQL database
  const sql = `INSERT INTO ba_inst_images(
    atm_id,
    city_name,
    date_of_visit,
    atm_site_address,
    mse_name,
    mse_cnct_no,
    mse_email,
    before_inst_images, 
    after_inst_images ,
    remarks,
    engg_name,
    engg_cont_no
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;  
  
  const values = [
    atm_id,
    city_name,
    date_of_visit,
    atm_site_address,
    mse_name,
    mse_cnct_no,
    mse_email,
    before_inst_images, 
    after_inst_images ,
    remarks,
    engg_name,
    engg_cont_no
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ message: 'Error inserting data into the database.' });
    }
    
    return res.json({ message: 'Item added successfully' });
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});