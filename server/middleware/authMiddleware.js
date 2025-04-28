import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId, // Ensure the token includes userId
      name: decoded.name,     // Ensure the token includes name
    };
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}