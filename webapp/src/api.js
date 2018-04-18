import axios from 'axios'
//import _ from 'lodash'

export default {
  getTrainTimes
}

function getTrainTimes (fromStation,toStation,year,month,day,time) {
  const url = `https://i7y9a1zu90.execute-api.eu-west-1.amazonaws.com/dev/trains/${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`

  return axios.get(url)
    .then(res => {
      return res.data.res.services.map(service => {
        return {
          scheduledTime: service.locationDetail.gbttBookedDeparture,
          estimatedTime: service.locationDetail.realtimeDeparture
        }
      })
    })
    .catch(err => {
      console.error(err)
      throw Error(err)
    })
}