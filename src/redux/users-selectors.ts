import {createSelector} from "reselect";
import {rootStateType} from "./redux-store";

const users = (state:rootStateType)=>state.usersPage.users;
const pageSize = (state:rootStateType)=> state.usersPage.pageSize;


export const requestUsers = createSelector(
    [users],
    (users)=>{
        // console.log("it's selector library function")
        return users.filter(()=>true);
    }
)

/*export const getPageSize = (state)=>{
    console.log("it's selector function getPageSize")
    return state.usersPage.pageSize
}*/

export const getPageSize = createSelector(
    [pageSize],
    (pageSize)=>{
        // console.log("it's selector library function")
        return pageSize;
    }
)

export const getTotalUsersCount = (state:rootStateType)=>{
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state:rootStateType)=>{
    return state.usersPage.currentPage
}

export const getIsFetching = (state:rootStateType)=>{
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state:rootStateType)=>{
    return state.usersPage.followingInProgress
}