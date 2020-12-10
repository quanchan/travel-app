function isValidText(inputText) {
    if(!inputText) {
        alert("The text area must not be empty")
        return false
    }
    return true
}

export { isValidText }
