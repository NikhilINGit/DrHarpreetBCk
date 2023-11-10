const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect(
      "mongodb+srv://admin-ayush:<password>@cluster0.9k5kkc9.mongodb.net/HarpreetDB"
    );

    console.log(`MongoDB connected : ${process.env.MONGO_URL}`);
  } catch (error) {
    console.log(`mongoose connection with bckend error are : `, error);
  }
};
module.exports = connectDB;
