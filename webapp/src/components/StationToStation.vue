<template>
  <div id="app">
    <h2>{{ fromStation}} to {{ toStation }}</h2>
    <ul class="list-group">
      <li class="list-group-item" v-for="(time, n) in times" :key="'time-'+n">
        {{ time.scheduledTime }} <em>({{ time.estimatedTime }})</em>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../api'
import moment from 'moment'

export default {
  props: ['fromStation', 'toStation', 'time'],
  data () {
    return {
      times: []
    }
  },
  mounted () {
    const today = moment()
    const year = today.format('YYYY')
    const month = today.format('MM')
    const day = today.format('DD')

    const time = this.time || today.format('HHmm')

    api.getTrainTimes(this.fromStation, this.toStation, year, month, day, time)
      .then(times => {
        this.times = times
      })
  }
}
</script>

<style>

</style>
