import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  // Check if req.headers exists
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
