const express = require('express');
const mongoose = require('mongoose');
const { handleClick } = require('./jobs/handleClick');
const { getUserStats } = require('./jobs/getUserStats');
const { saveUserStats } = require('./jobs/saveUserStats');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
console.log(mongoURI);

// MongoDB Connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => {
  console.log("Mongo connection error -->");
  console.log(err)
});

// Routes
app.get('/api/stats', getUserStats);
app.post('/api/click', handleClick);
app.post('/api/save', saveUserStats);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
