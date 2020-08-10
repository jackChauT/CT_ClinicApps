import { combineReducers } from 'redux'
import userReducer from './userReducer'
import consultationReducer from './consultationReducer'

export default combineReducers({
    userReducer,
    consultationReducer
})