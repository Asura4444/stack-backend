import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Render PORT değişkenini kullan
const PORT = process.env.PORT || 3000;

// ✅ Supabase bağlantısı (DATABASE_URL kullanıyor)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Supabase için zorunlu
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Stack Backend is running ✅");
});

// Bankalar tablosu örnek endpoint
app.get("/api/banks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banks");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
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

// Test route
app.get("/", (req, res) => {
  res.send("💸 Stack Finance API is running...");
});

// BANKS
app.get("/api/banks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banks");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// CARDS
app.get("/api/cards", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cards");
    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// INVESTMENTS
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

