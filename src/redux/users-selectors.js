import {createSelector} from "reselect";

const users = (state)=>state.usersPage.users;
export const requestUsers = createSelector(
    [users],
    (users)=>{
        // console.log("it's selector library function")
        return users.filter(user=>true);
    }
)

export const getPageSize = (state)=>{
    // console.log("it's selector function getPageSize")
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state)=>{
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state)=>{
    return state.usersPage.currentPage
}

export const getIsFetching = (state)=>{
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state)=>{
    return state.usersPage.followingInProgress
}