import { ObjectId } from "mongodb";
import { iDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { mongoClient } from "../../database/mongo";
import { user } from "../../models/user";

export class mongoDeleteUserRepository implements iDeleteUserRepository {
    async deleteUser(id: string): Promise<user> {
        const user = await mongoClient.db.collection("users").findOne({ _id: new ObjectId(id) })

        if (!id) {
            throw new Error("Missing param: id")
        }

        if (!user) {
            throw new Error("User not found");
        }

        await mongoClient.db.collection("users").deleteOne({ _id: new ObjectId(id) });

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}