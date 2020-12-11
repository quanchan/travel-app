const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const fetch = require('node-fetch')
const { env } = require('process')
const { json, text } = require('express')
const { time } = require('console')
const { url } = require('inspector')
dotenv.config()
const app = express()
// Global variables
const PORT = 8081
const BASE_URL_WEATHER_BIT = `https://api.meaningcloud.com/sentiment-2.1`
const BASE_URL_PIXABAY = `https://pixabay.com/api/`
const BASE_URL_GEONAMES = `http://api.geonames.org/postalCodeSearchJSON?`

// Helper functions
fetchGeonames = async(location) => {
    // http://api.geonames.org/postalCodeSearch?placename=&username=quantran12&maxRows=1
    try {
        let url = `${BASE_URL_GEONAMES}placename=${location}&username=${process.env.GEONAMES_USER_NAME}&maxRows=1` 
        let response = await fetch(url)
        data = await response.json()
        console.log(data)
        let {lat, lng} = data.postalCodes[0]
        console.log("lat", lat)
        console.log("lng", lng)
        let coord = {lat, lng}
        return coord 
    } catch (err) {
        console.log("Something is wrong in fetchGeonames",err)
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


app.post('/today-forecast', (req, res) => {
    let data = req.body
    // (async() => {
    //     try {
    //         let toClientData = await requestMeaningCloud(textData)
    //         console.log(toClientData)
    //         res.send()
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    // })()
    
})

app.post('/predicted-forecast', (req, res) => {
    let data = req.body
})

app.post('/get-coord', (req, res) => {
    let data = req.body
    let location = data.location
    console.log("Location received", location);
    (async() => {
        try {
            let coord = await fetchGeonames(location)
            res.send(coord)
        }
        catch(err) {
            console.log(err)
        }
    })()
})
// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})


