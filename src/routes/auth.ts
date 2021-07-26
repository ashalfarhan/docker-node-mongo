import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import { Server } from "http";
import { UserModel } from "../db/models/user";
import { hash, compare } from "bcryptjs";

const authHandler: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  route,
  _,
  done,
) => {
  route
    .addSchema({
      $id: "signUpBody",
      type: "object",
      required: ["username", "password"],
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    })
    .addSchema({
      $id: "successSignupResponse",
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        _id: {
          type: "string",
        },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    })
    .addSchema({
      $id: "failSignupResponse",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        reason: {
          type: "string",
        },
      },
    });
  interface IncomingBody {
    username: string;
    password: string;
  }
  route.post<{ Body: IncomingBody }>(
    "/signup",
    {
      schema: {
        body: { $ref: "signUpBody#" },
        response: {
          201: {
            message: { type: "string" },
            result: { $ref: "successSignupResponse#" },
          },
          "4xx": { $ref: "failSignupResponse#" },
        },
      },
    },
    async (req, res) => {
      try {
        const { password, username } = req.body;
        const hashed = await hash(password, 12);
        const result = await UserModel.create<any>({
          username,
          password: hashed,
        });
        req.session.set("user", result);
        res.status(201).send({
          message: "Success create user",
          result,
        });
      } catch (error) {
        res.status(400).send({
          message: "Failed to create a user",
          reason: error.message,
        });
      }
    },
  );

  route.post<{ Body: IncomingBody }>(
    "/signin",
    { schema: { body: { $ref: "signUpBody#" } } },

    async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
          throw Error("Invalid username or password");
        }
        const valid = await compare(password, user.password);
        if (!valid) {
          throw Error("Invalid username or password");
        }
        req.session.set("user", user);
        res.status(200).send({
          message: "Success signin",
          user,
        });
      } catch (error) {
        res.status(400).send({
          message: "Failed to signin",
          reason: error.message,
        });
      }
    },
  );
  done();
};

export default authHandler;
