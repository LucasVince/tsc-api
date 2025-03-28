import { user } from "../../../models/user";
import { iGetUsersRepository } from "../../get-users/protocols";

export class mongoGetusersRepository implements iGetUsersRepository {
  getUsers(): Promise<user[]> {
    return Promise.resolve([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      },
    ]);
  }
}
