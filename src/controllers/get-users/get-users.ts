import { iGetUsersRepository } from "./protocols";
import { HttpResponse, iController } from "../protocols";
import { user } from "../../models/user";
import { ok, serverError } from "../helpers";

export class getUsersController implements iController {
  constructor(private readonly getUsersRepository: iGetUsersRepository) {}

  async handle(): Promise<HttpResponse<user[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok(users);
    } catch (err) {
      return serverError(err as string);
    }
  }
}
