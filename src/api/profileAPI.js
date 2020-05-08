import API from "./api";

export const profileAPI = {
    getUserProfile: (userId)=>{
        return API.get(`profile/${userId}`)

    },

    getUserStatus: (userId)=>{
        return API.get(`/profile/status/${userId}`)
    },

    updateUserStatus: (userStatus)=>{
        return API.put(`/profile/status`, {
            status: userStatus,
        })
    }
}

