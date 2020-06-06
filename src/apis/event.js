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

export function postEvent(payload) {
  return axios({
    url: `events`,
    method: "post",
    data: payload,
  });
}

export function patchEvent(id, payload) {
  return axios({
    url: `events/${id}`,
    method: "put",
    data: payload,
  });
}

export function deleteEvent(id) {
  return axios({
    url: `events/${id}`,
    method: "delete",
  });
}
