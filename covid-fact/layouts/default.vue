<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">COVID-19 fact</h1>
          <h2 class="subtitle">
            This page shows the transition of the number of infected,
            struggling, recovered, and deaths all over the world, and also shows
            it as its percentage.<br />
            The data based on
            <a href="https://github.com/CSSEGISandData/COVID-19"
              >2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by
              Johns Hopkins CSSE</a
            ><br />
            Updated at {{ updatedAt }}
          </h2>
        </div>
      </div>
    </section>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    updatedAt() {
      return this.$store.state.updatedAt
    }
  }
}
</script>
