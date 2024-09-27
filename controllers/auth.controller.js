import { hash, compare } from "bcrypt";
import path from "path";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";

config();
const { sign } = jwt;

export async function register(req, res) {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [results] = await db.query(
      "SELECT * FROM user WHERE email = ? OR username = ?",
      [email, username]
    );

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or Username already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const sql =
      "INSERT INTO user (fullname, username, email, password) VALUES (?, ?, ?, ?)";
    await db.query(sql, [fullname, username, email, hashedPassword]);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Error registering user" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [results] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ error: "Error during authentication" });
  }
}
