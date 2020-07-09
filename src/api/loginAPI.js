import API from "./api";

export const loginAPI = {
    getAuthUserData(){
        return API.get(`auth/me`)
    },
    login: (email, password, rememberMe,captcha=null)=>{
        return API.post(`auth/login`,{
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout(){
        return API.delete("auth/login")
    }

}