const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, connectRedis } = require('./config');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(router)

connectRedis()
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

