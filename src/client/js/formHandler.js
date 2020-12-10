const handleSubmit = async(event) => {
    event.preventDefault()
    let formText = document.getElementById('name').value
    let submitButton = document.getElementById('submit-button')
    formText = {
        txt: formText
    }
    // check whether the text area is empty

    if (!Client.isValidText(formText.txt)) {
        return
    }
    
    console.log("::: Form Submitted :::")
    submitButton.disabled = true

    try {
        let response = await fetch('http://localhost:8080/process-text', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formText)
        })
        console.log("POST response", response)
        response = await fetch('http://localhost:8080/processed-text')
        response = await response.json()
        console.log('This is the response we received: ', response)
        document.getElementById('results').innerHTML = JSON.stringify(response)
        submitButton.disabled = false
    } catch(err) {
        console.log("Something is wrong in handleSubmit: ", err)
    }
}

export { handleSubmit }
