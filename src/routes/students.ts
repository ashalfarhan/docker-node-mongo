import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import { Server } from "http";
import { StudentModel } from "../db/models/student";
import { studentValidation } from "../validation/student.validation";

export const studentRoute: FastifyPluginCallback<FastifyPluginOptions, Server> =
  (route, _options, done) => {
    route.get("/", async (_, res) => {
      const result = await StudentModel.find();
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
        const result = await StudentModel.findOne({
          _id: req.params.id,
        });
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

    route.post("/new", async (req, res) => {
      try {
        const valid = await studentValidation.validate(req.body);
        const newStudent = new StudentModel(valid);
        const result = await newStudent.save();
        if (!result) {
          throw Error("Failed to save new student");
        }
        res.status(201).send({
          message: "Success create new user",
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
