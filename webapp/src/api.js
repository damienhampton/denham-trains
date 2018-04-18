import axios from 'axios'
import config from './config/config'
//import _ from 'lodash'

export default {
  getTrainTimes
}

function getTrainTimes (fromStation,toStation,year,month,day,time) {
  const url = `${config.baseUrl}dev/trains/${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`

  return axios.get(url)
    .then(res => {
      console.log(res.data.res.services)
      return res.data.res.services.map(service => {
        return {
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