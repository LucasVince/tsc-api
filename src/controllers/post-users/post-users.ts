import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  iPostUsersController,
  iPostUsersParams,
  iPostUsersRepository,
} from "./protocols";

export class postUserController implements iPostUsersController {
  constructor(private readonly postUsersRepository: iPostUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<iPostUsersParams>
  ): Promise<HttpResponse<user>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Missing body",
        };
      }

      const user = await this.postUsersRepository.postUser(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  }
}
