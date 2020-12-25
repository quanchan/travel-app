const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const fetch = require('node-fetch')
const { json, text, response } = require('express')
const { time } = require('console')
const { url } = require('inspector')
const { promises } = require('dns')
dotenv.config()
const app = express()
// Global variables
const PORT = 8081
const BASE_URL_WEATHER_BIT = `https://api.weatherbit.io/v2.0/forecast/daily?`
const BASE_URL_PIXABAY = `https://pixabay.com/api/?`
const BASE_URL_GEONAMES = `http://api.geonames.org/postalCodeSearchJSON?`

// Helper functions
// Get the coordinate from Geonames then use that coordinate to get weather data from Weatherbit
const getCoordThenWeather = async (location, date) => { 
    try {
        let coord = await fetchGeonames(location)
        let weatherData = await processDate(date, coord)
        return weatherData
    }
    catch(err) {
        console.log(err)
    }
}
// Calculate how many days from the current date to leaving date then use that number of days
const processDate = async (date, coord) => {
    try {
        let leavingDate = Date.parse(date)
        let today = Date.now()
        daysToGet = Math.ceil((leavingDate - today) / 86400000 )
        let data = await fetchWeatherBit(coord, daysToGet)
        let {max_temp, min_temp, weather} = data
        let weatherData = {max_temp, min_temp, weather}
        return weatherData
    } catch(err) {
        console.log("Something is wrong in processDate", err)
    }    
}

// Get coordinate from Geonames using a location string name
const fetchGeonames = async(location) => {
    try {
        let url = `${BASE_URL_GEONAMES}placename=${encodeURI(location)}&username=${process.env.GEONAMES_USER_NAME}&maxRows=1`
        let response = await fetch(url)
        let data = await response.json()
        let {lat, lng} = data.postalCodes[0]
        let coord = {lat, lng}
        return coord 
    } catch (err) {
        console.log("Something is wrong in fetchGeonames",err)
    }
}
// Get weather data from Weatherbit using coordinate and number of day
const fetchWeatherBit = async(coord, dayToGet) => {
    try {
        let url = `${BASE_URL_WEATHER_BIT}&lat=${coord.lat}&lon=${coord.lng}&days=${dayToGet}&key=${process.env.WEATHER_BIT_API_KEY}`
        let response = await fetch(url)
        let data = await response.json()
        return data.data[data.data.length - 1]
    } catch (err) {
        console.log("Something is wrong in fetchWeatherBit", err)
    }
}

// Get picture link from Pixabay using location String
const fetchPixabay = async(location) => { 
    try {
        let url = `${BASE_URL_PIXABAY}key=${process.env.PIXABAY_API_KEY}&q=${location}&image_type=photo&category=travel`
        let response = await fetch(url)
        let data = await response.json()
        let picSrc = data.hits[0].webformatURL
        return picSrc
    } catch (err) {
        console.log("Something is wrong in fetchPixabay", err)
    }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})




app.post('/get-travel-info', async (req, res) => {
    let data = req.body
    let location = data.location
    let date = data.date
    console.log("Location received", location);
    console.log("Date received", date);
    // Make two fetching process run together to save time
    let promises = [fetchPixabay(location), getCoordThenWeather(location, date)]
    let toClientData = await Promise.all(promises)
    console.log("toClientData: ", toClientData)
    toClientData = JSON.stringify(toClientData)
    res.send(toClientData)
    
})
// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})


