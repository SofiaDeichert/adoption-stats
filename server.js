const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Intercountry Adoption Statistics API' });
});

// Get all countries
app.get('/api/countries', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM countries ORDER BY country_name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching countries' });
  }
});

// Get incoming adoptions by year
app.get('/api/incoming-adoptions/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query(
      `SELECT c.country_name, ia.adoptions_finalized_abroad, ia.adoptions_to_be_finalized_in_us, ia.total_adoptions
       FROM incoming_adoptions ia
       JOIN countries c ON ia.country_id = c.country_id
       JOIN years y ON ia.year_id = y.year_id
       WHERE y.year = $1
       ORDER BY ia.total_adoptions DESC`,
      [year]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching incoming adoptions' });
  }
});

// Get outgoing adoptions by year
app.get('/api/outgoing-adoptions/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query(
      `SELECT oa.receiving_country, s. state_name, oa.number_of_cases
       FROM outgoing_adoptions oa
       JOIN states s ON oa.state_id = s.state_id
       JOIN years y ON oa.year_id = y.year_id
       WHERE y.year = $1
       ORDER BY oa.number_of_cases DESC`,
      [year]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching outgoing adoptions' });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
