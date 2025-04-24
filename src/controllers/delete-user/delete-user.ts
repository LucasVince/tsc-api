import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { iDeleteUserController, iDeleteUserRepository } from "./protocols";

export class deleteUserController implements iDeleteUserController {
  constructor(private readonly deleteUserRepository: iDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown, { id: string }>
  ): Promise<HttpResponse<user>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return Promise.resolve({
          statusCode: 400,
          body: "Missing param: id",
        });
      }

      return {
        statusCode: 200,
        body: await this.deleteUserRepository.deleteUser(id) + '\n User Deleted Successfully',
      };
    } catch (err) {
      return Promise.resolve({
        statusCode: 500,
        body: JSON.stringify(err),
      });
    }
  }
}
