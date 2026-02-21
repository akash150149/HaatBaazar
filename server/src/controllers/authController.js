import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

function buildAuthResponse(user) {
  const safeUser = user.toJSON();
  const token = generateToken(user);
  return { user: safeUser, token };
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
