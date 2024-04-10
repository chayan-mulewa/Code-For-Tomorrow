// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db.js');

const saltRounds = 10;

const signup = async (email, username, password, first_name, last_name) => {

    const existingEmail = await connectDB.execute("SELECT email FROM user WHERE email = ?", [email]);

    if (existingEmail.length != 0) {
        throw new Error("User with this email already exists.");
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {

        connectDB.execute(
            'INSERT INTO user (email, username, password, first_name, last_name) VALUES (?,?,?,?,?)',
            [email, username, hash, first_name, last_name],
            function (err, results, fields) {
                if (err) {
                    throw new Error("User Is Not Saved Into Datadase");
                }
                else {
                    if (results.affectedRows == 0) {
                        throw new Error("User Is Not Saved Into Datadase");
                    }
                }
            }
        );
    });

    const user = {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name
    }

    return user;
};

const login = async (username, password) => {

    let token = undefined;

    // Wrap the whole database query in a Promise to use async/await
    await new Promise((resolve, reject) => {
        connectDB.execute("SELECT username , password FROM user WHERE username = ?", [username], function (error, result, fields) {
            if (error) {
                reject(new Error('Invalid credentials'));
            }
            if (result.length === 0) {
                reject(new Error('User not found'));
            }
            const dbUsername = result[0].username;
            const db_HashPassword = result[0].password;

            bcrypt.compare(password, db_HashPassword, function (err, result) {
                if (result == true) {
                    token = jwt.sign({ userId: username }, 'your-secret-key', { expiresIn: '1h' });
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                }
            });
        });
    });

    return token;
};


module.exports = { signup, login };
