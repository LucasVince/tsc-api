import { mongoClient } from "../../../database/mongo";
import { user } from "../../../models/user";
import { iGetUsersRepository } from "../../get-users/protocols";

export class mongoGetusersRepository implements iGetUsersRepository {
  async getUsers(): Promise<user[]> {
    const users = await mongoClient.db
      .collection<Omit<user, "id">>("users")
      .find({})
      .toArray() || [];

    return users.map((user) => {
      return {
        ...user,
        id: user._id.toHexString(),
      };
    });
  }
}
