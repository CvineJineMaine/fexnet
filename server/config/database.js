const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("db connected successful")
    } catch (err) {
        console.error('batabase connection err:', error);
        console.exit(1);
    }
}

module.exports = connectDB;