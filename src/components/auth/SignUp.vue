<template>
  <div id="signup" class="backgroundImage">
    <div class="signup-form">
      <h2 class="text-center">Sign up</h2>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="name">Name</label>
          <input id="name" v-model="name" />
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
          />
        </div>

        <div class="submit text-center">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="text-center">
        <small
          >Already registered?
          <strong>
            <span class="signIn" @click="signIn">Log In Now!</span></strong
          >
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authStore from "../../store/modules/auth";
import router from "../../router/index";

export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        id: null,
        email: this.email,
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      console.log(formData);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("name", formData.name);
      this.$store.dispatch("signup", formData);

      let data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks,
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
      };
      setTimeout(() => {
        axios
          .patch(
            "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
              localStorage.getItem("userId") +
              ".json" +
              "?auth=" +
              authStore.state.idToken,
            data
          )
          .then(response => console.log("saved data:" + response.data));
      }, 1500);
    },
    signIn() {
      return router.replace("/signin");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/constants/variables.scss";

.backgroundImage {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/stock_market1.jpg");
}

#signup {
  display: grid;
  place-items: center;
}
.signup-form {
  @media (max-width: $breakpoint-sm) {
    width: 350px;
  }
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0px 20px #fff;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid $primary;
  background-color: #fff;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid $primary;
  background-color: $primary;
  color: white;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: white;
  color: $primary;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #fff;
  background-color: transparent;
  color: $primary;
  cursor: not-allowed;
}

.signIn {
  cursor: pointer;
}
</style>