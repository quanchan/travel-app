import { handleSubmit } from './js/handleSubmit'
import { getTravelInfo } from './js/getTravelInfo'
import { renderUI } from './js/renderUI'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/travel-info.scss'
import logo from './img/tourism.svg'

const logoEle = document.querySelector('.logo')
const myLogo = new Image(32, 32);
myLogo.src = logo
logoEle.appendChild(myLogo)
logoEle.appendChild

export { 
    handleSubmit,
    getTravelInfo,
    renderUI
}
