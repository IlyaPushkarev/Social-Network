import {profileAPI} from "../api/profileAPI";

let posts = [
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
    posts,
    profile: null,
    isLoadedProfile: true,
    status: "Status is loading",
    isLoadedStatus:true
}

const profileReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                message: action.newPost,
                id: state.posts.length + 1,
                likesCount: 3,
                dislikesCount: 3,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newTextPost: " "
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post=>post.id !== action.postId)
            }
        case GET_USER_PROFILE_FAILURE:{
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
        case GET_USER_STATUS_FAILURE:{
            return {
                ...state,
                isLoadedStatus: false
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                isLoadedStatus:true,
                status: action.userStatus
            }
        }

        case SAVE_USER_PHOTO_SUCCESS:{
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPost) => {
    return {
        type: ADD_POST,
        newPost
    };
}

export  const  deletePostAC = (postId)=>{
    return{
        type: DELETE_POST,
        postId
    }
}

export const setUserProfile = (profile)=>{
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}
export const getUserProfileSuccess = ()=>{
    return {
        type: GET_USER_PROFILE_SUCCESS,
        // isLoadedProfile: true
    }
}
export const getUserProfileFailure = ()=>{
    return {
        type: GET_USER_PROFILE_FAILURE,
        // isLoadedProfile: false
    }
}

export const updateUserPhoto = (photos)=>{
    return {
        type: SAVE_USER_PHOTO_SUCCESS,
        photos,
    }
}

export const getUserProfileThunkCreator = (userId)=>{
    return (dispatch)=>{
        profileAPI.getUserProfile(userId)
            .then(response=>response.data)
            .then(data=>{
                // debugger
                dispatch(getUserProfileSuccess())
                dispatch(setUserProfile(data));
            })
            .catch(error=> {
                dispatch(getUserProfileFailure())
                // console.log(error)
            })
    }
}

export const setUserStatus = (userStatus)=>{
    return {
        type:SET_USER_STATUS,
        userStatus
    }
}

export const getUserStatusSuccess = ()=>{
    return {
        type:GET_USER_STATUS_SUCCESS,
        isLoadedStatus: true
    }
}

export const getUserStatusFailure = ()=>{
    return {
        type:GET_USER_PROFILE_FAILURE,
        sLoadedStatus: false
    }
}

export const getUserProfileStatusTC = (userId)=>{
  return (dispatch)=>{
        profileAPI.getUserStatus(userId)
            .then(data=>{
                // debugger;
                let status = data.data;
                dispatch(getUserStatusSuccess())
                dispatch(setUserStatus(status))
            })
            .catch(err=>{
                dispatch(getUserStatusFailure())
                alert(err);
            })
  }
}

export const updateUserProfileStatusTC = (status)=>{
  return  (dispatch)=>{
        profileAPI.updateUserStatus(status)
            .then(response=>{
                // debugger;
                if(response.data.resultCode === 0){
                    let status = JSON.parse(response.config.data).status;
                    // debugger;
                    dispatch(setUserStatus(status))
                }else{
                    console.log(response);
                }
            })
            .catch(err=>{
                alert("Status wasn't update")
                console.log(err);
            })
  }
}

export const setMainPhotoProfile = (photoSrc)=>{
    return async (dispatch)=>{
        const response = await profileAPI.setUserPhoto(photoSrc)

        if(response.data.resultCode === 0){
            dispatch(updateUserPhoto(response.data.data.photos))
        }

        if(response.data.resultCode === 1){
            alert("Не удалось загрузить фото")
        }
    }
}

export const updateProfileInfo = (profileInfo,userId)=>{
    return async (dispatch)=>{
        const response = await profileAPI.setProfileInfo(profileInfo)
        // debugger
        if(response.data.resultCode === 0){
            dispatch(getUserProfileThunkCreator(userId))
        }else{
            alert("Не удалось обновить анкетные данные")
        }
    }
}
export default profileReducer;