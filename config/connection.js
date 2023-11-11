const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nikhilkalkalb:RahulChutiya@cluster0.qxq3ctk.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Mongoose connection errors  ::::", error);
  }
};
//RahulChutiya

module.exports = connectDB;
