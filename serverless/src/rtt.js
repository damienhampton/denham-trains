'use strict'
const axios = require('axios')

const baseUrl = 'https://api.rtt.io/api/v1/json/search/'

module.exports = {
  routeWithDateAndTime,
  stationWithDateAndTime,
  validateStation
}

async function routeWithDateAndTime ({fromStation, toStation, year, month, day, time}) {
  const url = `${baseUrl}${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`
  return serviceCall(url)
}

async function stationWithDateAndTime ({station, year, month, day, time}) {
  const url = `${baseUrl}${station}/${year}/${month}/${day}/${time}`
  return serviceCall(url)
}

async function serviceCall(url){
  const res = await axios.get(url, config())
  return res.data
}

function config(){
  return {
    auth: {
      username: process.env.RTT_USER,
      password: process.env.RTT_PASSWORD
    }
  }
}

function validateStation(station){
  const validStations = ['DNM', 'DGC', 'MARYLBN']

  if(validStations.findIndex(vs => vs === station) === -1){
    throw Error(`expecting valid station, but got ${station}`)
  }
}