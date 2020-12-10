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
const PORT = 8080
const BASE_URL = `https://api.meaningcloud.com/sentiment-2.1`
let toClientData = {}


// Helper functions

let requestMeaningCloud = async (data) => {
    let url=`${BASE_URL}?key=${process.env.API_KEY}&lang=en&txt=${encodeURI(data)}`
    try {
        let response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        })
        let apiData = await response.json()
        console.log('api data: ', apiData)
        toClientData.agreement = apiData.agreement
        toClientData.subjectivity = apiData.subjectivity
        toClientData.irony = apiData.irony
        toClientData.text = apiData.sentence_list[0].text
        return toClientData
    } catch(err) {
        console.log("Something is wrong in requestMeaningCload: ", err)
    }
} 

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/processed-text', (req, res) => {
    console.log("Data will be sent to client: ", toClientData)
    res.send(toClientData)
})

app.post('/process-text', (req, res) => {
    let data = req.body
    let textData = data.txt
    console.log('Text data: ', textData);
    (async() => {
        try {
            let toClientData = await requestMeaningCloud(textData)
            console.log(toClientData)
            res.send()
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


