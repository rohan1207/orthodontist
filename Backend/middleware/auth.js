import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export async function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'missing authorization' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'invalid authorization format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.id);
    if (!admin) return res.status(401).json({ error: 'invalid token' });
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
