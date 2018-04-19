const rtt = require('./rtt')
const utils = require('./utils')

module.exports = {
  routeWithDateAndTime
}

async function routeWithDateAndTime (event, context, callback) {

  try{
    validateInput(event.pathParameters)
  } catch(err) {
    utils.error('Could not validate input', err, event.pathParameters)
    return callback(err, '')
  }

  let res = null

  try{
    res = await rtt.routeWithDateAndTime(event.pathParameters)
  } catch(err) {
    utils.error('RTT request failed', err, event.pathParameters)
    return callback(err, '')
  }

  callback(null, utils.createResponse(res));
};

function validateInput({fromStation, toStation, year, month, day, time}){
  rtt.validateStation(fromStation)
  rtt.validateStation(toStation)
  utils.validateNumber(year, 4)
  utils.validateNumber(month, 2)
  utils.validateNumber(day, 2)
  utils.validateNumber(time, 4)
}
