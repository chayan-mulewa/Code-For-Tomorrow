// controllers/authController.js
const authService = require('../services/authService');
const sendEmail = require('../services/sendEmail');


const signup = async (req, res) => {
  try {
    const { first_name, last_name, username, password, email } = req.body;
    const user = await authService.signup(email, username, password, first_name, last_name);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await sendEmail(email);
    res.json({ message: result });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login, resetPassword };
