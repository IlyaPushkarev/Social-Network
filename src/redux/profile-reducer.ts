import {profileAPI} from "../api/profileAPI";
import {PostType, PhotosType, ProfileType, ResultCodesEnum} from "../types/types"
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";


let posts: Array<PostType> = [
    {message: "Hi, how are you?", id: 1, likesCount: 11, dislikeCount: 5},
    {message: "It's my first post", id: 2, likesCount: 11, dislikeCount: 5},
    {message: "Development", id: 3, likesCount: 11, dislikeCount: 5},
];

const ADD_POST = 'ADD_POST';

const SET_USER_PROFILE = "SET_USER_PROFILE";
const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
const GET_USER_PROFILE_FAILURE = "GET_USER_PROFILE_FAILURE";

const SET_USER_STATUS = "SET_USER_STATUS";
const GET_USER_STATUS_SUCCESS = "GET_USER_STATUS_SUCCESS";
const GET_USER_STATUS_FAILURE = "GET_USER_STATUS_FAILURE";

const DELETE_POST = "DELETE_POST";
const SAVE_USER_PHOTO_SUCCESS = "SAVE_USER_PHOTO_SUCCESS"

let initialState = {
    newTextPost:" ",
    posts,
    profile: null as ProfileType | null,
    isLoadedProfile: true,
    status: "Status is loading",
    isLoadedStatus: true,
}

export type initialStateType = typeof initialState
/*Action types*/
type inferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

function inferLiteralFromString<T extends string>(arg: T): T {
    return arg
}

export const addPostActionCreator = (newPost: string) => {
    return {
        type: inferLiteralFromString(ADD_POST),
        newPost
    };
}
export const deletePostAC = (postId: number) => {
    return {
        type: inferLiteralFromString(DELETE_POST),
        postId
    }
}

export const getUserProfileSuccess = () => {
    return {
        type: inferLiteralFromString(GET_USER_PROFILE_SUCCESS),
        // isLoadedProfile: true
    }
}
export const getUserProfileFailure = () => {
    return {
        type: inferLiteralFromString(GET_USER_PROFILE_FAILURE),
        // isLoadedProfile: false
    }
}
export const setUserProfile = (profile:ProfileType) => {
    return {
        type: inferLiteralFromString(SET_USER_PROFILE),
        profile,
    }
}

export const getUserStatusSuccess = () => {
    return {
        type: inferLiteralFromString(GET_USER_STATUS_SUCCESS),
        isLoadedStatus: true
    }
}
export const getUserStatusFailure = () => {
    return {
        type: inferLiteralFromString(GET_USER_STATUS_FAILURE),
        sLoadedStatus: false
    }
}
export const setUserStatus = (userStatus:string) => {
    return {
        type: inferLiteralFromString(SET_USER_STATUS),
        userStatus
    }
}

export const updateUserPhoto = (photos:PhotosType) => {
    return {
        type: inferLiteralFromString(SAVE_USER_PHOTO_SUCCESS),
        photos,
    }
}

const actionCreators = {
    addPostActionCreator,
    deletePostAC,
    getUserProfileSuccess,
    getUserProfileFailure,
    setUserProfile,
    getUserStatusSuccess,
    getUserStatusFailure,
    setUserStatus,
    updateUserPhoto,
}

type ActionTypes = ReturnType<inferValueTypes<typeof actionCreators>>
/*/////////////*/
type ThunkType = ThunkAction<void, rootStateType, unknown, ActionTypes>

const profileReducer = (state = initialState, action: ActionTypes):initialStateType => {
    // debugger;
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
                message: action.newPost,
                id: state.posts.length + 1,
                likesCount: 3,
                dislikeCount: 3,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newTextPost: " "
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case GET_USER_PROFILE_FAILURE: {
            return {
                ...state,
                isLoadedProfile: false
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                isLoadedProfile: true,
                profile: action.profile
            }
        }
        case GET_USER_STATUS_FAILURE: {
            return {
                ...state,
                isLoadedStatus: false
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                isLoadedStatus: true,
                status: action.userStatus
            }
        }

        case SAVE_USER_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        }
        default:
            return state;
    }
}



export const getUserProfileThunkCreator = (userId:string): ThunkType => {
    return (dispatch) => {
        return profileAPI.getUserProfile(userId)
            .then(profile => {
                // debugger
                dispatch(getUserProfileSuccess())
                dispatch(setUserProfile(profile));
            })
            .catch(() => {
                dispatch(getUserProfileFailure())
                // console.log(error)
            })
    }
}

export const getUserProfileStatusTC = (userId:string):ThunkType => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(data => {
                // debugger;
                let status = data;
                dispatch(getUserStatusSuccess())
                dispatch(setUserStatus(status))
            })
            .catch(err => {
                dispatch(getUserStatusFailure())
                alert(err);
            })
    }
}

export const updateUserProfileStatusTC = (status:string):ThunkType => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                debugger;
                if (response.data.resultCode === ResultCodesEnum.Success) {
                    let status = JSON.parse(response.config.data).status;
                    // debugger;
                    dispatch(setUserStatus(status))
                } else {
                    console.log(response);
                }
            })
            .catch(err => {
                alert("Status wasn't update")
                console.log(err);
            })
    }
}

export const setMainPhotoProfile = (photoSrc:File):ThunkType => {
    return async (dispatch) => {
        const obj = await profileAPI.setUserPhoto(photoSrc)
        debugger
        if (obj.resultCode === ResultCodesEnum.Success) {
            dispatch(updateUserPhoto(obj.data.photos))
        }

        if (obj.resultCode === ResultCodesEnum.Error) {
            alert("Не удалось загрузить фото")
        }
    }
}

export const updateProfileInfo = (profileInfo:ProfileType, userId:string): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.setProfileInfo(profileInfo)
        debugger
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getUserProfileThunkCreator(userId))
        } else {
            alert("Не удалось обновить анкетные данные")
        }
    }
}
export default profileReducer;