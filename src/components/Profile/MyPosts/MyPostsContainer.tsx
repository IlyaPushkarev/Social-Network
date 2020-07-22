import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

import {connect} from "react-redux";
import {rootStateType} from "../../../redux/redux-store";
import {PostType, ProfileType} from "../../../types/types";

type MapStatePropsType = {
    posts:Array<PostType>
    newTextPost: string
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    addPost:(post:string)=>void
}

type OwnProps= {}

const mapStateToProps = (state:rootStateType)=>{
    return {
        posts: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost,
        profile: state.profilePage.profile
    }
}

const mapDispatchToProps = (dispatch:Function)=>{
    return {
        addPost: (newPost:string)=>{
            dispatch(addPostActionCreator(newPost));
        },
    }
}
const MyPostsContainer = connect<MapStatePropsType,
MapDispatchPropsType,
OwnProps,
    rootStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;