import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  iUpdateUserController,
  iUpdateUserParams,
  iUpdateUserRepository,
} from "./protocols";

export class updateUserController implements iUpdateUserController {
  constructor(private readonly updateUserRepository: iUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown, { id: string }>
  ): Promise<HttpResponse<user>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing param: id",
        };
      }

      const someFieldIsNotAllowed = Object.keys(httpRequest.body!).some(
        (key) =>
          !["name", "email", "password"].includes(
            key as keyof iUpdateUserParams
          )
      );

      if (someFieldIsNotAllowed) {
        return {
          statusCode: 400,
          body: "Some fields are not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(
        id,
        httpRequest.body!
      );

      return {
        statusCode: 200,
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
