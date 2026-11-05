
require("dotenv").config();

const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// Get the database path from .env
const dbPath = path.resolve(
  process.env.DB_FILE || "./data/cities.db"
);

// Create the data folder if it doesn't exist
fs.mkdirSync(path.dirname(dbPath), {
  recursive: true
});

// Connect to the SQLite database
const db = new Database(dbPath);

// Create the cities table
db.exec(`
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Export the database connection
module.exports = db;
