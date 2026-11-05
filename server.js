
require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Weather Dashboard API - Version 2",
    status: "running"
  });
});

// GET /cities - Get all cities
app.get("/cities", (req, res) => {
  try {
    const cities = db.prepare(
      "SELECT * FROM cities ORDER BY id ASC"
    ).all();

    res.status(200).json(cities);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to retrieve cities"
    });
  }
});

// GET /cities/:id - Get one city
app.get("/cities/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "City ID must be a positive integer"
      });
    }

    const city = db.prepare(
      "SELECT * FROM cities WHERE id = ?"
    ).get(id);

    if (!city) {
      return res.status(404).json({
        error: "City not found"
      });
    }

    res.status(200).json(city);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to retrieve city"
    });
  }
});

// POST /cities - Create a city
app.post("/cities", (req, res) => {
  try {
    const { name, country } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof country !== "string" ||
      name.trim() === "" ||
      country.trim() === "" ||
      name.trim().length > 100 ||
      country.trim().length > 100
    ) {
      return res.status(400).json({
        error: "Name and country must be non-empty strings of at most 100 characters"
      });
    }

    const result = db.prepare(
      "INSERT INTO cities (name, country) VALUES (?, ?)"
    ).run(name.trim(), country.trim());

    const newCity = db.prepare(
      "SELECT * FROM cities WHERE id = ?"
    ).get(result.lastInsertRowid);

    res.status(201).json(newCity);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create city"
    });
  }
});

// PUT /cities/:id - Update a city
app.put("/cities/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "City ID must be a positive integer"
      });
    }

    const { name, country } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof country !== "string" ||
      name.trim() === "" ||
      country.trim() === "" ||
      name.trim().length > 100 ||
      country.trim().length > 100
    ) {
      return res.status(400).json({
        error: "Name and country must be non-empty strings of at most 100 characters"
      });
    }

    const result = db.prepare(
      "UPDATE cities SET name = ?, country = ? WHERE id = ?"
    ).run(name.trim(), country.trim(), id);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "City not found"
      });
    }

    const updatedCity = db.prepare(
      "SELECT * FROM cities WHERE id = ?"
    ).get(id);

    res.status(200).json(updatedCity);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update city"
    });
  }
});

// DELETE /cities/:id - Delete a city
app.delete("/cities/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "City ID must be a positive integer"
      });
    }

    const result = db.prepare(
      "DELETE FROM cities WHERE id = ?"
    ).run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "City not found"
      });
    }

    res.status(200).json({
      message: "City deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete city"
    });
  }
});

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Global error-handling middleware
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid JSON body"
    });
  }

  console.error("Unexpected server error:", error);

  res.status(500).json({
    error: "Internal server error"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
