import { postUserController } from "../controllers/post-users/post-users";
import { mongoPostUserRepository } from "../repositories/post-users/mongo-post-users";

export const postUserFactory = () => {
  const MongoCreateUserRepository = new mongoPostUserRepository();
  const PostUserController = new postUserController(MongoCreateUserRepository);

  return PostUserController;
};
