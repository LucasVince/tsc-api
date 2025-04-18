import express from "express";
import dotenv from "dotenv";
import { getUsersController } from "./controllers/get-users/get-users";
import { mongoGetusersRepository } from "./controllers/repositories/get-users/mongo-get-users";
import { mongoClient } from "./database/mongo";
import { mongoPostUserRepository } from "./controllers/repositories/post-users/mongo-post-users";
import { postUserController } from "./controllers/post-users/post-users";

const main = async () => {
  dotenv.config();

  const app = express();

  await mongoClient.connect();

  app.use(express.json());

  app.get("/users", async (req, res) => {
    const MongoGetusersRepository = new mongoGetusersRepository();
    const GetUsersController = new getUsersController(MongoGetusersRepository);

    const response = await GetUsersController.handle();

    res.status(response.statusCode).send(response.body);
  });
  
  app.post("/users", async (req, res) => {
    const MongoCreateUserRepository = new mongoPostUserRepository();
    const PostUserController = new postUserController(MongoCreateUserRepository);
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

  app.listen(8080, () => console.log("Server running on port 8080!!"));
};

main();