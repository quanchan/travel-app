const handleSubmit = async(event) => {
    event.preventDefault()
    const location = document.querySelector('#location').value
    const date = document.querySelector('#leaving-date').value
    let travelInfo = await ClientU.getTravelInfo(location, date)
    ClientU.renderUI(travelInfo, date)
}

const submitButton = document.getElementById('submit-button')
submitButton.addEventListener('submit', handleSubmit)

export { handleSubmit }
