const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Retrieve token from Authorization header

    if (!token) {
      return next(errorHandler("User not authorized", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");

    if (!decoded) {
      return next(errorHandler("User not authorized", 401));
    }

    req.user = {
      userId: decoded.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
