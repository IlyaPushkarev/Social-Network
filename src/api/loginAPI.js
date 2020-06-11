import API from "./api";

export const loginAPI = {
    getAuthUserData(){
        return API.get(`auth/me`)
    },
    login: (email, password, rememberMe)=>{
        return API.post(`auth/login`,{
            email,
            password,
            rememberMe
        })
    },
    logout(){
        return API.delete("auth/login")
    }

}