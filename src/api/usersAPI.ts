import API from "./api";
import {ResultCodesEnum, UserType} from "../types/types";

type getUsersRespType = {
    items: Array<UserType>
    error:string
    totalCount:number
}

type follow_unfollowResType={
    resultCode: ResultCodesEnum
    messages: Array<string>
    data:{}
}
export const usersAPI = {
    getUsers: (currentPage:number, pageSize:number) => {
        return API.get<getUsersRespType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow: (userId:number) => {
        return API.post<follow_unfollowResType>(`follow/${userId}`).then(res=>res.data)
    },

    unfollow: (userId:number) => {
        return API.delete<follow_unfollowResType>(`follow/${userId}`).then(res=>res.data)
    }
}
