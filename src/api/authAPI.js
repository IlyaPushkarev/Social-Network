import API from "./api";


export const authAPI = {
    auth(){
        return API.get(`auth/me`)
    }
}

