import { axios } from "../plugins/axios";

export function getLanguages(params) {
  return axios({
    url: `languages`,
    method: "get",
    params,
  });
}
