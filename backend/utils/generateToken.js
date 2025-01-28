const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const expiresIn = process.env.JWT_EXPIRE || "15d";
  const jwtSecret = process.env.JWT_SECRET || "ACHUB982398y4bdhwdb8935";

  // Log the expiresIn value
  console.log("Token expiration set to:", expiresIn);

  const token = jwt.sign(
    {
      id: id,
    },
    jwtSecret,
    {
      expiresIn: expiresIn,
    }
  );

  return token;
};

module.exports = generateToken;