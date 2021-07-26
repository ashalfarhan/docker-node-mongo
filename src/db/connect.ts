import chalk from "chalk";
import { FastifyInstance } from "fastify";
import mongoose, { ConnectionOptions } from "mongoose";
import config from "../config";

const { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME } = config;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
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
