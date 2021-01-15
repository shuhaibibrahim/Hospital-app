import { DOC_LOGIN, DOC_LOGOUT } from './docActionTypes'

exports.docLogIn=()=>{
    return {
        type: DOC_LOGIN,
    }
}

exports.docLogOut=()=>{
    return {
        type: DOC_LOGOUT,
    }
}
