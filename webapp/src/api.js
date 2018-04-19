import axios from 'axios'
import config from './config/config'
//import _ from 'lodash'

export default {
  getRoute,
  getStation
}

function getRoute (fromStation,toStation,year,month,day,time) {
  const url = `${config.baseUrl}dev/trains/${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`

  return axios.get(url)
    .then(res => {
      console.log(res.data.res.services)
      return res.data.res.services.map(service => {
        return {
          serviceUid: service.serviceUid,
          scheduledTime: service.locationDetail.gbttBookedDeparture,
          estimatedTime: service.locationDetail.realtimeDeparture,
          platform: service.locationDetail.platform,
          platformConfirmed: service.locationDetail.platformConfirmed
        }
      })
    })
    .catch(err => {
      console.error(err)
      throw Error(err)
    })
}
function getStation (station,year,month,day,time) {
  const url = `${config.baseUrl}dev/station/${station}/${year}/${month}/${day}/${time}`

  return axios.get(url)
    .then(res => {
      console.log('Station times:', res.data.res.services)
      return res.data.res.services.map(service => {
        return {
          serviceUid: service.serviceUid,
          scheduledTime: service.locationDetail.gbttBookedArrival,
          estimatedTime: service.locationDetail.realtimeArrival
        }
      })
    })
    .catch(err => {
      console.error(err)
      throw Error(err)
    })
}