import {profileAPI} from "../api/profileAPI";

let posts = [
    {message: "Hi, how are you?", id: 1, likesCount: 11, dislikeCount: 5},
    {message: "It's my first post", id: 2, likesCount: 11, dislikeCount: 5},
    {message: "Development", id: 3, likesCount: 11, dislikeCount: 5},
];

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

let initialState = {
    posts,
    newTextPost: "Insert your post",
    profile: null,
    status: "Status is loading"
}

const profileReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                message: state.newTextPost,
                id: state.posts.length + 1,
                likesCount: 3,
                dislikesCount: 3,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newTextPost: " "
            };

        case   UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newTextPost: action.newText
            };
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.userStatus
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    };
}

export const updateNewPostTextActionCreator = (newText) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText
    };
}

export const setUserProfile = (profile)=>{
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}

export const getUserProfileThunkCreator = (userId)=>{
    return (dispatch)=>{
        profileAPI.getUserProfile(userId)
            .then(response=>response.data)
            .then(data=>{
                // debugger
                dispatch(setUserProfile(data));
            })
    }
}

export const setUserStatus = (userStatus)=>{
    return {
        type:SET_USER_STATUS,
        userStatus
    }
}

export const getUserProfileStatusTC = (userId)=>{
  return (dispatch)=>{
        profileAPI.getUserStatus(userId)
            .then(data=>{
                // debugger;
                let status = data.data;
                dispatch(setUserStatus(status))
            })
  }
}

export const updateUserProfileStatusTC = (status)=>{
  return (dispatch)=>{
        profileAPI.updateUserStatus(status)
            .then(response=>{
                // debugger;
                if(response.data.resultCode == 0){
                    let status = JSON.parse(response.config.data).status;
                    // debugger;
                    dispatch(setUserStatus(status))
                }

            })
  }
}

export default profileReducer;