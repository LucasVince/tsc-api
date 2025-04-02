import { user } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface iPostUsersParams {
    name: string;
    email: string;
    password: string;
}

export interface iPostUsersController {
    handle(): Promise<HttpResponse<user>>
}

export interface iPostUsersRepository {
    postUser(params: iPostUsersParams): Promise<user>;
}