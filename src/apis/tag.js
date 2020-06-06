import { axios } from "../plugins/axios";

export function getTags(params) {
  return axios({
    url: `tags`,
    method: "get",
    params,
  });
}
