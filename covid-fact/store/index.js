import labels from '~/data/labels.json'
import cure from '~/data/china_cure.json'
import death from '~/data/death_rate.json'

export const state = () => ({
  labels,
  cure,
  death,
  updatedAt: new Date()
})
