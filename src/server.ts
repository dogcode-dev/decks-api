import "reflect-metadata";

import express from "express";

import router from "./router";

import "./database";
import "./database/schemas";

const server = express();

server.use(express.json());
server.use(router);

const port = process.env.PORT || 4000;
server.listen({ port }, () => console.log(`Server is running on port ${port}`));

export default server;
