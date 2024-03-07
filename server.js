// src/server.js
const express = require("express");
const cors = require('cors');
const {  pool, connectToDatabase } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;


app.get("/data", async (req, res) => {
  try {
    const { searchTerm, sortBy, page } = req.query;
    let pageNumber = parseInt(page);

    // Set default page number to 1 if not provided or invalid
    if (isNaN(pageNumber) || pageNumber <= 0) {
      pageNumber = 1;
    }

    const offset = (pageNumber - 1) * 20;

    let query = "SELECT * FROM data";
    const values = [];

    if (searchTerm) {
      query += ` WHERE cust_name ILIKE '%' || '${searchTerm}' || '%' OR location ILIKE '%' || '${searchTerm}' || '%'`;
    }

    if (sortBy) {
      query += ` ORDER BY ${sortBy}`;
    }

    query += " LIMIT 20 OFFSET $1";

    const result = await pool.query(query, [offset]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






app.listen(PORT, async () => {
 console.log(`Server is running on port ${PORT}`);
 await connectToDatabase();
  
});
