import API from "./api";
import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../types/types";


type MeResponseType = {
    data: {
        id: number,
        login: string,
        email: string
    },
    resultCode:ResultCodesEnum,
    messages: Array<string>
}

type LoginResponseType= {
    data: {
        id: number,
    },
    resultCode:ResultCodesEnum | ResultCodesForCaptchaEnum,
    messages: Array<string>
}

type LogoutResponseType = {
    data: { },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}
export const loginAPI = {
    getAuthUserData(){
        return API.get<MeResponseType>(`auth/me`).then(res=>res.data)
    },
    login: (email:string, password:string, rememberMe:boolean,captcha:string|null=null)=>{
        return API.post<LoginResponseType>(`auth/login`,{
            email,
            password,
            rememberMe,
            captcha
        }).then(res=>res.data)
    },
    logout(){
        return API.delete<LogoutResponseType>("auth/login").then(res=>res.data)
    }

}