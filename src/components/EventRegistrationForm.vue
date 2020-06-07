<template>
  <v-form
    ref="registrationForm"
    v-model="valid"
    lazy-validation
    class="registration-form"
    @submit.prevent
  >
    <v-row class="event-title ma-0">{{title}}</v-row>
    <v-row class="form-row ma-0" style="padding-top: 20px;">
      <v-col cols="6" class="form-col">
        <v-text-field
          v-model="firstName"
          label="First name"
          :rules="[rules.required]"
          validate-on-blur
          class="pa-0"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="form-col">
        <v-text-field
          v-model="lastName"
          label="Last name"
          :rules="[rules.required]"
          validate-on-blur
          class="pa-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="6" class="form-col">
        <v-text-field
          v-model="email"
          label="Email Id"
          :rules="[rules.required, rules.email]"
          validate-on-blur
          class="pa-0"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="form-col">
        <v-text-field
          v-model="mobile"
          label="Mobile Number"
          :rules="[rules.required, rules.numbersOnly, rules.tenDigits]"
          validate-on-blur
          class="pa-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="6" class="form-col">
        <v-select
          v-model="typeOfBooking"
          :items="registrationTypes"
          label="Type of Registration"
          :rules="[rules.required]"
          @change="handleTypeChange"
        ></v-select>
      </v-col>
      <v-col cols="6" class="form-col">
        <v-text-field
          v-model="numOfTickets"
          label="Number of Tickets"
          type="number"
          item-text="text"
          item-value="id"
          :rules="[rules.required, rules.numbersOnly, rules.greaterThanOne, rules.availableSeats ]"
          validate-on-blur
          :disabled="disableTickets"
          class="pa-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="12" class="form-col attachment-notes">
        Upload a verified Identification Card (Aadhar Card or Pan Card)
        <br />Submitted ID card will be verified at the event venue
        <br />You can upload your ID card in the format of an image (JPG, PNG or JPEG)
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="11">
        <v-file-input
          show-size
          label="ID Card"
          v-model="card"
          class="pa-0"
          :rules="[rules.required, rules.fileType]"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row class="form-button-row ma-0">
      <v-btn
        large
        class="form-buttons text-capitalize pa-0"
        color="secondary"
        :loading="submitLoading"
        :disabled="submitLoading"
        @click="handleSubmit"
      >Submit</v-btn>
      <v-btn
        large
        class="form-buttons text-capitalize pa-0"
        color="error"
        style="margin-left: 20px;"
        @click="handleCancel"
      >Cancel</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { postAttachment } from "../apis/attachment";
import { postBooking } from "../apis/booking";
import jsPDF from "jspdf";

export default {
  name: "EventRegistrationForm",
  props: ["eventId", "title", "seatsAvailable"],
  data() {
    return {
      booking: null,
      firstName: null,
      lastName: null,
      email: null,
      mobile: null,
      typeOfBooking: null,
      numOfTickets: 0,
      card: null,
      disableTickets: false,
      submitLoading: false,
      valid: false,
      isFileValid: false,
      fileValidTypes: ["image/jpg", "image/jpeg", "image/png"],
      registrationTypes: [
        { id: "Self", text: "Self" },
        { id: "Group", text: "Group" },
        { id: "Corporate", text: "Corporate" },
        { id: "Others", text: "Others" }
      ],
      rules: {
        required: value => !!value || "required",
        email: value =>
          // eslint-disable-next-line
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "E-mail must be valid",
        numbersOnly: value =>
          (value && /^[0-9]+$/.test(value)) || "Only numbers are allowed",
        tenDigits: value => (value && value.length === 10) || "10 digits only",
        greaterThanOne: value =>
          (value && (this.typeOfBooking === "Self" || value > 1)) ||
          "Value should be greater than 1",
        availableSeats: value =>
          (value && value <= this.seatsAvailable) ||
          `Only ${this.seatsAvailable} tickets are available`,
        fileType: value =>
          (value && this.fileValidTypes.includes(value.type)) ||
          "Invalid file type"
      }
    };
  },
  methods: {
    handleTypeChange() {
      if (this.typeOfBooking === "Self") {
        this.numOfTickets = 1;
        this.disableTickets = true;
      } else this.disableTickets = false;
    },
    async handleSubmit() {
      this.submitLoading = true;
      await this.$refs.registrationForm.validate();
      if (!this.valid) {
        this.submitLoading = false;
        console.log("error");
      } else {
        const data = new FormData();
        data.append("path", this.card);
        postAttachment(data)
          .then(response => {
            console.log(response.data);
            let payload = {
              event: this.eventId,
              registration_type: this.typeOfBooking,
              number_of_tickets: parseInt(this.numOfTickets),
              user: {
                first_name: this.firstName,
                last_name: this.lastName,
                mobile_number: this.mobile,
                email: this.email,
                id_card: response.data.id
              }
            };
            postBooking(payload)
              .then(response2 => {
                this.booking = response2.data;
                var img = new Image();
                img.addEventListener("load", () => {
                  var doc = new jsPDF("landscape");
                  doc.setFontSize(26);
                  doc.text(110, 20, "Event Pass");
                  doc.addImage(img, "JPEG", 15, 30, 270, 100);
                  doc.setFontSize(20);
                  doc.text(
                    15,
                    150,
                    "Event: " + this.booking.event_details.title
                  );
                  doc.text(
                    150,
                    150,
                    "City: " + this.booking.event_details.city
                  );
                  doc.text(
                    15,
                    165,
                    "Name: " +
                      `${this.booking.user_details.first_name} ${this.booking.user_details.last_name}`
                  );
                  doc.text(
                    150,
                    165,
                    "Email: " + this.booking.user_details.email
                  );
                  doc.text(15, 180, "Type: " + this.booking.registration_type);
                  doc.text(
                    150,
                    180,
                    "Seats Booked: " + this.booking.number_of_tickets
                  );
                  doc.text(15, 195, "Amount: " + this.booking.total_amount);
                  doc.save("event_pass.pdf");
                });
                img.src = this.booking.event_details.image_details.image_url;
              })
              .catch(error => {
                console.log(error);
              })
              .finally(() => {
                this.$emit("closeModal");
                this.submitLoading = false;
              });
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.submitLoading = false;
          });
      }
    },
    handleCancel() {
      this.$refs.registrationForm.reset();
      this.$emit("closeModal");
    }
  }
};
</script>

<style scoped>
.registration-form {
  width: 100%;
}

.event-title {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  font-size: 26px;
  color: var(--v-accent-lighten5);
  background-color: var(--v-primary-base);
}

.form-row {
  display: flex;
  align-items: baseline;
  padding: 0px 10px;
}

.form-col {
  padding: 10px 20px;
}

.form-button-row {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-right: 30px;
}

.form-buttons {
  font-size: 16px;
}

.attachment-notes {
  font-size: 14px;
  color: var(--v-secondary-darken1);
  padding-bottom: 0px;
}
</style>