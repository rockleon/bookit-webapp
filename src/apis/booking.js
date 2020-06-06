import { axios } from "../plugins/axios";

export function getBookings(params) {
  return axios({
    url: `bookings`,
    method: "get",
    params,
  });
}

export function getBookingDetail(id, params) {
  return axios({
    url: `bookings/${id}`,
    method: "get",
    params,
  });
}

export function postBooking(payload) {
  return axios({
    url: `bookings`,
    method: "post",
    data: payload,
  });
}
