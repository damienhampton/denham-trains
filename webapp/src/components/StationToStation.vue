<template>
  <div class="train-times my-4">
      <h3>{{ nameLookUp(fromStation)}} to {{ nameLookUp(toStation) }}</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(service, n) in services" :key="'time-'+n">
          Depart: <span :class="{'late': isDepartingLate(service)}">{{ actualTime(service) }}</span>
          Arrive: <span :class="{'late': isArrivingLate(service)}">{{ displayArrivalTime(service) }}</span> <span
            :class="{'platform-confirmed': service.platformConfirmed,
                  'platform-not-confirmed': !service.platformConfirmed }">Plat: {{ service.platform }}</span>
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
      services: [],
      stationTimes: []
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

      api.getRoute(this.fromStation, this.toStation, year, month, day, time)
        .then(services => {
          this.services = services
          return api.getStation(this.toStation, year, month, day, time)
        })
        .then(stationServices => {
          EventBus.$emit('refreshDone')
          this.stationTimes = stationServices
        })
    },
    isDepartingLate(service){
      return this.isRunningLate(service)
    },
    isArrivingLate(service){
      try{
        return this.isRunningLate(this.getStationDetails(service))
      }catch(err){
        return false
      }
    },
    isRunningLate(service){
      return service.estimatedTime > service.scheduledTime
    },
    displayArrivalTime(service){
      try{
        return this.actualTime(this.getStationDetails(service))
      }catch(err){
        return '-'
      }
    },
    getStationDetails(service){
      return this.stationTimes.filter(stationService => stationService.serviceUid == service.serviceUid).pop()
    },
    actualTime(service){
      const lateBy = this.isLateBy(service.scheduledTime, service.estimatedTime)
      if(service.estimatedTime > service.scheduledTime){
        return this.formatTime(service.estimatedTime)+lateBy
      }
      return this.formatTime(service.scheduledTime)+lateBy
    },
    formatTime(time){
      return time.replace(/^([0-9]{2})([0-9]{2})$/, "$1:$2")
    },
    nameLookUp(short){
      const stationNames = [
        {
          name: 'Marylebone',
          short: 'MARYLBN'
        },
        {
          name: 'Denham',
          short: 'DNM'
        },
        {
          name: 'Denham Golf Club',
          short: 'DGC'
        }
      ]
      try{
        return stationNames.find(station => station.short === short).name
      }catch (err) {
        return 'Daisy'
      }
    },
    isLateBy(scheduled, estimated){
      let scheduledMoment = moment()
      scheduledMoment.set('hour', scheduled.substr(0,2))
      scheduledMoment.set('minute', scheduled.substr(2,4))

      let estimatedMoment = moment()
      estimatedMoment.set('hour', estimated.substr(0,2))
      estimatedMoment.set('minute', estimated.substr(2,4))

      const lateBy = Math.round(moment.duration(estimatedMoment.diff(scheduledMoment)).as('minutes'))
      return lateBy > 0 ? ` (+${lateBy})` : ''
    }
  },
  mounted () {
    EventBus.$on('refresh', this.refresh)
    this.refresh()

    let scheduled = '1843'
    let estimated = '1847'

    console.log('time', this.isLateBy(scheduled, estimated))
  }
}
</script>

<style>
h3{
  font-size: 1.1rem;
}
.train-times li{
  font-size: 1rem;
}
span.platform-confirmed{
  color: green;
}
span.platform-not-confirmed{
  color: red;
}
span.late{
  color: red;
  font-weight: bold;
}
</style>
