import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import { Server } from "http";
// import { StudentModel } from "../db/models/student";
// import { studentValidation } from "../validation/student.validation";
import fetch from "node-fetch";

const studentRoute: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  route,
  _options,
  done,
) => {
  route.get("/", async (_, res) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const result = await response.json();
    if (result.length) {
      res.status(200).send({
        result,
      });
      return;
    }
    res.status(400).send({
      message: "Db is empty, please create another",
    });
  });

  route.get<{ Params: { id: string } }>("/:id", async (req, res) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos/" + req.params.id,
      );
      const result = await response.json();
      if (!result) {
        throw Error(`Cannot find student with the id of ${req.params.id}`);
      }
      res.status(200).send({
        result,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });
  done();
};

export default studentRoute;
