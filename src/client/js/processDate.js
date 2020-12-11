function processDate(coord, date) {
    let leavingDate = Date.parse(date)
    let today = Date.now()
    console.log("Leaving: ", leavingDate)
    console.log("Today: ", today)
    if (leavingDate - today > 604800000) {
        ClientU.getPredictedForecast(coord, date)
    } else {
        ClientU.getPredictedForecast(coord)
    }
}

export { processDate }