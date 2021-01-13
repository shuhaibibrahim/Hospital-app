import { DATE_PICK, DOC_PICK } from './patient/patActionTypes.js'

// const initialState={
//     docLoggedIn: 'NO',
//     patLoggedIn: 'NO'
// }
const initialState={
    dateSelected: 'NULL',
    docUser: 'NULL'
}

const patientReducer=(state=initialState, action)=>{

    switch(action.type){
        case DATE_PICK: return {
            ...state,
            dateSelected:action.date
        }
        case DOC_PICK: return {
            ...state,
            docUser:action.docUser
        }
        default: return state;
    }

}

export default patientReducer;