<template>
  <div class="page-container">
    <loader v-if="loading" />
    <div class="publish-titlebar">
      <div class="page-title">Add New Event</div>
      <div class="page-buttons-container">
        <v-btn
          large
          color="secondary"
          :loading="submitLoading"
          :disabled="submitLoading"
          style="margin-right: 40px;"
          @click="handleSubmit"
        >Publish</v-btn>
        <v-btn large color="error" @click="dialog2 = true">Cancel</v-btn>
      </div>
    </div>
    <div class="event-publish">
      <v-form ref="eventForm" v-model="valid" class="card">
        <v-col cols="12">
          <v-row class="field-title ma-0" style="padding-bottom: 10px">EVENT TITLE</v-row>
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0">
              <v-text-field
                solo
                v-model="title"
                placeholder="Enter events title..."
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">DESCRIPTION</v-row>
          <v-row class="ma-0">
            <v-col cols="12" style="padding: 10px 0px;">
              <vue-editor
                v-model="description"
                :editor-toolbar="customToolbar"
                placeholder="Enter description here"
                style="background-color: white"
                @blur="checkDescriptionError"
              />
            </v-col>
            <v-row class="field-error ma-0">
              <span v-if="errors.description">required</span>
            </v-row>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0" style="padding-bottom: 10px">LANGUAGES</v-row>
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0">
              <v-select
                solo
                v-model="languages"
                :items="languageList"
                :menu-props="{ maxHeight: '400' }"
                label="Languages"
                item-text="title"
                item-value="id"
                :rules="[rules.listRequired]"
                multiple
                persistent-hint
                hint="Pick languages which would be used in this event"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0" style="padding-bottom: 10px">EVENT TAGS</v-row>
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0">
              <v-select
                solo
                v-model="tags"
                :items="tagList"
                :menu-props="{ maxHeight: '400' }"
                label="Event Tags"
                item-text="title"
                item-value="id"
                :rules="[rules.listRequired]"
                multiple
                persistent-hint
                hint="Pick tags which best describe your event so that customers can find this event more easily"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">EVENT VENUE</v-row>
          <v-row class="ma-0">
            <v-col cols="12" style="padding: 10px 0px;">
              <v-textarea
                solo
                auto-grow
                rows="3"
                v-model="venue"
                :rules="[rules.required]"
                placeholder="Enter the complete address of the venue"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0" style="padding-bottom: 10px">CITY</v-row>
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0">
              <v-text-field
                solo
                v-model="city"
                placeholder="Enter city..."
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="ma-0">
            <v-col cols="5" class="pa-0">
              <v-row class="field-title ma-0" style="padding-bottom: 10px">EVENT DATE AND TIME</v-row>
              <datetime
                v-model="datetime"
                placeholder="Select date-time..."
                type="datetime"
                :min-datetime="getMomentNow"
                use12-hour
                auto
                @close="checkDatetimeError"
              ></datetime>
              <v-row class="field-error ma-0">
                <span v-if="errors.datetime">required</span>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0"></v-col>
            <v-col cols="5" class="pa-0">
              <v-row class="field-title ma-0" style="padding-bottom: 10px">DURATION</v-row>
              <v-text-field
                solo
                v-model="duration"
                :rules="[rules.required]"
                placeholder="Enter duration in hours or minutes..."
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="ma-0">
            <v-col cols="5" class="pa-0">
              <v-row class="field-title ma-0" style="padding-bottom: 10px">NUMBER OF SEATS</v-row>
              <v-text-field
                solo
                v-model="seats"
                type="number"
                :rules="[rules.required, rules.greaterThanZero]"
                placeholder="Enter number of seats..."
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-0"></v-col>
            <v-col cols="5" class="pa-0">
              <v-row class="field-title ma-0" style="padding-bottom: 10px">TICKET PRICE</v-row>
              <v-text-field
                solo
                v-model="price"
                type="number"
                :rules="[rules.required, rules.numberPositive]"
                placeholder="Enter ticket price..."
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="ma-0">
            <v-col cols="5" class="pa-0">
              <v-row
                class="field-title ma-0"
                style="padding-bottom: 10px"
              >REGISTRATION CLOSES BEFORE</v-row>
              <v-row class="ma-0" style="display: flex; align-items: baseline">
                <v-col cols="4" class="pa-0">
                  <v-text-field
                    solo
                    dense
                    v-model="registrationBefore"
                    type="number"
                    :rules="[rules.required, rules.numberPositive]"
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="pa-0" style="margin-left: 10px">days</v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0"></v-col>
            <v-col cols="5" class="pa-0">
              <v-row class="field-title ma-0" style="padding-bottom: 10px">AGE LIMIT</v-row>
              <v-row class="ma-0" style="display: flex; align-items: baseline">
                <v-col cols="4" class="pa-0">
                  <v-text-field
                    solo
                    dense
                    v-model="ageLimit"
                    type="number"
                    :rules="[rules.required, rules.numberPositive]"
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="pa-0" style="margin-left: 10px">years</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0">TERMS & CONDITIONS</v-row>
          <v-row class="ma-0">
            <v-col cols="12" style="padding: 10px 0px;">
              <vue-editor
                v-model="terms"
                :editor-toolbar="customToolbar"
                placeholder="Enter description here"
                style="background-color: white;"
                @blur="checkTermsError"
              />
            </v-col>
            <v-row class="field-error ma-0">
              <span v-if="errors.terms">required</span>
            </v-row>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row class="field-title ma-0" style="padding-bottom: 10px">EVENT IMAGE</v-row>
          <v-row class="ma-0">
            <v-row
              class="field-title ma-0"
              style="padding-bottom: 10px"
            >File with format JPG, PNG or JPEG accepted</v-row>
            <v-col cols="12" class="pa-0">
              <v-file-input
                accept="image/*"
                show-size
                v-model="image"
                :rules="[rules.required, rules.fileType]"
                class="pa-0"
                @change="handleImageChange"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="imageUrl !== null" cols="12">
          <v-row class="ma-0" style="display: flex; justify-content: center;">
            <v-img :src="imageUrl" max-width="400" contain></v-img>
          </v-row>
        </v-col>
      </v-form>
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">ALERT</v-card-title>
          <v-card-text>Check and resolve all the errors before publishing the event</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="350">
        <v-card>
          <v-card-title class="headline">ALERT</v-card-title>
          <v-card-text>Any changes you made will be lost!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="$router.go(-1)">YES</v-btn>
            <v-btn color="error" text @click="dialog2 = false">NO</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar top v-model="snackbar" :timeout="800" color="success">Event Published Successfully</v-snackbar>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { Datetime } from "vue-datetime";
