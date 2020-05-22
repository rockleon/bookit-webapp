import { axios } from "../plugins/axios";

export function getEvents(params) {
  return axios({
    url: `events`,
    method: "get",
    params,
  });
}

export function getEventDetail(id, params) {
  return axios({
    url: `events/${id}`,
    method: "get",
    params,
  });
}

export function postEvent(params) {
  return axios({
    url: `events`,
    method: "post",
    params,
  });
}

export function patchEventDetail(id, params) {
  return axios({
    url: `events/${id}`,
    method: "put",
    params,
  });
}
