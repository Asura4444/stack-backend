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

