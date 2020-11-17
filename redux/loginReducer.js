import { DOC_LOGIN } from './doctor/docActionTypes.js'
import { PAT_LOGIN } from './patient/patActionTypes.js'

const initialState={
    docLoggedIn: 'NO',
    patLoggedIn: 'NO'
}

const loginReducer=(state=initialState, action)=>{

    switch(action.type){
        case DOC_LOGIN: return {
            ...state,
            docLoggedIn:'YES'
        }
        case PAT_LOGIN: return {
            ...state,
            patLoggedIn: 'YES'
        }
        default: return state;
    }

}

export default loginReducer;