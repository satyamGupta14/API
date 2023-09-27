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
    area,
    ac1_type,
    ac1_make_model,
    ac1_qty,
    ac1_capacity,
    ac1_communication,
    ac2_type,
    ac2_make_model,
    ac2_qty,
    ac2_capacity,
    ac2_communication,
    ups_make_model,
    ups_capacity_output,
    ups_total_no_batt,
    ups_batt_voltage,
    elec_sys_sld,
    elec_sys_tot_no_panels,
    light_led,
    light_no_of_lights,
    signage_status,
    signage_timing,
    atm_door_status,
    door_sensor,
    atm_count,
    site_images,
    timer_signage,
    timer_ac1,
    timer_ac2,
    other_asset_details,
    remarks,
    engg_name,
    engg_cont_no
  } = req.body;

  // Insert form data into the MySQL database
  const sql = `INSERT INTO atm_asset_report(
    atm_id,
    city_name,
    date_of_visit,
    atm_site_address,
    mse_name,
    mse_cnct_no,
    mse_email,
    area,
    ac1_type,
    ac1_make_model,
    ac1_qty,
    ac1_capacity,
    ac1_communication,
    ac2_type,
    ac2_make_model,
    ac2_qty,
    ac2_capacity,
    ac2_communication,
    ups_make_model,
    ups_capacity_output,
    ups_total_no_batt,
    ups_batt_voltage,
    elec_sys_sld,
    elec_sys_tot_no_panels,
    light_led,
    light_no_of_lights,
    signage_status,
    signage_timing,
    atm_door_status,
    door_sensor,
    atm_count,
    site_images,
    timer_signage,
    timer_ac1,
    timer_ac2,
    other_asset_details,
    remarks,
    engg_name,
    engg_cont_no
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;  
  
  const values = [
    atm_id,
    city_name,
    date_of_visit,
    atm_site_address,
    mse_name,
    mse_cnct_no,
    mse_email,
    area,
    ac1_type,
    ac1_make_model,
    ac1_qty,
    ac1_capacity,
    ac1_communication,
    ac2_type,
    ac2_make_model,
    ac2_qty,
    ac2_capacity,
    ac2_communication,
    ups_make_model,
    ups_capacity_output,
    ups_total_no_batt,
    ups_batt_voltage,
    elec_sys_sld,
    elec_sys_tot_no_panels,
    light_led,
    light_no_of_lights,
    signage_status,
    signage_timing,
    atm_door_status,
    door_sensor,
    atm_count,
    site_images,
    timer_signage,
    timer_ac1,
    timer_ac2,
    other_asset_details,
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});