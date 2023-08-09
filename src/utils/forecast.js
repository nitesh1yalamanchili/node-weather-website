const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query='+ latitude + ',' + longitude +'&units=f'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to get data', undefined)
        } else if(body.error){
            callback('unable to find loaction', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
} 

module.exports = forecast