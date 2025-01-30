export type Config = {
  config?: Record<string, string>;
  params?: Record<string, string>;
};

export interface HttpClient {
  get<T>(url: string, config?: Config): Promise<T>;
  post<T, U = {}>(url: string, body: U, config?: Config): Promise<T>;
  put<T, U = {}>(url: string, body: U, config?: Config): Promise<T>;
  delete<T>(url: string, config?: Config): Promise<T> | void;
}
