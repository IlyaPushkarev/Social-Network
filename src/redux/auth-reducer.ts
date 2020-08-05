import {loginAPI} from "../api/loginAPI";
import {securityAPI} from "../api/securityAPI";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../types/types";
import {stopSubmit} from "redux-form";
import {Action} from "redux";
// import {finilizeApp} from "./app-reducer";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_SUCCESS = "auth/GET_CAPTCHA_SUCCESS";
const SET_IS_FETCHING_AUTH = 'auth/SET_IS_FETCHING_AUTH'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetchingUserAuthData: false,
    isAuth: false,/*проверка логина*/
    captchaUrl: null as string | null
}
export type initialStateAuthType = typeof initialState

function inferLiteralFromString<T extends string>(arg:T):T{
    return arg
}

export const setAuthUserData = (userId:number| null, email:string| null, login:string| null, isAuth:boolean = false,)=>{
    return {
        type:  inferLiteralFromString(SET_USER_DATA),
        data:{
            id: userId,
            email,
            login,
            isAuth,
        }
    }
}

export const getCaptchaUrlSuccess = (captchaUrl:string)=>{
    return{
        type:  inferLiteralFromString(GET_CAPTCHA_SUCCESS),
        captchaUrl
    }
}

export const setIsFetchingAuth = (isFetching:boolean)=>{
    return{
        type: inferLiteralFromString(SET_IS_FETCHING_AUTH),
        isFetchingUserAuthData: isFetching
    }
}

const actionCreators = {
    setAuthUserData,
    getCaptchaUrlSuccess,
    setIsFetchingAuth
}

type InferValueTypes<T> = T extends {[key:string]: infer U} ? U : never
export type ActionsTypes = ReturnType<InferValueTypes<typeof actionCreators >>

type ThunkType = ThunkAction<Promise<void>, rootStateType, unknown, ActionsTypes | Action>

const authReducer = (state = initialState, action:ActionsTypes):initialStateAuthType=>{
    switch (action.type) {
        case SET_IS_FETCHING_AUTH:{
            return {
                ...state,
                isFetchingUserAuthData: action.isFetchingUserAuthData
            }
        }
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:

            return state;

    }
}

export const getAuthUserData = ():ThunkType=>{
    return (dispatch)=>{
        dispatch(setIsFetchingAuth(true))
        return loginAPI.getAuthUserData()
            .then(data=>{
                dispatch(setIsFetchingAuth(false))
                if(data.resultCode === ResultCodesEnum.Error){
                     new Error(data.messages[0])
                }
                let {id, email, login} = {...data.data};
                dispatch(setAuthUserData(id, email, login, true));
            })
    }
}

export const  loginTC = (login:string, password:string, rememberMe:boolean,captchaText:string):ThunkType =>{
    return (dispatch)=>{
        return loginAPI.login(login, password, rememberMe,captchaText)
            .then(data=>{
                // debugger
                if(data.resultCode === ResultCodesEnum.Success){
                    // debugger
                    dispatch(getAuthUserData())
                }else {
                    if(data.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
                        dispatch(getCaptchaUrl())
                        // debugger
                    }
                    let mes = data.messages.length > 0 ? data.messages[0] : "Some error"
                    dispatch(stopSubmit("login",{_error: mes}))
                }
            })
            .catch(err=>console.error(err))
    }
}

export const getCaptchaUrl = ():ThunkType=>{
    return async (dispatch)=>{
        const data = await securityAPI.getCaptchaUrl();
        // debugger
        const captchaUrl = data.url;
        // debugger
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}

export const  logoutTC = ():ThunkType=>{
    return (dispatch)=>{
        return loginAPI.logout()
            .then(data=>{
                // debugger
                if(data.resultCode === ResultCodesEnum.Success){
                    // dispatch(finilizeApp())
                     dispatch(setAuthUserData(null, null, null, false));

                }else{
                    alert("Не получилось выйти с аккаунта")
                }
            })
            .catch(err=>console.error(err))
    }
}

export default authReducer;