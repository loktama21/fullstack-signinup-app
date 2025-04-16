const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt"); // 🔹 Added bcrypt

require("dotenv").config(); // 🔹 Load env variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // 🔹 Hash the password

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Failed to signup" });
      }
      res.status(200).json({ message: "User signed up and saved to DB!" });
    });
  } catch (error) {
    console.error("Hashing error:", error); // 🔹 Error if bcrypt fails
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password); // compare hashed password

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
