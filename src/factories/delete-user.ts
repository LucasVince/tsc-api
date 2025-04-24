import { mongoDeleteUserRepository } from "../repositories/delete-user/mongo-delete-user";
import { deleteUserController } from "../controllers/delete-user/delete-user";

export const deleteUserFactory = () => {
  const MongoDeleteUserRepository = new mongoDeleteUserRepository();
  const DeleteUserController = new deleteUserController(
    MongoDeleteUserRepository
  );

  return DeleteUserController;
};
