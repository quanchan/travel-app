import { handleSubmit } from './js/formHandler'
import { processDate } from './js/processDate' 
import { getPredictedForecast, getTodayForecast } from './js/getForecast'
import { getCoord } from './js/getCoord'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

export { 
    processDate,
    handleSubmit,
    getPredictedForecast,
    getTodayForecast,
    getCoord
}
