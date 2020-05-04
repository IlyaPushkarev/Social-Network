import API from "./api";

export const profileAPI = {
    getUserProfile: (userId)=>{
        return API.get(`profile/${userId}`)

    }
}

