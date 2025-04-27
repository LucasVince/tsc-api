import { user } from "../../models/user";

export interface iUpdateUserParams {
  name?: string;
  email?: string;
  password?: string;
}

export interface iUpdateUserRepository {
  updateUser(id: string, params: iUpdateUserParams): Promise<user>;
}
