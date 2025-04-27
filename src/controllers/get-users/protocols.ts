import { user } from "../../models/user";

export interface iGetUsersRepository {
  getUsers(): Promise<user[]>;
}
