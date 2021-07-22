import chalk from "chalk";
import { FastifyInstance } from "fastify";
import mongoose, { ConnectionOptions } from "mongoose";

const uri = "mongodb://127.0.0.1:2717/example";

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const initDatabase = async (app: FastifyInstance) => {
  try {
    await mongoose.connect(uri, options);
    mongoose.set("returnOriginal", false);
    console.log(chalk.green("[database] Success to connect"));
  } catch (error) {
    app.log.error(chalk.red(`[database] Failed to connect: ${error.message}`));
    console.log(chalk.red(`[database] Failed to connect: ${error.message}`));
    if (process.env.NODE_ENV === "production") {
      app.log.error(`[database] Failed to connect: ${error.message}`);
      process.exit(1);
    }
  }
};
