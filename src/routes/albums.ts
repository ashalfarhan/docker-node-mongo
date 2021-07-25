import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import { Server } from "http";
import fetch from "node-fetch";
// import redis from "../libs/redis";

// const DEFAUL_MAX_AGE = 3600;

const albumsRoute: FastifyPluginCallback<FastifyPluginOptions, Server> = (
  route,
  _,
  done,
) => {
  route.get("/", async (_, res) => {
    //   redis.get("photos", async (error, cached) => {
    // if (error) route.log.error(error);
    // if (cached !== null) {
    //   route.log.info("Returning cached");
    //   return res.send(JSON.parse(cached));
    // } else {
    route.log.info("Returning request");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=10",
    );
    const json = await response.json();
    // redis.setex("photos", DEFAUL_MAX_AGE, JSON.stringify(json));
    return res.send(json);
    // }
    //   });
  });

  route.get<{ Params: { id?: string } }>("/:id", async (req, res) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos/" + req.params.id,
      );
      const json = await response.json();
      return json;
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  });
  done();
};

export default albumsRoute;
