export interface HttpResponse<res> {
  statusCode: number;
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
