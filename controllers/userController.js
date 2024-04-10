// controllers/userController.js
const connectDB = require('../config/db.js');

const getUserProfile = (req, res) => {
    const user = req.user;

    if (user==undefined) {
        return res.status(401).json({ message: 'Unauthorized sdsd' });
    }
    res.json({user});
};

module.exports = { getUserProfile };