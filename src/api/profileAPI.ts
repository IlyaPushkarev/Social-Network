import API from "./api";
import {PhotosType, ProfileType, ResultCodesEnum} from "../types/types";

type updateUserStatusResType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

type SetUserPhotoResType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type setProfileInfoResType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const profileAPI = {
    getUserProfile: (userId: string) => {
        return API.get<ProfileType>(`profile/${userId}`).then(response => response.data)

    },

    getUserStatus: (userId: string) => {
        return API.get<string>(`/profile/status/${userId}`).then(response => response.data)
    },

    updateUserStatus: (userStatus: string) => {
        return API.put<updateUserStatusResType>(`/profile/status`, {
            status: userStatus,
        })
    },

    setUserPhoto: (photoFile: File) => {
        const formdata = new FormData();
        formdata.append("image", photoFile)

        return API.put<SetUserPhotoResType>(`/profile/photo`, formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    setProfileInfo: (profileInfo: ProfileType) => {
        // debugger
        return API.put<setProfileInfoResType>("/profile", {
            ...profileInfo
        }).then(res=>res.data)
    }
}

