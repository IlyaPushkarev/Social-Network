import {authAPI} from "../api/authAPI";

let SET_USER_DATA = "SET-USER-DATA";
let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,/*проверка логина*/
}

const authReducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
                isAuth: true,
            };

        default:
            return state;

    }
}
export const setAuthUserData = (userId, email, login)=>{
    return {
        type: SET_USER_DATA,
        data:{
            userId,
            email,
            login
        }
    }
}

export const  authorizeThunkCreator = ()=>{
    return (dispatch)=>{
        authAPI.auth()
            .then(response=>{

                if(response.data.resultCode == 0){
                    let {id,email, login} = response.data.data;

                    dispatch(setAuthUserData(id,email,login));
                }
            })
            .catch(err=>console.error(err))
    }
}
export default authReducer;