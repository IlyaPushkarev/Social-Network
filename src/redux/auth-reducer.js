import {loginAPI} from "../api/loginAPI";
import {stopSubmit} from "redux-form";
// import {finilizeApp} from "./app-reducer";

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
            };

        default:
            return state;

    }
}
export const setAuthUserData = (userId, email, login, isAuth,)=>{
    return {
        type: SET_USER_DATA,
        data:{
            id: userId,
            email,
            login,
            isAuth,
        }
    }
}

export const getAuthUserData = ()=>{
    return (dispatch)=>{
        return loginAPI.getAuthUserData()
            .then(res=>{
                if(res.data.resultCode === 1){
                    return new Error(res.data.messages[0])
                }
                let {id, email, login} = {...res.data.data};
                dispatch(setAuthUserData(id, email, login, true));
            })
    }


}
export const  loginTC = (login, password, rememberMe)=>{
    return (dispatch)=>{


        loginAPI.login(login, password, rememberMe)
            .then(response=>{
                // debugger
                if(response.data.resultCode === 0){

                    dispatch(getAuthUserData())
                }else{
                    let mes = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login",{_error: mes}))
                }
            })
            .catch(err=>console.error(err))
    }
}

export const  logoutTC = ()=>{
    return (dispatch)=>{
        loginAPI.logout()
            .then(response=>{
                // debugger
                if(response.data.resultCode === 0){
                     // dispatch(setAuth(false, null));
                     dispatch(setAuthUserData(null, null, null, false));
                     // dispatch(finilizeApp())
                }
            })
            .catch(err=>console.error(err))
    }
}
export default authReducer;