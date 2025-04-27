import { user } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { iDeleteUserRepository } from "./protocols";

export class deleteUserController implements iController {
  constructor(private readonly deleteUserRepository: iDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown, { id: string }>
  ): Promise<HttpResponse<user>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing param: id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      if (!user) {
        return badRequest("User not found");
      }

      return created(user);
    } catch (err) {
      return serverError(err as string);
    }
  }
}
