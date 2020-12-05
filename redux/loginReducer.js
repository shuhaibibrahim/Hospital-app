import { DOC_LOGIN } from './doctor/docActionTypes.js'
import { PAT_LOGIN } from './patient/patActionTypes.js'

// const initialState={
//     docLoggedIn: 'NO',
//     patLoggedIn: 'NO'
// }
const initialState={
    loggedIn: 'NULL',
    user: 'NULL'
}

const loginReducer=(state=initialState, action)=>{

    switch(action.type){
        case DOC_LOGIN: return {
            ...state,
            loggedIn:'DOC',
            user: action.user
        }
        case PAT_LOGIN: return {
            ...state,
            loggedIn: 'PAT',
            user: action.user
        }
        default: return state;
    }

}

export default loginReducer;