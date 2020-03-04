const fs = require('fs')
const axios = require('axios')

const URL =
  'https://vdata.nikkei.com/newsgraphics/coronavirus-world-map/data/data.tsv'

function tsvJSON(tsv) {
  const lines = tsv.split('\n')
  const headers = lines.slice(0, 1)[0].split('\t')
  return lines.slice(1, lines.length).map((line) => {
    const data = line.split('\t')
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index]
      return obj
    }, {})
  })
}

async function main() {
  const labels = []
  const chinaCure = []
  const deathRate = []

  try {
    const res = await axios.get(URL)
    const data = tsvJSON(res.data).slice(1)
    data.forEach((elem) => {
      labels.push(elem[''])
      chinaCure.push({
        day: elem[''],
        infected: elem['中国本土の感染者数'],
        cured: elem['中国本土の退院・治癒'],
        rate:
          Number(elem['中国本土の退院・治癒']) /
          Number(elem['中国本土の感染者数'])
      })
      deathRate.push({
        day: elem[''],
        infected: elem['世界全体の感染者'],
        death: elem['世界の死者数'],
        rate: Number(elem['世界の死者数']) / Number(elem['世界全体の感染者'])
      })
    })
    fs.writeFileSync('data/labels.json', JSON.stringify(labels))
    fs.writeFileSync('data/china_cure.json', JSON.stringify(chinaCure))
    fs.writeFileSync('data/death_rate.json', JSON.stringify(deathRate))
  } catch (err) {
    console.error(err)
  }
}

main()
