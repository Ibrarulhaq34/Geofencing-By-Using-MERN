


const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI; // Use the connection string from the environment variables

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

const db = mongoose.connection;

module.exports = db;





