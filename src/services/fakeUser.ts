import axios from "axios";

export const fakeUser = axios.create({
  baseURL: "https://randomuser.me/api",
});
