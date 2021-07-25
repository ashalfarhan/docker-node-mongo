import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import fs from "fs";
import path from "path";

const app = Fastify({
  logger: true,
});

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/api/docs",
  swagger: {
    info: {
      title: "Learn Fastify Rest",
      version: "0.1.0",
    },
  },
});

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  const name = file.substr(0, file.indexOf("."));
  import("./routes/" + name).then((handler) => {
    app.register(handler, { prefix: `/api/${name}` });
  });
});

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

app.get("/", { schema: { response: indexRouteResponseSchema } }, (_, res) => {
  res.status(200).send({
    message: "Hello world",
  });
});

export default app;
