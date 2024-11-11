import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Check if the user has token
export const tokenAuthenticator = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Check the role of the user/token
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const tokenRole = req.user.role;

    if (!requiredRole.includes(tokenRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
