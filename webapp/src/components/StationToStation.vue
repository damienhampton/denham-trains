<template>
  <div id="train-times" class="my-4">
      <h3>{{ fromStation}} to {{ toStation }}</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(time, n) in times" :key="'time-'+n">
          {{ time.scheduledTime }} <em :class="{'late': isRunningLate(time)}">({{ time.estimatedTime }})</em> <span
            :class="{'platform-confirmed': time.platformConfirmed,
                  'platform-not-confirmed': !time.platformConfirmed }">Plat: {{ time.platform }}</span>
        </li>
      </ul>
  </div>
</template>

<script>
import api from '../api'
import moment from 'moment'
import EventBus from '../EventBus'

export default {
  props: ['fromStation', 'toStation', 'time'],
  data () {
    return {
      times: []
    }
  },
  methods: {
    refresh () {
      console.log('refreshing...', this.toStation)
      const today = moment()
      const year = today.format('YYYY')
      const month = today.format('MM')
      const day = today.format('DD')

      const time = this.time || today.format('HHmm')

      api.getTrainTimes(this.fromStation, this.toStation, year, month, day, time)
        .then(times => {
          EventBus.$emit('refreshDone')
          this.times = times
        })
    },
    isRunningLate(times){
      return times.estimatedTime > times.scheduledTime
    }
  },
  mounted () {
    EventBus.$on('refresh', this.refresh)
    this.refresh()
  }
}
</script>

<style>
h3{
  font-size: 1.1rem;
}
span.platform-confirmed{
  color: green;
}
span.platform-not-confirmed{
  color: red;
}
em.late{
  color: red;
  font-weight: bold;
}
</style>
