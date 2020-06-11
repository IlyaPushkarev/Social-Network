import API from "./api";

export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return API.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow: (userId) => {
        return API.post(`follow/${userId}`)
    },

    unfollow: (userId) => {
        return API.delete(`follow/${userId}`)
    }
}
