const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables

const tasksRouter = require('./routes/tasks');

const app = express(); // Initialize Express app

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/projdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // Allow requests from other origins (frontend)

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API!');
});

// Routes
app.use('/api/tasks', tasksRouter);

module.exports = app;
