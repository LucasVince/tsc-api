export interface HttpResponse<res> {
  statusCode: HttpStatusCode;
  body: res | string;
}

export interface HttpRequest<
  TBody = unknown,
  TParams = unknown,
  THeaders = unknown,
  TQuery = unknown,
> {
  body?: TBody;
  headers?: THeaders;
  params?: TParams;
  query?: TQuery;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface iController {
  handle(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
