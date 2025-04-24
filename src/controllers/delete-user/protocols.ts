import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface iDeleteUserController {
    handle(httpRequest: HttpRequest): Promise<HttpResponse<user>>;
}

export interface iDeleteUserRepository {
    deleteUser(id: string): Promise<user>;
}