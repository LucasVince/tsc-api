import { iGetUsersController, iGetUsersRepository } from "./protocols";
import { HttpResponse } from "../protocols";
import { user } from "../../models/user";

export class getUsersController implements iGetUsersController {
  constructor(private readonly getUsersRepository: iGetUsersRepository) {}

  async handle(): Promise<HttpResponse<user[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  }
}
