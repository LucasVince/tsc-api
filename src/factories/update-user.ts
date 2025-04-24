import { mongoUpdateUserRepository } from "../repositories/update-user/mongo-update-users";
import { updateUserController } from "../controllers/update-user/update-user";

export const updateUserFactory = () => {
  const MongoCreateUserRepository = new mongoUpdateUserRepository();
  const UpdateUserController = new updateUserController(
    MongoCreateUserRepository
  );

  return UpdateUserController;
};
