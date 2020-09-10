<template>
  <div class="col-sm-6 col-md-4 p-2">
    <div class="card">
      <div class="card-header bg-dark text-white">
        <h3 class="card-title">
          {{ stock.symbol }}
          <small
            >(Price: {{ stock.price | currency }}) | Quantity:
            {{ stock.quantity }}</small
          >
        </h3>
        <p>
          Total stock value: {{ (stock.price * stock.quantity) | currency }}
        </p>
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
            class="btn btn-danger"
            @click="sellOwnedStock"
            :disabled="quantity <= 0 || !Number.isInteger(Number(quantity))"
          >
            Sell
          </button>
        </div>
      </div>
      <p v-if="!enoughQuantity" class="text-danger text-center">
        You do not own enough of {{ this.stock.symbol }} to sell.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0,
      enoughQuantity: true
    };
  },
  methods: {
    ...mapActions(["sellStock"]),
    sellOwnedStock() {
      if (Number(this.quantity) <= Number(this.stock.quantity)) {
        const order = {
          stockId: this.stock.symbol,
          stockPrice: Number(this.stock.price),
          quantity: Number(this.quantity)
        };
        this.sellStock(order);
        this.quantity(0);
      } else {
        this.enoughQuantity = false;
      }
    }
  }
};
</script>
