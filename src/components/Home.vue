<template>
  <div>
    <section class="row hero">
      <div class="col-12 order-2 col-lg-6 order-lg-1">
        <div class="content">
          <div>
            <span class="title">Stock Trading Simulator</span><br />

            <span class="titleSubcontent"
              >Test your strategies(or luck) without any risk!</span
            >
            <br />
            <div class="button" @click="register">Get Started!</div>
          </div>
        </div>
      </div>
      <div class="col-12 order-1 col-lg-6 order-lg-2">
        <img
          class="bannerImage"
          src="../assets/Homepage/undraw_invest.svg"
          alt=""
        />
      </div>
    </section>
    <section class="mainContent">
      <div class="container text-center">
        <h1>Practice. Strategize. Learn. Have Fun.</h1>
      </div>
      <div class="row text-center">
        <div class="col-12 col-sm-6 centerAll order-2 order-sm-1 p-4">
          <h4>
            With the FAANG stock trading simulator, you can
            <span class="emphasizeText">practice</span> buying and selling FAANG
            stocks without any of the risks.
          </h4>
        </div>
        <div class="col-12 col-sm-6 centerAll order-1 order-sm-2 p-4">
          <img
            class="mainContentImage"
            src="../assets/Homepage/undraw_practice.svg"
            alt=""
          />
        </div>
        <div class="col-12 col-sm-6 centerAll order-4 order-sm-3 p-4">
          <img
            class="mainContentImage"
            src="../assets/Homepage/undraw_strategize.svg"
            alt=""
          />
        </div>
        <div class="col-12 col-sm-6 centerAll order-4 order-sm-3 p-4">
          <h4>
            Test as many methods you desire to find the most optimal stock
            trading strategy that works for you!. Then you can
            <span class="emphasizeText">strategize</span> your way to victory.
          </h4>
        </div>
        <div class="col-12 col-sm-6 centerAll order-6 order-sm-5 p-4">
          <h4>
            If you made a mistake, it's OKAY! You can start over with a new
            account and try again! With the ability to
            <span class="emphasizeText">learn</span> from your mistakes, you'll
            be able to find what works best for you in no time!
          </h4>
        </div>
        <div class="col-12 col-sm-6 centerAll order-5 order-sm-6 p-4">
          <img
            class="mainContentImage"
            src="../assets/Homepage/undraw_learn.svg"
            alt=""
          />
        </div>
        <div class="col-12 centerAll order-7">
          <h2>
            And best of all, you have can
            <span class="emphasizeText">Have Fun</span> while trading stocks!
            <br />
            There's no stress since you aren't using your own or real money.
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router/index";

export default {
  methods: {
    register() {
      return router.replace("/signup");
    }
  }
};
</script>

<style lang="scss">
@import "../constants/variables.scss";

body {
  overflow-x: hidden;
}

.centerAll {
  display: grid;
  place-items: center;
}

.hero {
  text-align: center;
  background-color: rgb(250, 250, 250);
  z-index: 0;
  padding-top: 1.5rem;
  padding-bottom: 3.5rem;
}
.content {
  height: 100%;
  display: grid;
  place-items: center;
}
.title {
  font-size: 3rem;
}
.titleSubcontent {
  font-size: 1.5rem;
}
.bannerImage {
  max-width: 100%;
}
.button {
  margin: 0 auto;
  width: 50%;
  padding: 1rem;
  background-color: $primary;
  border: 1px solid transparent;
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 5px 5px #ccc;
}

.button:hover {
  background-color: white;
  border: 0.1px solid $primary;
  color: $primary;
  transition: all 0.5s ease 0s;
  box-shadow: 5px 5px #ccc;
}

.mainContent {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.mainContentImage {
  width: 100%;
}
.emphasizeText {
  font-weight: bold;
  color: $primary;
}
</style>