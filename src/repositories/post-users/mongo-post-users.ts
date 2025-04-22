import { mongoClient } from "../../database/mongo";
import { user } from "../../models/user";
import {
  iPostUsersParams,
  iPostUsersRepository,
} from "../../controllers/post-users/protocols";

export class mongoPostUserRepository implements iPostUsersRepository {
  async postUser(params: iPostUsersParams): Promise<user> {
    const newUser = await mongoClient.db
      .collection("users")
      .insertOne({ params });

    const user = await mongoClient.db
      .collection<Omit<user, "id">>("users")
      .findOne({
        _id: newUser.insertedId,
      });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
