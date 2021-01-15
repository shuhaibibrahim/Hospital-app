import { PAT_LOGIN, DATE_PICK, DOC_PICK, PAT_LOGOUT } from './patActionTypes'

exports.patLogIn=()=>{
    return {
        type: PAT_LOGIN,
    }
}
exports.datePick=()=>{
    return {
        type: DATE_PICK
    }
}
exports.docPick=()=>{
    return {
        type: DOC_PICK
    }
}
exports.patLogOut=()=>{
    return {
        type: PAT_LOGOUT,
    }
}
