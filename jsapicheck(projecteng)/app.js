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
    location,
    atm_id,
    mse_name,
    site_per_name,
    site_per_cont_no,
    date_of_visit,
    visit_in_time,
    ac1,
    ac1_remark,
    ac2,
    ac2_remark,
    lobby,
    lobby_remark,
    signage,
    signage_remark,
    temp_hum,
    temp_hum_remark,
    door_sensor,
    door_sensor_remark,
    earthing,
    earthing_remark,
    ups_charg_op,
    ups_charg_op_remark,
    iatm_box,
    iatm_remark,
    router,
    router_remark,
    battery,
    battery_remark,
    atm_machine,
    atm_machine_remark,
    visit_out_time,
    issue_resolved,
    remark,
    engg_name,
    engg_cont_no,
  } = req.body;

  // Insert form data into the MySQL database
  const sql = `INSERT INTO project_engg (
    location, atm_id, mse_name, site_per_name, site_per_cont_no,
    date_of_visit, visit_in_time, ac1, ac1_remark, ac2, ac2_remark,
    lobby, lobby_remark, signage, signage_remark, temp_hum, temp_hum_remark,
    door_sensor, door_sensor_remark, earthing, earthing_remark, ups_charg_op,
    ups_charg_op_remark, iatm_box, iatm_remark, router, router_remark,
    battery, battery_remark, atm_machine, atm_machine_remark,
    visit_out_time, issue_resolved, remark, engg_name, engg_cont_no
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;  
  
  const values = [
    location, atm_id, mse_name, site_per_name, site_per_cont_no,
    date_of_visit, visit_in_time, ac1, ac1_remark, ac2, ac2_remark,
    lobby, lobby_remark, signage, signage_remark, temp_hum, temp_hum_remark,
    door_sensor, door_sensor_remark, earthing, earthing_remark, ups_charg_op,
    ups_charg_op_remark, iatm_box, iatm_remark, router, router_remark,
    battery, battery_remark, atm_machine, atm_machine_remark,
    visit_out_time, issue_resolved, remark, engg_name, engg_cont_no
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
