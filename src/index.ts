import express from "express";
import dotenv from "dotenv";
import { getUsersController } from "./controllers/get-users/get-users";
import { mongoGetusersRepository } from "./controllers/repositories/get-users/mongo-get-users";
import { mongoClient } from "./database/mongo";

const main = async () => {
  dotenv.config();

  const app = express();

  await mongoClient.connect();

  app.use(express.json());

  app.get("/users", async (req, res) => {
    const MongoGetusersRepository = new mongoGetusersRepository();
    const GetUsersController = new getUsersController(MongoGetusersRepository);

    const response = await GetUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  app.listen(8080, () => console.log("Server running on port 8080!!"));
};

main();