import { axios } from "../plugins/axios";

export function postAttachment(payload) {
  return axios({
    url: `attachments/`,
    method: "post",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
