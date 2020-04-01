<template>
  <div class="container">
    <div class="select">
      <select v-model="country" @change="fetchData">
        <option v-for="ctr in countries" :key="ctr">
          {{ ctr }}
        </option>
      </select>
    </div>
    <p class="is-size-4">Actual numbers</p>
    <BarChart :chart-data="data1" :options="chart1Option" />
    <p class="is-size-4">Percentage</p>
    <BarChart :chart-data="data2" :options="chart2Option" />
    <p class="is-size-4">Death rate in closed cases</p>
    <BarChart :chart-data="data3" :options="chart3Option" />
  </div>
</template>
<script>
import crypto from 'crypto'
import BarChart from '~/components/BarChart'
export default {
  components: {
    BarChart
  },
  async asyncData() {
    const md5hash = crypto.createHash('md5')
    md5hash.update('World')
    const data = await import(`~/assets/data/${md5hash.digest('hex')}.json`)
    return {
      countries: require('~/assets/data/countries.json'),
      labels: require('~/assets/data/labels.json'),
      data
    }
  },
  data() {
    return {
      country: 'World',
      chart1Option: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ]
        }
      },
      chart2Option: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      chart3Option: {
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    data1() {
      return {
        datasets: [
          {
            label: 'Deaths',
            data: this.data.deaths,
            backgroundColor: 'rgba(187, 222, 251, 1)'
          },
          {
            label: 'Recovered',
            data: this.data.recovered,
            backgroundColor: 'rgba(132, 194, 248, 1)'
          },
          {
            label: 'Struggling',
            data: this.data.confirmed.map((conf, i) => {
              return conf - this.data.deaths[i] - this.data.recovered[i]
            }),
            backgroundColor: 'rgba(66, 165, 245, 1)'
          }
        ],
        labels: this.labels
      }
    },
    data2() {
      return {
        datasets: [
          {
            label: 'Deaths',
            data: this.data.confirmed.map((conf, i) => {
              return (this.data.deaths[i] / conf) * 100
            }),
            backgroundColor: 'rgba(187, 222, 251, 1)'
          },
          {
            label: 'Recovered',
            data: this.data.confirmed.map((conf, i) => {
              return (this.data.recovered[i] / conf) * 100
            }),
            backgroundColor: 'rgba(132, 194, 248, 1)'
          },
          {
            label: 'Struggling',
            data: this.data.confirmed.map((conf, i) => {
              return (
                ((conf - this.data.deaths[i] - this.data.recovered[i]) / conf) *
                100
              )
            }),
            backgroundColor: 'rgba(66, 165, 245, 1)'
          }
        ],
        labels: this.labels
      }
    },
    data3() {
      return {
        datasets: [
          {
            label: 'Deaths/(Deaths+Recovered)',
            data: this.data.confirmed.map((conf, i) => {
              return (
                (this.data.deaths[i] /
                  (this.data.deaths[i] + this.data.recovered[i])) *
                100
              )
            }),
            backgroundColor: 'rgba(187, 222, 251, 1)'
          }
        ],
        labels: this.labels
      }
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      const md5hash = crypto.createHash('md5')
      md5hash.update(this.country)
      this.data = await import(`~/assets/data/${md5hash.digest('hex')}.json`)
    }
  }
}
</script>
