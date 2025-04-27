import { user } from "../models/user";
import { HttpStatusCode } from "./protocols";

export const ok = (message: string | user[]) => {
  return {
    statusCode: HttpStatusCode.OK,
    body: message,
  };
};

export const created = (message: string | user) => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body: message,
  };
};

export const badRequest = (message: string) => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (message: string) => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: message,
  };
};
