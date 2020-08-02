import {usersAPI} from "../api/usersAPI";
import {ResultCodesEnum, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

export let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
}
export type initialStateType = typeof initialState

function inferLiteralFromString<T extends string>(str:T):T {
    return str
}

export const followSuccess = (userId: number) => {
    return {
        type:  inferLiteralFromString(FOLLOW),
        userId
    }
}

export const unfollowSuccess = (userId: number) => {
    return {
        type: inferLiteralFromString(UNFOLLOW),
        userId
    }
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: inferLiteralFromString(SET_USERS),
        users
    }
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: inferLiteralFromString(SET_CURRENT_PAGE),
        currentPage: currentPage
    }
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: inferLiteralFromString(SET_TOTAL_USERS_COUNT),
        count: totalUsersCount
    }
}

export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: inferLiteralFromString(TOGGLE_IS_FETCHING),
        isFetching
    }
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: inferLiteralFromString(TOGGLE_IS_FOLLOWING_PROGRESS),
        isFetching,
        userId
    }
}

const actionCreators = {
    followSuccess,
    unfollowSuccess,
    setUsersAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    toggleIsFetchingAC,
    toggleFollowingProgress
}

type InferValueTypes<T> = T extends {[key:string]: infer U} ? U : never
export type ActionsTypes = ReturnType<InferValueTypes<typeof actionCreators >>

/*IMPORTANT*/
//type GetStateType = ()=>rootStateType
//type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, rootStateType, unknown, ActionsTypes>

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case SET_USERS: {
            // return {...state, users: [...state.users, ...action.users]}
            return {...state, users: [...action.users]}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}//50
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }

}

export const getUsersThunkCreator = (page: number, pageSize: number):ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));

        return usersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(setCurrentPageAC(page));
                dispatch(toggleIsFetchingAC(false));
                dispatch(setUsersAC(data.items));
                dispatch(setTotalUsersCountAC(data.totalCount));
                // return data
            });
    }
}

export const followThunkCreator = (userId: number):ThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

       return usersAPI.follow(userId)
            .then(data => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId));
            })
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

       return usersAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId));
            })
    }

}

export default usersReducer;