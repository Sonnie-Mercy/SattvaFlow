const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

const verifyToken = async (req, res, next) => {
  try {
    // Check if the Authorization header exists and follows the "Bearer <token>" format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(errorHandler("Authorization header is missing or malformed", 401));
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(errorHandler("Token not provided", 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(errorHandler("Invalid or expired token", 401));
    }

    // Attach user information from the token payload to the request
    req.user = {
      userId: decoded.id,
    };

    next(); // Pass control to the next middleware/route
  } catch (error) {
    // Handle JWT-specific errors (e.g., token expiration)
    if (error.name === "TokenExpiredError") {
      return next(errorHandler("Token has expired", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(errorHandler("Invalid token", 401));
    }

    // Handle other unexpected errors
    next(error);
  }
};

module.exports = verifyToken;