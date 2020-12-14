export const renderUI = (travelInfo, date) => {
    const picSrc = travelInfo[0]
    const {max_temp, min_temp, weather} = travelInfo[1]
    const description = weather.description 
    const imageEle = document.querySelector('#image-result')
    const dateEle = document.querySelector('#date-result')
    const weatherEle = document.querySelector('#weather-result')
    imageEle.innerHTML = `<img id="location-picture" src="${picSrc}" alt="Your travel location">`
    dateEle.innerHTML = 'Leaving Date: ' + date
    weatherEle.innerHTML = 
    `<p>
        Typical Weather for then is: <br>
        High: ${max_temp} Low: ${min_temp}<br>
        ${description}
    </p>`
    
}


