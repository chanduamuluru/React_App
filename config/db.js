const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(config);
    console.log(db);
    console.error(`DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
