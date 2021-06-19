const chalk = require("chalk");
const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/example", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("returnOriginal", false);
    console.log(chalk.cyan("[database] Success to connect"));
  } catch (error) {
    console.error(chalk.red(`[database] Failed to connect: ${error.message}`));
  }
};
