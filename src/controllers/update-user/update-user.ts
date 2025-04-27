import { user } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { iUpdateUserParams, iUpdateUserRepository } from "./protocols";

export class updateUserController implements iController {
  constructor(private readonly updateUserRepository: iUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown, { id: string }>
  ): Promise<HttpResponse<user>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing param: id");
      }

      const someFieldIsNotAllowed = Object.keys(httpRequest.body!).some(
        (key) =>
          !["name", "email", "password"].includes(
            key as keyof iUpdateUserParams
          )
      );

      if (someFieldIsNotAllowed) {
        return badRequest("Some field is not allowed, or does not exist");
      }

      const user = await this.updateUserRepository.updateUser(
        id,
        httpRequest.body!
      );

      return created(user);
    } catch (err) {
      return serverError(err as string);
    }
  }
}
