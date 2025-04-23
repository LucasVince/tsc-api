import { getUsersController } from "../controllers/get-users/get-users";
import { mongoGetusersRepository } from "../repositories/get-users/mongo-get-users";

export const getUsersFactory = () => {
  const MongoGetusersRepository = new mongoGetusersRepository();
  const GetUsersController = new getUsersController(MongoGetusersRepository);

  return GetUsersController;
};
