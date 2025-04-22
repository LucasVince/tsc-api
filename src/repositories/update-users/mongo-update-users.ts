import { ObjectId } from "mongodb";
import {
  iUpdateUserParams,
  iUpdateUserRepository,
} from "../../controllers/update-user/protocols";
import { mongoClient } from "../../database/mongo";
import { user } from "../../models/user";

export class MongoUpdateUserRepository implements iUpdateUserRepository {
  async updateUser(id: string, params: iUpdateUserParams): Promise<user> {
    await mongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await mongoClient.db.collection("users").findOne({_id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    } as user;
  }
}
