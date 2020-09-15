<template>
  <div id="signup">
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

        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
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

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
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
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}

.signIn {
  cursor: pointer;
}
</style>