import jwt from "jsonwebtoken"

const protect = (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Not authorized. No token provided",
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Invalid token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ID request ke andar store karna
    req.user = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token",
    });
  }
};

export default protect;