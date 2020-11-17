import { createStore } from 'redux'
import loginReducer  from './loginReducer'

const store = createStore(loginReducer);

export default store;