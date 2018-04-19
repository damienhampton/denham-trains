'use strict'

exports = module.exports

exports.createResponse = (res) => {
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

exports.error = () => {
  console.error(arguments)
}

exports.log = () => {
  console.log(arguments)
}

exports.validateNumber = (number, length) => {
  const str = number.toString()
  if(!str.search(/^[0-9]+$/) === -1  || str.length !== length){
    throw Error('Number fail.')
  }
}