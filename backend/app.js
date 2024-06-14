const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Buat koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uas_pemweb' // Update this to match your database name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Import routes
const beritaRoutes = require('./routes/news');

// Use routes
app.use('/news', beritaRoutes);

// Define a route for the root URL to fetch data from the database
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Ensure keywords are arrays
        const news = results.map(item => {
            item.keywords = Array.isArray(item.keywords) ? item.keywords : item.keywords.split(',');
            return item;
        });
        res.json(news);
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);  // Fixed line
});
