const getTravelInfo = async(location, date) => {
    try {
        let response = await fetch("/get-travel-info", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({location, date})
        })
        let travelInfo = await response.json()
        return travelInfo
    } catch (err) {
        console.log("Something went wrong getting Travel Info: ", err)
    }
}
export { getTravelInfo }  