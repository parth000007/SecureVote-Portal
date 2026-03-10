require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const electionRoutes = require('./routes/election');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/votingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/election', electionRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Government-Grade Voting API is up and running securely.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}...`);
});
