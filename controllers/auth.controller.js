import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../utils/email.js";

dotenv.config();
const { sign } = jwt;

// REGISTER
export async function register(req, res) {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM user WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or Username already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const verificationToken = uuidv4();

    const sql = `
      INSERT INTO user (fullname, username, email, password, verification_token)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(sql, [
      fullname,
      username,
      email,
      hashedPassword,
      verificationToken,
    ]);

    // Kirim email verifikasi
    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Error registering user" });
  }
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (user.verification_token !== null) {
      return res
        .status(400)
        .json({ error: "Please verify your email before logging in" });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ error: "Error during authentication" });
  }
}

// VERIFIKASI EMAIL
export async function verifyEmail(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  console.log("Verifying email with token:", token);
  try {
    const [users] = await db.query(
      "SELECT * FROM user WHERE verification_token = ?",
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: "Invalid Verification Token" });
    }

    const user = users[0];
    await db.query("UPDATE user SET verification_token = NULL WHERE id = ?", [
      user.id,
    ]);

    console.log("Email verified for user ID:", user.id);
    return res.json({ message: "Email Verified Successfully" });
  } catch (err) {
    console.error("Error during email verification:", err);
    return res.status(500).json({ error: "Error during email verification" });
  }
}
