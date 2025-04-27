import { user } from "../../models/user";

export interface iPostUsersParams {
  name: string;
  email: string;
  password: string;
}

export interface iPostUsersRepository {
  postUser(params: iPostUsersParams): Promise<user>;
}
