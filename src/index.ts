import express from "express";
import { config } from "dotenv";
import {getUsersController} from './controllers/get-users/get-users'
import {mongoGetusersRepository} from './controllers/repositories/get-users/mongo-get-users'

const app = express();

config();
app.use(express.json());
app.get("/", async (req, res) => {
  const MongoGetusersRepository = new mongoGetusersRepository;
  const GetUsersController = new getUsersController(MongoGetusersRepository);

  const response = await GetUsersController.handle();

  res.send(response.body).status(response.statusCode);
});

app.listen(8080, () => console.log("Server running on port 8080"));