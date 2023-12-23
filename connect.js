const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const uri = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(uri);

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { connectDB };
