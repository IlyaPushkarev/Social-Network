import {usersAPI} from "../api/usersAPI";
import {ResultCodesEnum, UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
}

type initialStateType = typeof initialState

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

type ActionsTypes = FollowSuccessType
    | unfollowSuccessType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetchingType
    | ToggleFollowingProgressType

type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => {
    return {
        type: FOLLOW,
        userId
    }
}

type unfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessType => {
    return {
        type: UNFOLLOW,
        userId
    }
}

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>): SetUsersType => {
    return {
        type: SET_USERS,
        users
    }
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPageAC = (currentPage: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}

export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    }
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}
type GetStateType = ()=>rootStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, rootStateType, unknown, ActionsTypes>

export const getUsersThunkCreator = (page: number, pageSize: number):ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));

        return usersAPI.getUsers(page, pageSize)
            .then(data => {
                // debugger
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