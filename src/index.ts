import express from "express";
import dotenv from "dotenv";

import { getUsersFactory } from "./factories/get-users";
import { postUserFactory } from "./factories/post-user";

import { mongoClient } from "./database/mongo";
import { mongoUpdateUserRepository } from "./repositories/update-users/mongo-update-users";
import { updateUserController } from "./controllers/update-user/update-user";

const main = async () => {
  dotenv.config();

  const app = express();

  await mongoClient.connect();

  app.use(express.json());

  app.get("/users", async (req, res) => {
    const GetUsersController = getUsersFactory();

    const response = await GetUsersController.handle();

    res.status(response.statusCode).send(response.body);
  });

  app.post("/users", async (req, res) => {
    const PostUserController = postUserFactory();

    const httpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      method: req.method as "POST",
    };

    const response = await PostUserController.handle(httpRequest);

    res.status(response.statusCode).send(response.body);
  });

  app.patch("/users/:id", async (req, res) => {
    const MongoCreateUserRepository = new mongoUpdateUserRepository();
    const UpdateUserController = new updateUserController(
      MongoCreateUserRepository
    );

    const httpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      method: req.method as "PATCH",
    };

    const response = await UpdateUserController.handle(httpRequest);

    res.status(response.statusCode).send(response.body);
  });

  app.listen(8080, () => console.log("Server running on port 8080!!"));
};

main();
