const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/login-app/semester", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

const tlr= new mongoose.Schema({
  subtopic:String,
  rank:String
})
const Question = new mongoose.model("Question",tlr)

module.exports= Question;