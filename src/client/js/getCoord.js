const getCoord = async(location) => {
    try {
        let coord = await fetch("/get-coord", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({location})
        })
        coord = await coord.json()
        return coord
    } catch (err) {
        console.log("Something went wrong getting Coord: ", err)
    }
}
export { getCoord } 