<template>
  <div>
    <div id="signin" class="backgroundImage">
      <div class="signin-form">
        <h2 class="text-center">Sign in</h2>
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div class="submit text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div class="text-center">
          <small
            >Don't have an account yet?
            <strong>
              <span class="signUp" @click="signUp">Sign Up Now!</span></strong
            >
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router/index";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      console.log(formData);
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    },
    signUp() {
      return router.replace("signup");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/constants/variables.scss";

#signin {
  display: grid;
  place-items: center;
}

.backgroundImage {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/stock_market1.jpg");
}

.signin-form {
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

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid $primary;
  background-color: #eee;
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

.signUp {
  cursor: pointer;
}
</style>