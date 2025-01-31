import { env } from "~/config/env";
import { axiosHttpClient } from "./httpClientAxios";

const api = axiosHttpClient({
  baseURL: env.API_URL ?? "",
});
export { api };
