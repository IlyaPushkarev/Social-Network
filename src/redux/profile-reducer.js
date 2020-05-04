import {profileAPI} from "../api/profileAPI";

let posts = [
    {message: "Hi, how are you?", id: 1, likesCount: 11, dislikeCount: 5},
    {message: "It's my first post", id: 2, likesCount: 11, dislikeCount: 5},
    {message: "Development", id: 3, likesCount: 11, dislikeCount: 5},
];

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
    posts,
    newTextPost: "it-camasutra.com",
    profile: null,
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
                dispatch(setUserProfile(data));
            })
    }
}

export default profileReducer;