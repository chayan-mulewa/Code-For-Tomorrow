// app.js
const express = require('express')
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB.connect((error) => {
    if (error) {
        console.log("mysql is not connected : " + error)
    }
    else {
        console.log("mysql is connected");
    }
})

// Middleware

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;
