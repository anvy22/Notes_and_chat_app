import { verifyToken } from '@clerk/backend';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_JWT_SECRET
    });

    // Find or create user in MongoDB
    let user = await User.findOne({ clerkId: payload.sub });
    if (!user) {
      user = await User.create({
        clerkId: payload.sub,
        email: payload.email,
        username: payload.username || payload.email.split('@')[0],
        role: 'user'
      });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Invalid token' });
  }
};
