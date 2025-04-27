import { user } from "../../models/user";
import { HttpRequest, HttpResponse, iController } from "../protocols";
import { iPostUsersParams, iPostUsersRepository } from "./protocols";
import { isEmail } from "validator";
import { hash } from "bcrypt";
import { badRequest, created } from "../helpers";

export class postUserController implements iController {
  constructor(private readonly postUsersRepository: iPostUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<iPostUsersParams>
  ): Promise<HttpResponse<user>> {
    try {
      const requiredFields = ["name", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof iPostUsersParams]) {
          return badRequest(`Missing param: ${field}`);
        }
      }

      const isEmailValid = isEmail(httpRequest.body!.email);

      if (!isEmailValid) {
        return badRequest(`${httpRequest.body!.email} is not a valid email`);
      }

      const hashedPassword = await hash(httpRequest.body!.password, 10);

      const userToCreate: iPostUsersParams = {
        name: httpRequest.body!.name,
        email: httpRequest.body!.email,
        password: hashedPassword,
      };

      const user = await this.postUsersRepository.postUser(userToCreate);

      return created(user);
    } catch (err) {
      return badRequest(err as string);
    }
  }
}
