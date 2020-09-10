<template>
  <div class="col-sm-6 col-md-4 p-2">
    <div class="card">
      <div class="card-header bg-dark text-white">
        <h3 class="card-title">
          {{ stock.symbol }}
          <small>(Price: {{ stock.close | currency }})</small>
        </h3>
      </div>
      <div class="card-body">
        <div class="float-left p-1">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model="quantity"
          />
        </div>
        <div class="float-right p-1">
          <button
            class="btn btn-success"
            @click="buyStock"
            :disabled="quantity <= 0 || !Number.isInteger(Number(quantity))"
          >
            Buy
          </button>
        </div>
      </div>
      <p v-if="!enoughFunds" class="text-danger text-center">
        You do not have enough funds to make this purchase!
      </p>
    </div>
  </div>
</template>

<script>
// // @ is an alias to /src
// import axios from "axios";
// import authStore from "../../store/modules/auth";

export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0,
      enoughFunds: true
    };
  },
  methods: {
    buyStock() {
      if (!(this.quantity * this.stock.close > this.$store.getters.funds)) {
        this.enoughFunds = true;
        const order = {
          stockId: this.stock.symbol,
          stockPrice: Number(this.stock.close),
          quantity: Number(this.quantity)
        };
        this.$store.dispatch("buyStock", order);
      } else {
        this.enoughFunds = false;
      }
    }
  }
};
</script>
