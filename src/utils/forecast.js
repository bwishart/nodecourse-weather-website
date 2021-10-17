request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f73880528b92d8c4479b638d90ca4789&query=' + latitude + ',' + longitude 

    request({url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location. Info: ' + body.error.info)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees.')
        }
    })

}

module.exports = forecast