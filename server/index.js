// index.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const programRoutes = require('../server/routes/programRoutes');
const authRoutes = require('../server/routes/authRoutes');
const db = require('../server/utills/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Use authentication middleware for all routes
app.use(authenticateToken);

app.use('/programs', programRoutes);
//app.use('/programs', programRoutes);
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
