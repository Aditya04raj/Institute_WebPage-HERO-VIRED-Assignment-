// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Use for password hashing
const userModel = require('../models/userModel');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30m' });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await userModel.getByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user details to the database
    const newUser = await userModel.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.getByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for authentication
    const token = generateAccessToken({ username: user.username, role: user.role });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  register,
  login,
};
