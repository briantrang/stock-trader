<template>
  <div class="navigation">
    <b-navbar>
      <b-navbar-nav>
        <b-navbar-brand>
          <router-link to="/" activeClass="active" tag="li">
            <span class="navText">FAANG Stock Trader</span></router-link
          >
        </b-navbar-brand>
        <b-nav-item v-if="auth">
          <router-link to="/dashboard" activeClass="active" tag="li">
            <a><span class="navText">Dashboard</span></a>
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="auth">
          <router-link to="/portfolio" activeClass="active" tag="li">
            <a><span class="navText">Portfolio</span></a>
          </router-link>
        </b-nav-item>
        <b-nav-item v-if="auth">
          <router-link to="/stocks" activeClass="active" tag="li">
            <a><span class="navText">Stocks</span></a>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout" v-if="auth"
          ><span class="navText">Logout</span></b-nav-item
        >
        <b-nav-item to="/signup" v-if="!auth"
          ><span class="navText">Sign Up</span></b-nav-item
        >
        <b-nav-item to="/signin" v-if="!auth"
          ><span class="navText">
            Sign In
          </span>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
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

<style lang="scss">
.navigation {
  position: sticky;
  top: 0;
  z-index: 1 !important;
  background-color: rgba(0, 0, 0, 0.653);
}
.navText {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>