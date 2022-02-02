import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";

import router from "./router";

import "./database";
import "./database/schemas";

const server = express();

server.use(express.json());
server.use(router);

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof Error) {
      return response.status(500).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const port = process.env.PORT || 4000;
server.listen({ port }, () => console.log(`Server is running on port ${port}`));

export default server;
