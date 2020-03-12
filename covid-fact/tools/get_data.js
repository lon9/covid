const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')
const csvSync = require('csv-parse/lib/sync')

const URLS = [
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
]

async function main() {
  if (!fs.existsSync('static/data')) fs.mkdirSync('static/data')
  let md5hash = crypto.createHash('md5')
  md5hash.update('World')
  const worldKey = md5hash.digest('hex')
  const countries = {}
  countries[worldKey] = {}
  const countryNames = ['World']

  for (let i = 0; i < URLS.length; i++) {
    try {
      const res = await axios.get(URLS[i])
      const kind = URLS[i].match(/.*-(.*)\.csv/)[1].toLowerCase()
      const data = csvSync(res.data)
      data.forEach((row, j) => {
        if (i === 0 && j === 0) {
          return fs.writeFileSync(
            'static/data/labels.json',
            JSON.stringify(row.slice(4))
          )
        } else if (j === 0) return
        md5hash = crypto.createHash('md5')
        md5hash.update(row[1], 'binary')
        const country = md5hash.digest('hex')
        const nums = row.slice(4)
        if (!(country in countries)) {
          countries[country] = {}
          countryNames.push(row[1])
        }
        if (!(kind in countries[country]))
          countries[country][kind] = new Array(nums.length).fill(0)
        if (!(kind in countries[worldKey]))
          countries[worldKey][kind] = new Array(nums.length).fill(0)
        nums.forEach((num, k) => {
          const n = Number(num)
          countries[country][kind][k] += n
          countries[worldKey][kind][k] += n
        })
      })
    } catch (err) {
      console.error(err)
    }
    for (const k in countries) {
      fs.writeFileSync(`static/data/${k}.json`, JSON.stringify(countries[k]))
    }
    fs.writeFileSync('static/data/countries.json', JSON.stringify(countryNames))
  }
}

main()
