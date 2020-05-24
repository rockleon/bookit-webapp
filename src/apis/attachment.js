import { axios } from "../plugins/axios";

export function postAttachment(payload) {
  // const config = {
  //   headers: {
  //     "content-type":
  //       "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
  //   },
  // };
  return axios({
    url: `attachments/`,
    method: "post",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
