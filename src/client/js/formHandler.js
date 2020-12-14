const handleSubmit = async(event) => {
    event.preventDefault()
    const location = document.querySelector('#location').value
    const date = document.querySelector('#leaving-date').value
    // console.log("Date: ",date)
    // console.log("Destination", destination)
    let travelInfo = await ClientU.getTravelInfo(location, date)
    // console.log("Travel Info", travelInfo)
    ClientU.renderUI(travelInfo, date)
}
export { handleSubmit }
