import { iGetUsersController, iGetUsersRepository } from "./protocols";

export class getUsersController implements iGetUsersController {
  constructor(private readonly getUsersRepository: iGetUsersRepository) {}
  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: err.message }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Error at getting users" }),
        };
      }
    }
  }
}
