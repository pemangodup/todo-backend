const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const db = require('./config/db');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');

// Initializing config file
dotenv.config({ path: './config/config.env' });

// Cors protection
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

// JSON parser
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

//
app.use('/todo/v1/api/auth', authRoutes);
app.use('/todo/v1/api/note', noteRoutes);

app.use(errorMiddleware);
// Port number
const port = process.env.PORT || 5000;
db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on port no ${port}`.rainbow);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
