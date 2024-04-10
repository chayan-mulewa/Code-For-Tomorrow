// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db.js');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    const username = decoded.userId;
    const user = await connectDB.execute("SELECT username,email,first_name,last_name FROM user WHERE username = ?", [username], (error, result, row) => {
      if (error) {
        throw new Error("Invalid token");
      } else {
        if (result.length != 0) {
          req.user = result[0];
          next();
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

