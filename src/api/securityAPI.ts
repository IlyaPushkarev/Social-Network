import API from "./api";
type getCaptchaUrlRespType = {
    url:string
}
export const securityAPI = {
    getCaptchaUrl(){
        return API.get<getCaptchaUrlRespType>(`security/get-captcha-url`).then(res=>res.data)
    }
}