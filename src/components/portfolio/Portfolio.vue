<template>
  <div>
    <h2 class="text-center">
      Total Portfolio Value: {{ totalPortfolioValue | currency }} | Current
      Wallet {{ funds | currency }}
    </h2>
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
// import { mapGetters } from "vuex";
import Stock from "./Stock.vue";
export default {
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    },
    totalPortfolioValue() {
      let totalValue = 0;
      this.stocks.map(index => {
        totalValue += index.price * index.quantity;
      });
      return totalValue;
    },
    funds() {
      return this.$store.getters.funds;
    }
  },
  components: {
    appStock: Stock
  }
};
</script>
