import React from "react";
import API from "./api";

export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return API.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow: (userId) => {
        return API.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },

    unfollow: (userId) => {
        return API.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}
