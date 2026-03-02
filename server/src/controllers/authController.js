import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function buildAuthResponse(user) {
  const safeUser = user.toJSON();
  const token = generateToken(user);
  return { user: safeUser, token };
}

export async function googleLogin(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create a random password for Google-only users
      const randomPassword = Math.random().toString(36).slice(-10);
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: randomPassword,
        role: "user",
        // You might want to add a field like `isGoogleUser: true` or `avatar: picture`
      });
    }

    return res.json(buildAuthResponse(user));
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }
}

export async function register(req, res) {
  const { name, email, password } = req.body || {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const role = email.toLowerCase().includes("admin") ? "admin" : "user";
  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), password, role });

  return res.status(201).json(buildAuthResponse(user));
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email?.trim() || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(buildAuthResponse(user));
}
