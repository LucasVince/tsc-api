import { user } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface iGetUsersController {
  handle(): Promise<HttpResponse<user[]>>;
}

export interface iGetUsersRepository {
  getUsers(): Promise<user[]>;
}
