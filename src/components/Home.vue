<template>
  <div>
    <div class="row hero">
      <div class="col-12 col-lg-6">
        <div class="content">
          <div>
            <span class="title">Stock Trading Simulator</span><br />

            <span class="titleSubcontent"
              >Test your strategies(or luck) without any risk!</span
            >
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 ">
        <img
          class="bannerImage"
          src="../assets/Homepage/undraw_invest_88iw.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}
.hero {
  text-align: center;
  background-color: rgb(250, 250, 250);
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
</style>