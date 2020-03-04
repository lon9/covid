<template>
  <div class="container">
    <p class="is-size-4">Cure rate (China)</p>
    <p></p>
    <BarChart :data="cureData" :options="cureOptions" />
    <p class="is-size-4">Death rate (World)</p>
    <BarChart :data="deathData" :options="cureOptions" />
  </div>
</template>
<script>
import BarChart from '~/components/BarChart'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      cureOptions: {
        scales: {
          yAxes: [
            {
              id: 'rate',
              type: 'linear',
              position: 'left',
              ticks: {
                max: 1,
                min: 0
              }
            },
            {
              id: 'num',
              type: 'linear',
              position: 'right'
            }
          ]
        }
      }
    }
  },
  computed: {
    deathData() {
      return {
        datasets: [
          {
            label: 'death rate (death/infected)',
            yAxisID: 'rate',
            data: this.$store.state.death.map((v) => {
              return v.rate
            }),
            backgroundColor: 'rgba(93, 12, 12)'
          },
          {
            label: 'death',
            yAxisID: 'num',
            data: this.$store.state.death.map((v) => {
              return v.death
            }),
            backgroundColor: 'rgba(172, 7, 15)'
          },
          {
            label: 'infected',
            yAxisID: 'num',
            data: this.$store.state.death.map((v) => {
              return v.infected
            }),
            backgroundColor: 'rgba(255, 0, 0)'
          }
        ],
        labels: this.$store.state.labels
      }
    },
    cureData() {
      return {
        datasets: [
          {
            label: 'cure rate (cured/infected)',
            yAxisID: 'rate',
            data: this.$store.state.cure.map((v) => {
              return v.rate
            }),
            backgroundColor: 'rgba(73, 45, 93)'
          },
          {
            label: 'cured',
            yAxisID: 'num',
            data: this.$store.state.cure.map((v) => {
              return v.cured
            }),
            backgroundColor: 'rgba(104, 119, 177)'
          },
          {
            label: 'infected',
            yAxisID: 'num',
            data: this.$store.state.cure.map((v) => {
              return v.infected
            }),
            backgroundColor: 'rgba(133, 200, 255)'
          }
        ],
        labels: this.$store.state.labels
      }
    }
  }
}
</script>
