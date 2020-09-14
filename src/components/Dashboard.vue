<template>
  <div class="text-center">
    <h1>Hello, {{ name }}</h1>
    <h2>
      Are you ready to see if would've made or lost money today?
    </h2>
    <h2>
      Head on over to the Stocks or Portfolio page to buy/sell stocks using this
      FAANG stock simulator!
    </h2>
    <hr />
    <h2>Your Current Wallet: {{ funds | currency }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  computed: {
    name() {
      return !this.$store.getters.user ? false : this.$store.getters.user.name;
    },
    funds() {
      return this.$store.getters.funds;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>
