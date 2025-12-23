import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// test route
app.get("/", (req, res) => {
  res.send("💸 Stack Finance API is running...");
});

// banks
app.get("/api/banks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banks");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// cards
app.get("/api/cards", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cards");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// investments
app.get("/api/investments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM investments");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
