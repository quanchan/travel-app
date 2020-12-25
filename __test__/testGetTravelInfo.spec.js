import { getTravelInfo } from '../src/client/js/getTravelInfo'

describe('Testing the get travel info functionality', () => {
    test('Testing the getTravelInfo() function', async() => {
        const data = await expect(getTravelInfo("Chicago", '2020-12-26')) 

        expect(data).toBeTruthy()
    })
})