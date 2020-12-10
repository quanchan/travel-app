import { handleSubmit } from "../src/client/js/formHandler"

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", async () => {
        const data = await expect(handleSubmit())
        expect(data).toBe(true)
    }) 
})