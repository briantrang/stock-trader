<template>
  <div class="text-center">
    <h1>Trade or View your Portfolio</h1>
    <h3>You may save & load your data</h3>
    <h3>Click on 'End Day' to begin a new day</h3>
    <hr />
    <h2>Hello, {{ name }}</h2>
    <h2>Your Current Funds: {{ funds | currency }}</h2>
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
