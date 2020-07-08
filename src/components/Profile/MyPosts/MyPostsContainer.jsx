import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

import {connect} from "react-redux";

const mapStateToProps = (state)=>{
    return {
        posts: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addPost: (newPost)=>{
            dispatch(addPostActionCreator(newPost));
        },
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;