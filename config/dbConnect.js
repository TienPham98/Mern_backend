const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};
module.exports = dbConnect;
