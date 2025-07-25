const mongoose = require('mongoose');
const dotenv=require('dotenv')

dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

module.exports = connectDB;