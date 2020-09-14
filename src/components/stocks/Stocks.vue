<template>
  <div>
    <h2 class="text-center">Current Wallet: {{ funds | currency }}</h2>
    <div class="row px-3">
      <app-stock
        v-for="stock in stocks"
        :key="stock.id"
        :stock="stock"
      ></app-stock>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Stock from "./Stock.vue";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    funds() {
      return this.$store.getters.funds;
    }
  }
};
</script>
