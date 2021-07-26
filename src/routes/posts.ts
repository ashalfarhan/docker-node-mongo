import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import { Server } from "http";
import { PostModel } from "../db/models/post";
import { paramsWithIdSchema, postSchema } from "../schemas";
import * as yup from "yup";

type BodyIncoming = yup.TypeOf<typeof postSchema>;

type ParamsWithId = yup.TypeOf<typeof paramsWithIdSchema>;

const postsRoutesHandler: FastifyPluginCallback<FastifyPluginOptions, Server> =
  (route, _options, done) => {
    route.addHook("preHandler", (req, res, next) => {
      const { user } = req.session.data;
      if (!user) {
        res.status(401).send({
          message: "Session is expired, try to login to get another session",
        });
        return;
      }
      next();
    });
    route
      .addSchema({
        $id: "withPostId",
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      })
      .addSchema({
        $id: "post",
        type: "object",
        required: ["title", "body"],
        properties: {
          title: {
            type: "string",
          },
          body: {
            type: "string",
          },
        },
      });
    route.get("/", async (req, res) => {
      console.log(req.ip)
      console.log(req.ips)
      console.log(req.hostname)
      console.log(req.protocol)
      try {
        const results = await PostModel.find();
        if (results.length > 0) {
          return res.status(200).send({
            results,
          });
        }
        return res.status(404).send({
          message: "Db is empty, please create another",
        });
      } catch (error) {
        return res.status(400).send({
          message: `Something wen't wrong: ${error.message}`,
        });
      }
    });
    route.get<{ Params: ParamsWithId }>(
      "/:id",
      {
        schema: {
          params: { $ref: "withPostId#" },
        },
      },
      async (req, res) => {
        try {
          const result = await PostModel.findById(req.params.id);
          if (!result) {
            return res.status(404).send({
              message: "Cannot find post with the id of " + req.params.id,
            });
          }
          return res.status(200).send({
            message: "Success get a post",
            result,
          });
        } catch (error) {
          return res.status(400).send({
            message: error.message,
          });
        }
      },
    );
    route.post<{ Body: BodyIncoming }>(
      "/",
      {
        schema: {
          body: {
            $ref: "post#",
          },
        },
      },
      async (req, res) => {
        try {
          const result = await PostModel.create<any>(req.body);
          await result.save();
          return res.status(201).send({
            message: "Sucess create a post",
            result,
          });
        } catch (error) {
          return res.status(400).send({
            message: "Failed to create a post " + error.message,
          });
        }
      },
    );
    route.put<{ Params: ParamsWithId; Body: BodyIncoming }>(
      "/:id",
      {
        schema: {
          params: { $ref: "withPostId#" },
          body: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              body: {
                type: "string",
              },
            },
          },
        },
      },
      async (req, res) => {
        try {
          const result = await PostModel.findByIdAndUpdate(
            req.params.id,
            req.body,
          );
          if (result) {
            await result.save();
            return res.status(201).send({
              message: "Success update a post " + result.title,
            });
          }
          return res.status(404).send({
            message: `Post with the id of ${req.params.id} not found`,
          });
        } catch (error) {
          return res.status(400).send({
            message: "Failed to update: " + error.message,
          });
        }
      },
    );
    route.delete<{ Params: ParamsWithId }>(
      "/:id",
      {
        schema: {
          params: { $ref: "withPostId#" },
        },
      },
      async (req, res) => {
        try {
          const result = await PostModel.findByIdAndDelete(req.params.id);
          if (!result) {
            return res.status(404).send({
              message: "Cannot find post with the id of " + req.params.id,
            });
          }
          return res.status(200).send({
            message: "Success delete a post",
            result,
          });
        } catch (error) {
          return res.status(400).send({
            message: error.message,
          });
        }
      },
    );
    done();
  };

export default postsRoutesHandler;
