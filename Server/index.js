const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Routers
const userRouter = require('./routers/UserRouters');
const swapRouter = require('./routers/swaprouters'); 
const feedbackRouter = require('./routers/feedbackrouters');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/swaps', swapRouter);
app.use('/api/feedback', feedbackRouter);

app.get('/', (req, res) => {
  res.send('Skill Swap API is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(' Connected to MongoDB');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () =>
        console.log(` Server running at http://localhost:${PORT}`)
      );
    }
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

module.exports = app;