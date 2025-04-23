import { user } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface iUpdateUserParams {
    name?: string;
    email?: string;
    password?: string;
}

export interface iUpdateUserController {
    handle(httpRequest: HttpRequest): Promise<HttpResponse<user>>;
}


export interface iUpdateUserRepository {
    updateUser(id: string, params: iUpdateUserParams): Promise<user>;
}