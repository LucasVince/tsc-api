import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface iPostUsersParams {
  name: string;
  email: string;
  password: string;
}

export interface iPostUsersController {
  handle(
    httpRequest: HttpRequest<iPostUsersParams>
  ): Promise<HttpResponse<user>>;
}

export interface iPostUsersRepository {
  postUser(params: iPostUsersParams): Promise<user>;
}
