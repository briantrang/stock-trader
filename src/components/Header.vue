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

    <b-navbar-nav class="ml-auto" v-if="auth">
      <b-nav-item-dropdown text="Save & Load">
        <b-dropdown-item @click="saveData">Save Data</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item @click="logout">Logout</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/signup" v-if="!auth">Sign Up</b-nav-item>
      <b-nav-item to="/signin" v-if="!auth">Sign In</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import axios from "axios";
import authStore from "../store/modules/auth";

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
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks,
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
      };
      axios
        .patch(
          "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            ".json" +
            "?auth=" +
            authStore.state.idToken,
          data
        )
        .then(response => console.log("saved data:" + response.data))
        .error(error => console.log(error));
    }
  }
};
</script>
