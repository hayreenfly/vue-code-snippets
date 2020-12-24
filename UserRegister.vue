<template>
  <div class="container">
    <b-form @submit.prevent="userCreate">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="2"
          label="CREATE USER"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="First Name:"
            label-align-sm="right"
            label-for="first-name"
          >
            <b-form-input
              placeholder="Enter first name"
              v-model.trim="$v.firstName.$dirty"
              :class="{
                'is-invalid': $v.firstName.$error,
                'is-valid': !$v.firstName.$invalid,
              }"
            ></b-form-input>
            <small class="invalid-feedback" v-if="!$v.firstName.required"
              >First name is required!</small
            >
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Last Name:"
            label-align-sm="right"
            label-for="last-name"
          >
            <b-form-input
              placeholder="Enter last name"
              v-model.trim="$v.lastName.$model"
              :class="{
                'is-invalid': $v.lastName.$error,
                'is-valid': !$v.lastName.$invalid,
              }"
            ></b-form-input>
            <small class="invalid-feedback" v-if="!$v.lastName.required"
              >Last name is required!</small
            >
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Email:"
            label-align-sm="right"
            label-for="email"
          >
            <b-form-input
              placeholder="Enter email"
              v-model.trim="$v.email.$model"
              :class="{
                'is-invalid': $v.email.$error,
                'is-valid': !$v.email.$invalid,
              }"
            ></b-form-input>
            <small class="invalid-feedback" v-if="!$v.lastName.required"
              >Please input a valid email!</small
            >
          </b-form-group>

          <b-form-group
            label-align-sm="right"
            label-cols-sm="3"
            label="Phone Number:"
            label-for="phone-number"
          >
            <b-form-input
              type="tel"
              placeholder="(XXX)-XXX-XXXX"
              v-model.trim="phoneNumber"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-align-sm="right"
            label-cols-sm="3"
            label="Date of Birth:"
            label-for="date-of-birth"
          >
            <b-form-input type="date" v-model="dateOfBirth"></b-form-input>
          </b-form-group>

          <b-form-group
            label-align-sm="right"
            label-cols-sm="3"
            label="Address:"
            label-for="address"
          >
            <b-form-input
              type="text"
              placeholder="Enter Street"
              v-model.trim="street"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="Enter City"
              class="mt-3"
              v-model.trim="city"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="Enter State"
              class="mt-3"
              v-model.trim="state"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="Enter Postal Code"
              class="mt-3"
              v-model.trim="postalCode"
            ></b-form-input>
            <b-form-input
              type="text"
              placeholder="Enter Country"
              class="mt-3"
              v-model.trim="country"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-align-sm="right"
            label-cols-sm="3"
            label="Permissions:"
            label-for="permissions"
          >
            <b-form-select v-model="isAdmin" :options="options"></b-form-select>
          </b-form-group>

          <b-form-group label-cols-sm="3" label-align-sm="right">
            <b-button variant="danger" class="my-3" type="submit"
              >Create User</b-button
            >
          </b-form-group>
        </b-form-group>
      </b-card>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../router";

import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "UserRegister",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      dateOfBirth: null,
      street: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
      isAdmin: 0,
      options: [
        { value: 0, text: "User" },
        { value: 1, text: "Admin" },
      ],
      token: null,
    };
  },
  validations: {
    firstName: {
      required,
      alpha,
      $dirty: false,
    },
    lastName: {
      required,
      alpha,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    async userCreate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch({
            type: "createUser",
            payload: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phoneNumber: this.phoneNumber,
              dateOfBirth: this.dateOfBirth,
              address: {
                street: this.street,
                city: this.city,
                state: this.state,
                postalCode: this.postalCode,
                country: this.country,
              },
              isAdmin: this.isAdmin,
              token: this.token,
            },
          })
          .then((res) => {
            console.log(res);
            Vue.notify({
              type: "success",
              title: "Create Success",
              text: res,
            });

            router.push("/dashboard");
          })
          .catch((error) => {
            Vue.notify({
              type: "error",
              title: "Create Failed",
              text: error,
            });
          });
      }
    },
  },
  mounted() {
    this.token = this.$store.state.auth.userInfo.token;
  },
};
</script>

<style scoped></style>
