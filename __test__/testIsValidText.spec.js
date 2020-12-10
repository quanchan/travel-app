import { isValidText } from "../src/client/js/isValidText"

describe("Testing the validate functionality", () => { 
    test("Empty string should return false", () => {
        expect(isValidText('')).toBe(false)
    })

    test("Any string with length should return true", () => {
        expect(isValidText('Hello World')).toBe(true)
    })
})