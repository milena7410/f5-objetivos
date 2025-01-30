import axios from "axios";
import { Config, HttpClient } from "../../domain/HttpClient";

function axiosHttpClient({ baseURL }: { baseURL: string }): HttpClient {
  const api = axios.create({ baseURL });
  const get = async <T>(url: string, config: Config = {}): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  };

  const post = async <T, U>(
    url: string,
    body: U,
    config: Config = {}
  ): Promise<T> => {
    const response = await api.post<T>(url, body, config);
    return response.data;
  };

  const put = async <T, U>(
    url: string,
    body: U,
    config: Config = {}
  ): Promise<T> => {
    const response = await api.put<T>(url, body, config);
    return response.data;
  };

  const del = async <T>(url: string, config: Config = {}): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  };

  return { get, post, put, delete: del };
}
export { axiosHttpClient };
