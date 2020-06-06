<template>
  <v-card class="booking-detail">
    <v-row class="card-head ma-0">Booking Detail</v-row>
    <v-row class="card-content ma-0">
      <v-row class="row-width-max ma-0">
        <v-col cols="12">
          <v-row class="field-title ma-0">NAME</v-row>
          <v-row class="field-value ma-0">{{ getFullName(booking.user_details) }}</v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">MOBILE NO.</v-row>
          <v-row class="field-value ma-0">{{ booking.user_details.profile_details.mobile_number }}</v-row>
        </v-col>
      </v-row>
      <v-row class="row-width-max ma-0">
        <v-col cols="12">
          <v-row class="field-title ma-0">EMAIL</v-row>
          <v-row class="field-value ma-0">{{booking.user_details.email}}</v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">BOOKING DATE</v-row>
          <v-row class="field-value ma-0">{{ formatDate(booking.created) }}</v-row>
        </v-col>
      </v-row>
      <v-row class="row-width-max ma-0">
        <v-col cols="12">
          <v-row class="field-title ma-0">REGISTRATION TYPE</v-row>
          <v-row class="field-value ma-0">{{booking.registration_type}}</v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">TICKETS BOOKED</v-row>
          <v-row class="field-value ma-0">{{ booking.number_of_tickets }}</v-row>
        </v-col>
      </v-row>
      <v-row class="row-width-max ma-0">
        <v-col cols="12">
          <v-row class="field-title ma-0">PRICE PAID</v-row>
          <v-row class="field-value ma-0">{{booking.total_amount}}</v-row>
        </v-col>
      </v-row>
      <v-row class="row-width-max ma-0">
        <v-col cols="12">
          <v-row class="field-title ma-0">ID CARD</v-row>
          <v-row class="field-value ma-0">
            <v-img
              :src="booking.user_details.profile_details.id_card_details.image_url"
              alt="ID Card"
              width
              contain
            ></v-img>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "BookingDetail",
  props: ["booking"],
  data() {
    return {};
  },
  methods: {
    getFullName(user_details) {
      let name = "";
      if (user_details.first_name && user_details.first_name.length)
        name += `${user_details.first_name} `;
      if (user_details.last_name && user_details.last_name.length)
        name += user_details.last_name;
      return name;
    },
    formatDate(dateTime) {
      let date = moment(dateTime).format("DD/MM/YYYY");
      if (date === moment().format("DD/MM/YYYY")) {
        return `Today, ${moment(dateTime).format("hh:mm A")}`;
      } else return moment(dateTime).format("DD MMMM YYYY, hh:mm A");
    }
  }
};
</script>

<style scoped>
.booking-detail {
  display: flex;
  flex-direction: column;
}

.row-width-max {
  width: 100%;
}

.card-head {
  background-color: var(--v-primary-base);
  color: white;
  width: 100%;
  padding: 20px;
  font-size: 24px;
  display: flex;
  justify-content: center;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.field-title {
  font-size: 14px;
  color: #8a8a8a;
}

.field-value {
  font-size: 20px;
}
</style>