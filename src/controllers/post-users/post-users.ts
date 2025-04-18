import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  iPostUsersController,
  iPostUsersParams,
  iPostUsersRepository,
} from "./protocols";

import { isEmail } from 'validator';
import { hash } from "bcrypt";

export class postUserController implements iPostUsersController {
  constructor(private readonly postUsersRepository: iPostUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<iPostUsersParams>
  ): Promise<HttpResponse<user>> {
    try {
      const requiredFields = ["name", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof iPostUsersParams]) {
          return {
            statusCode: 400,
            body: `Missing param: ${field}`,
          };
        }
      }

      const isEmailValid = isEmail(httpRequest.body!.email);

      if (!isEmailValid) {
        return {
          statusCode: 400,
          body: `${httpRequest.body!.email} is not a valid email`,
        };
      }

      const hashedPassword = await hash(httpRequest.body!.password, 10);

      const userToCreate:iPostUsersParams = {
        name: httpRequest.body!.name,
        email: httpRequest.body!.email,
        password: hashedPassword,
      }

      const user = await this.postUsersRepository.postUser(userToCreate);

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
