import Fastify from "fastify";
import { studentRoute } from "./routes/students";

const app = Fastify({
  logger: true,
});

app.register(studentRoute, { prefix: "/api/students" });

app.get("/", (_, res) => {
  res.status(200).send({
    message: "Fastify successfully running!!",
  });
});

export default app;
