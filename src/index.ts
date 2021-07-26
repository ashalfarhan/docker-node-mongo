import Fastify from "fastify";
import FastifySessionPlugin from "@mgcrea/fastify-session";
import { RedisStore } from "@mgcrea/fastify-session-redis-store";
import fastifySwagger from "fastify-swagger";
import fs from "fs";
import path from "path";
import RedisClient from "ioredis";
import fastifyCookie from "fastify-cookie";
import config from "./config";
import fastifyCors from "fastify-cors";

const app = Fastify({
  logger: true,
  trustProxy: true,
});

/**
 * 1 hour
 * 3600 seconds
 */
const SESSION_TTL = 10;

app.register(fastifyCors);

app.register(fastifyCookie);

app.register(FastifySessionPlugin, {
  store: new RedisStore({
    client: new RedisClient(parseInt(config.REDIS_PORT), config.REDIS_URL),
    ttl: SESSION_TTL,
  }),
  secret: config.SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: SESSION_TTL,
  },
});

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/api/docs",
  swagger: {
    info: {
      title: "Learn Fastify Rest",
      version: "0.1.0",
      description: "Just an example of fastify learn with docker",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

try {
  fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
    const name = file.substr(0, file.indexOf("."));
    import("./routes/" + name).then((handler) => {
      app.register(handler, { prefix: `/api/${name}` });
    });
  });
} catch (error) {
  console.log("Dynamic register error: ", error.message);
}

const indexRouteResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: {
        type: "string",
      },
    },
  },
};

app.get(
  "/api",
  { schema: { response: indexRouteResponseSchema } },
  (_, res) => {
    res.status(200).send({
      message: "Hello world",
    });
  },
);

export default app;
