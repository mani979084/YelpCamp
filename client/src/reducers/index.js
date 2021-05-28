import { combineReducers } from 'redux'
import alert from './alert'
import spinner from './spinner'

export default combineReducers({
    alert,
    spinner
})