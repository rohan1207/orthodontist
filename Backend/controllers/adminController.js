import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

function createToken(admin) {
  return jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function setupAdmin(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const exists = await Admin.findOne({ username });
  if (exists) return res.status(400).json({ error: 'admin already exists' });
  const admin = new Admin({ username, password });
  await admin.save();
  const token = createToken(admin);
  res.json({ token, username: admin.username });
}

export async function loginAdmin(req, res) {
  const { username, email, password } = req.body;
  const identifier = username || email;
  if (!identifier || !password) return res.status(400).json({ error: 'username/email and password required' });
  const admin = await Admin.findOne({ username: identifier });
  if (!admin) return res.status(401).json({ error: 'invalid credentials' });
  const match = await admin.comparePassword(password);
  if (!match) return res.status(401).json({ error: 'invalid credentials' });
  const token = createToken(admin);
  res.json({ token, username: admin.username });
}
