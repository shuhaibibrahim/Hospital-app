import { DOC_LOGIN, DOC_LOGOUT } from './doctor/docActionTypes.js'
import { PAT_LOGIN } from './patient/patActionTypes.js'
import { PAT_LOGOUT } from './patient/patActionTypes.js'

// const initialState={
//     docLoggedIn: 'NO',
//     patLoggedIn: 'NO'
// }
const initialState={
    loggedIn: 'NULL',
    user: 'NULL',
    name:'NULL',
}

const loginReducer=(state=initialState, action)=>{

    switch(action.type){
        case DOC_LOGIN: return {
            ...state,
            loggedIn:'DOC',
            user: action.user,
            name: action.name
        }
        case PAT_LOGIN: return {
            ...state,
            loggedIn: 'PAT',
            user: action.user,
            name: action.name
        }
        case PAT_LOGOUT: return {
            ...state,
            loggedIn: 'NULL',
        }
        case DOC_LOGOUT: return {
            ...state,
            loggedIn: 'NULL',
        }
        default: return state;
    }

}

export default loginReducer;