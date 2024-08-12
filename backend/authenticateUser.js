import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorized(Token Authentication Failed)",
      });
    }

    req.user = decoded;
    next();
  });
};
