<template>
  <b-navbar>
    <b-navbar-nav>
      <b-navbar-brand>
        <router-link to="/" activeClass="active"
          >FAANG Stock Trader</router-link
        >
      </b-navbar-brand>
      <b-nav-item v-if="auth">
        <router-link to="/portfolio" activeClass="active" tag="li">
          <a>Portfolio</a>
        </router-link>
      </b-nav-item>
      <b-nav-item v-if="auth">
        <router-link to="/stocks" activeClass="active" tag="li">
          <a>Stocks</a>
        </router-link>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item @click="logout" v-if="auth">Logout</b-nav-item>
      <b-nav-item to="/signup" v-if="!auth">Sign Up</b-nav-item>
      <b-nav-item to="/signin" v-if="!auth">Sign In</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData"
    }),
    logout() {
      this.$store.reset();
      this.$store.dispatch("logout");
    }
  }
};
</script>
