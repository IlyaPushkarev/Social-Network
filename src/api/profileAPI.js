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
    },

    setUserPhoto: (photoFile)=>{
        const formdata = new FormData();
        formdata.append("image",photoFile)

        return API.put(`/profile/photo`, formdata,{
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        })
    },
    setProfileInfo: (profileInfo)=>{
        // debugger
        return API.put("/profile",{
            ...profileInfo
        })
    }
}