import moment from "moment";
import Loader from "../../components/Loader";
import { getLanguages } from "../../apis/language";
import { getTags } from "../../apis/tag";
import { postAttachment } from "../../apis/attachment";
import { postEvent, getEventDetail, patchEvent } from "../../apis/event";
import "vue-datetime/dist/vue-datetime.css";

export default {
  name: "EventAddEdit",
  props: ["eventId"],
  components: { Loader, VueEditor, datetime: Datetime },
  data() {
    return {
      loading: true,
      title: null,
      description: null,
      languages: [],
      languageList: [],
      tags: [],
      tagList: [],
      venue: null,
      city: null,
      datetime: null,
      duration: null,
      seats: null,
      price: null,
      registrationBefore: null,
      ageLimit: null,
      terms: null,
      image: null,
      imageUrl: null,
      imageId: null,
      submitLoading: false,
      valid: false,
      isFileValid: false,
      fileValidTypes: ["image/jpg", "image/jpeg", "image/png"],
      dialog: false,
      dialog2: false,
      snackbar: false,
      errors: {
        description: false,
        datetime: false,
        terms: false
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"]
      ],
      rules: {
        required: value => !!value || "required",
        listRequired: value => !!value.length || "required",
        numbersOnly: value =>
          (value && /^[0-9]+$/.test(value)) || "Only numbers are allowed",
        greaterThanZero: value =>
          (value && value > 0) || "number should be greater than zero",
        numberPositive: value =>
          (value && value >= 0) || "number should be positive",
        fileType: value =>
          (value &&
            (this.fileValidTypes.includes(value.type) ||
              this.fileValidTypes.includes(value.file_type))) ||
          "Invalid file type"
      }
    };
  },
  computed: {
    getMomentNow() {
      return moment().toISOString();
    }
  },
  created() {
    this.fetchLanguages();
    this.fetchTags();
    if (this.eventId && this.eventId.length) this.fetchEvent();
    else this.loading = false;
  },
  methods: {
    fetchLanguages() {
      getLanguages()
        .then(response => {
          this.languageList = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchTags() {
      getTags()
        .then(response => {
          this.tagList = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchEvent() {
      getEventDetail(this.eventId)
        .then(response => {
          this.title = response.data.title;
          this.description = response.data.description;
          this.languages = response.data.languages;
          this.tags = response.data.tags;
          this.venue = response.data.venue;
          this.city = response.data.city;
          this.datetime = response.data.start_time;
          this.duration = response.data.duration;
          this.seats = response.data.number_of_seats;
          this.price = response.data.cost_per_person;
          this.registrationBefore = response.data.booking_closes_before;
          this.ageLimit = response.data.age_limit;
          this.terms = response.data.terms_and_conditions;
          this.image = response.data.image_details;
          this.imageUrl = response.data.image_details.path;
          this.imageId = response.data.image;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkDescriptionError() {
      if (this.description === null || !this.description.length)
        this.errors.description = true;
      else this.errors.description = false;
    },
    checkDatetimeError() {
      if (this.datetime === null || !this.datetime.length)
        this.errors.datetime = true;
      else this.errors.datetime = false;
    },
    checkTermsError() {
      if (this.terms === null || !this.terms.length) this.errors.terms = true;
      else this.errors.terms = false;
    },
    async checkCustomErrors() {
      await this.checkDescriptionError();
      await this.checkDatetimeError();
      await this.checkTermsError();
      if (this.errors.description || this.errors.datetime || this.errors.terms)
        return true;
      else return false;
    },
    handleImageChange() {
      if (this.image === undefined) this.imageUrl = null;
      else if (this.fileValidTypes.includes(this.image.type)) {
        const data = new FormData();
        data.append("path", this.image);
        postAttachment(data)
          .then(response => {
            this.imageUrl = response.data.path;
            this.imageId = response.data.id;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async handleSubmit() {
      this.submitLoading = true;
      await this.$refs.eventForm.validate();
      const customErrors = await this.checkCustomErrors();
      if (!this.valid || customErrors) {
        this.dialog = true;
        this.submitLoading = false;
      } else {
        this.city =
          this.city.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();
        let payload = {
          title: this.title,
          description: this.description,
          languages: this.languages,
          tags: this.tags,
          venue: this.venue,
          city: this.city,
          start_time: this.datetime,
          duration: this.duration,
          number_of_seats: this.seats,
          cost_per_person: this.price,
          booking_closes_before: this.registrationBefore,
          age_limit: this.ageLimit,
          terms_and_conditions: this.terms,
          image: this.imageId,
          latitude: 4.2,
          longitude: 4.2
        };
        if (this.eventId && this.eventId.length) {
          patchEvent(this.eventId, payload)
            .then(response => {
              this.$router.replace({
                name: "AdminEventDetail",
                params: { eventId: response.data.id }
              });
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        } else {
          postEvent(payload)
            .then(response => {
              this.$router.replace({
                name: "AdminEventDetail",
                params: { eventId: response.data.id }
              });
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        }
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  overflow: hidden;
}
.publish-titlebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 14.15px 30px;
  padding-left: 86px;
  background-color: var(--v-accent-lighten4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.page-title {
  font-size: 26px;
  font-weight: 700;
}

.page-buttons-container {
  display: flex;
  flex-direction: row;
}

.event-publish {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 150px);
  padding: 30px;
  padding-left: 86px;
  margin-top: 2.3px;
  overflow: auto;
}

.card {
  width: 65%;
  height: fit-content;
  padding: 20px 40px;
  background-color: var(--v-card3-base);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.field-title {
  font-size: 13px;
  font-weight: 300;
  color: var(--v-text-lighten4);
}

.field-error {
  font-size: 12px;
  color: var(--v-error-base);
  margin-bottom: 8px;
  padding: 0px 12px;
}
</style>