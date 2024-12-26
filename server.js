const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./itineraries.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the itineraries database.');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS itinerary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  startTime TEXT NOT NULL,
  duration TEXT NOT NULL,
  location TEXT NOT NULL,
  maps TEXT
)`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/itineraries', (req, res) => {
  const sql = 'SELECT * FROM itinerary';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/itineraries', (req, res) => {
    const { name, startTime, duration, location, maps } = req.body;
    console.log('Request Body:', req.body); 
  
    if (!name || !startTime || !duration || !location) {
      return res.status(400).json({ message: 'Name, Start Time, Duration, and Location are required fields.' });
    }
  
    const sql = 'INSERT INTO itinerary (name, startTime, duration, location, maps) VALUES (?, ?, ?, ?, ?)';
    const params = [name, startTime, duration, location, maps];
  
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Itinerary added successfully', itineraryId: this.lastID });
    });
  });  

app.delete('/itineraries/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM itinerary WHERE id = ?';

  db.run(sql, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Itinerary deleted successfully' });
  });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });  
