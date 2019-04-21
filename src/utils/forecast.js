const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/5a7df5b03e659dadb14c521926a6bfad/${lat},${long}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No network connection', undefined)
        } else if (body.error) {
            callback(response.body.error, undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precProb: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast