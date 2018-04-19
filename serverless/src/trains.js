'use strict';

module.exports = {
  routeWithDateAndTime: route.routeWithDateAndTime,
  stationWithDateAndTime
}

async function stationToStationWithDateAndTime (event, context, callback) {

  try{
    validateInput(event)
  } catch(err) {
    utils.error({ err, event })
    return callback(err, { event })
  }

  const fromStation = event.pathParameters.fromStation
  const toStation = event.pathParameters.toStation
  const year = event.pathParameters.year
  const month = event.pathParameters.month
  const day = event.pathParameters.day
  const time = event.pathParameters.time

  let res = null
  try{
    res = await checkTimesFromStationToStation(fromStation, toStation, year, month, day, time)
  } catch(err) {
    utils.error({ err, event })
    return callback(err, { event })
  }

  callback(null, createResponse(res));
};

async function stationWithDateAndTime (event, context, callback) {

  try{
    validateInput(event)
  } catch(err) {
    return callback(err, { event })
  }

  const station = event.pathParameters.station
  const year = event.pathParameters.year
  const month = event.pathParameters.month
  const day = event.pathParameters.day
  const time = event.pathParameters.time

  let res = null
  try{
    res = await checkTimesStation(station, year, month, day, time)
  } catch(err) {
    return callback(err, { event })
  }

  callback(null, createResponse(res));
};

function createResponse(res){
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
    },
    body: JSON.stringify({
      res
    }),
  }
}

function validateStationToStationInput(event){
  const validStations = ['DNM', 'DGC', 'MARYLBN']
  const validTimes = ['0750', '1800']

  try{
    if(validStations.findIndex(station => station === event.pathParameters.fromStation) === -1){
      throw Error(`expecting valid station, but got ${event.pathParameters.fromStation}`)
    }
    if(validStations.findIndex(station => station === event.pathParameters.toStation) === -1){
      throw Error(`expecting valid station, but got ${event.pathParameters.toStation}`)
    }
    if(event.pathParameters.year !== '2018'){
      throw Error('expecting 2018')
    }
    // if(event.pathParameters.month !== '04'){
    //   throw Error('expecting 04')
    // }
    // if(event.pathParameters.day !== '17'){
    //   throw Error('expecting 17')
    // }
    // if(event.pathParameters.time !== '1800'){
    //   throw Error('expecting 1800')
    // }
    return true
  } catch (err) {
    console.error('Input was bad', err)
    throw Error(err)
  }
}


async function checkTimesFromStationToStation(fromStation, toStation, year, month, day, time){

  const url = `https://api.rtt.io/api/v1/json/search/${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`
  console.log(url)
  const config = {
    auth: {
      username: process.env.RTT_USER,
      password: process.env.RTT_PASSWORD
    }
  }

  const res = await axios.get(url, config)
  console.log(res.data)
  return res.data
}

async function checkTimesStation(station, year, month, day, time){

  const url = `https://api.rtt.io/api/v1/json/search/${fromStation}/to/${toStation}/${year}/${month}/${day}/${time}`
  console.log(url)
  const config = {
    auth: {
      username: process.env.RTT_USER,
      password: process.env.RTT_PASSWORD
    }
  }

  const res = await axios.get(url, config)
  console.log(res.data)
  return res.data
}


