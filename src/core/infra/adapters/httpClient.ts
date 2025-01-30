import { axiosHttpClient } from "./httpClientAxios";

const api = axiosHttpClient({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export { api };
