// File: server/utils/generateToken.js
// This file generates a JWT token for user authentication.
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;




// This function generates a JSON Web Token (JWT) using the user's ID and a secret key stored in the environment variables.
// The token is set to expire in 30 days. It can be used for user authentication and authorization in a web application.
// The generated token can be sent to the client and stored (e.g., in local storage or cookies) to maintain the user's session.