const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
}

module.exports = connectDB;