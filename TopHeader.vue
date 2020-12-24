<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="primary" class="shadow py-2">
      <b-navbar-brand class="nav-brand" to="/">My Open Tab</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isAuth()" to="/dashboard"
            ><i class="fab fa-dyalog mt-1"></i
          ></b-nav-item>
          <b-nav-item v-if="!isAuth()" to="/register">Register</b-nav-item>
          <b-nav-item v-if="!isAuth()" to="/login">Login</b-nav-item>
          <b-nav-item-dropdown
            class="mt-1"
            v-if="isAuth()"
            v-bind:text="getLoggedInUser()"
            right
          >
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-if="isAdmin()" to="/users"
              >Users</b-dropdown-item
            >
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  methods: {
    isAuth() {
      return this.$store.getters["isAuthenticated"];
    },
    isAdmin() {
      return this.$store.getters["isAdmin"];
    },
    getLoggedInUser() {
      let user = null;
      try {
        user = JSON.parse(this.$store.state.auth.userInfo);
      } catch (error) {
        user = this.$store.state.auth.userInfo;
      }
      return user.firstName + " " + user.lastName;
    },
    logout() {
      return this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.nav-brand {
  font-size: 1.3rem;
}

.fa-th,
.fa-dyalog {
  font-size: 1.4rem;
}
</style>
