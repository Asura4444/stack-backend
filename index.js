import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// 🧱 Supabase bağlantısı
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

// === ROUTES ===

// Ana test
app.get("/", (req, res) => {
  res.send("🧠 Stack Finance API is running...");
});

// Bankalar
app.get("/api/banks", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM banks;");
  res.json(rows);
});

// Kartlar
app.get("/api/cards", async (req, res) => {
  const { rows } = await pool.query(`
    SELECT cards.*, banks.name as bank_name 
    FROM cards 
    JOIN banks ON cards.bankId = banks.id;
  `);
  res.json(rows);
});

// Yatırımlar
app.get("/api/investments", async (req, res) => {
  const { rows } = await pool.query(`
    SELECT investments.*, banks.name as bank_name 
    FROM investments 
    JOIN banks ON investments.bankId = banks.id;
  `);
  res.json(rows);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Stack API running on port ${PORT}`));
