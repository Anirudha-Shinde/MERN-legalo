// Location: mern/server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const obligationRoutes = require('./routes/obligations')

const app = express();

// Middleware
app.use(express.json()); // allows us to parse JSON data sent in requests
app.use(cors()); // allows frontend to communicate with backend

// use Routes
app.use('/api/obligations', obligationRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Basic Route to test server
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});