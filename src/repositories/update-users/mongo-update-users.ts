import { ObjectId } from "mongodb";
import { hash } from "bcrypt";
import {
  iUpdateUserParams,
  iUpdateUserRepository,
} from "../../controllers/update-user/protocols";
import { mongoClient } from "../../database/mongo";
import { user } from "../../models/user";

export class mongoUpdateUserRepository implements iUpdateUserRepository {
  async updateUser(id: string, params: iUpdateUserParams): Promise<user> {
    const userToUpdate = await mongoClient.db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (params.password) {
      const hashedPassword = await hash(params.password, 10);
      params.password = hashedPassword;
    }

    await mongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          params: {
            ...userToUpdate!.params,
            ...params,
          },
        },
      }
    );

    const user = await mongoClient.db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    } as user;
  }
}
