// const mongoose = require('mongoose');
// const connectDB = async ()=>{
// try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log(`MongoDB connected : ${process.env.MONGO_URL}`);
// } catch (error) {
//     console.log(`mongoose connection with bckend error are : `,error);
// }
// }
// module.exports = connectDB

// changes

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
