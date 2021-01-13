import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import patientReducer from './patientReducer'

const rootReducer =  combineReducers({
    login: loginReducer,
    patient: patientReducer
})

export default rootReducer;