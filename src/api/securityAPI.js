import API from "./api";

export const securityAPI = {
    getCaptchaUrl(){
        return API.get(`security/get-captcha-url`)
    }
}