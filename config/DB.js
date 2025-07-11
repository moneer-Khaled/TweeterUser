const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kmoneer25:project123@cluster2.rqqgyho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2', {
      
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};

module.exports = connectDB;
