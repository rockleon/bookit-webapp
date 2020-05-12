import { axios } from "../plugins/axios";

export function login(payload) {
  return axios({
    url: `rest-auth/login/`,
    method: "post",
    data: payload,
  });
}
