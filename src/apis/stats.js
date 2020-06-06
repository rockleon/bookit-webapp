import { axios } from "../plugins/axios";

export function allBookingTypeStats() {
  return axios({
    url: `booking-type-stats`,
    method: "get",
  });
}

export function monthlyBookingStats() {
  return axios({
    url: `monthly-booking-stats`,
    method: "get",
  });
}

export function eventBookingTypeStats(id) {
  return axios({
    url: `event-booking-stats/${id}`,
    method: "get",
  });
}

export function eventOverallStats() {
  return axios({
    url: `dashboard-stats`,
    method: "get",
  });
}
