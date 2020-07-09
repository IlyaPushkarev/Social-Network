import {loginAPI} from "../api/loginAPI";
import {stopSubmit} from "redux-form";
import {securityAPI} from "../api/securityAPI";
// import {finilizeApp} from "./app-reducer";

let SET_USER_DATA = "auth/SET-USER-DATA";
let GET_CAPTCHA_SUCCESS = "auth/GET_CAPTCHA_SUCCESS";

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,/*проверка логина*/
    captchaUrl: null
}

const authReducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.data,
            };
        case GET_CAPTCHA_SUCCESS:{
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
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

export const  loginTC = (login, password, rememberMe,captchaText)=>{
    return (dispatch)=>{
        loginAPI.login(login, password, rememberMe,captchaText)
            .then(response=>{
                // debugger
                if(response.data.resultCode === 0){
                    dispatch(getAuthUserData())
                }else {
                    if(response.data.resultCode === 10) {
                        dispatch(getCaptchaUrl())
                        // debugger
                    }
                    let mes = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login",{_error: mes}))
                }
            })
            .catch(err=>console.error(err))
    }
}

export const getCaptchaUrlSuccess = (captchaUrl)=>{
    return{
        type: GET_CAPTCHA_SUCCESS,
        captchaUrl
    }
}
export const getCaptchaUrl = ()=>{
    return async (dispatch,state)=>{
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        // debugger
        dispatch(getCaptchaUrlSuccess(captchaUrl))
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
                }else{
                    alert("Не получилось выйти с аккаунта")
                }
            })
            .catch(err=>console.error(err))
    }
}
export default authReducer;