const handleSubmit = async(event) => {
    event.preventDefault()
    const location = document.querySelector('#location').value
    const date = document.querySelector('#leaving-date').value
    // console.log("Date: ",date)
    // console.log("Destination", destination)
    
    let coord = await ClientU.getCoord(location)
    console.log(coord)
    ClientU.processDate(date)
}
export { handleSubmit }
