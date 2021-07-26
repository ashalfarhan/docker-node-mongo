const config = {
  MONGO_IP: process.env.MONGO_IP || "database-mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export default config;
