<template>
  <v-form ref="registrationForm" v-model="valid" class="registration-form" @submit.prevent>
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
          :rules="[rules.required, rules.greaterThanZero, rules.numbersOnly]"
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
        <br />You can upload your ID card in the format of an image or a PDF
      </v-col>
    </v-row>
    <v-row class="form-row ma-0">
      <v-col cols="11">
        <v-file-input
          show-size
          label="ID Card"
          v-model="card"
          :rules="[rules.required]"
          class="pa-0"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row class="form-button-row ma-0">
      <v-btn
        large
        class="form-buttons text-capitalize pa-0"
        color="success"
        :loading="sumbitLoading"
        :disabled="sumbitLoading"
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
export default {
  name: "EventRegistrationForm",
  props: ["eventId", "title"],
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      mobile: null,
      typeOfBooking: null,
      numOfTickets: null,
      card: null,
      disableTickets: false,
      sumbitLoading: false,
      valid: false,
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
        greaterThanZero: value => (value && value > 10) || "Invalid value"
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
    handleSubmit() {
      this.sumbitLoading = true;
      this.$refs.registrationForm.validate();
      if (!this.valid) {
        this.sumbitLoading = false;
      } else {
        this.$emit("closeModal");
        this.sumbitLoading = false;
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

.event-title {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  font-size: 26px;
  color: var(--v-accent-lighten5);
  background-color: var(--v-primary-base);
}

.attachment-notes {
  font-size: 14px;
  color: var(--v-secondary-darken1);
  padding-bottom: 0px;
}
</style>