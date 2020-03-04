<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">COVID-19 fact</h1>
          <h2 class="subtitle">
            This is the additional information of COVID-19. Data used on the
            site is based on
            <a
              href="https://vdata.nikkei.com/newsgraphics/coronavirus-world-map/"
              >新型コロナ感染 世界マップ</a
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
