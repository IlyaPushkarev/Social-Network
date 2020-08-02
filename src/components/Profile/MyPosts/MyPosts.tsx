import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm, {PostFormValuesType} from "../../Forms/PostForm/PostForm";
import {PostType, ProfileType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType | null

    addPost: (post: string) => void
}
export default React.memo(function MyPosts(props: PropsType) {

    const onAddPost = (formData: PostFormValuesType) => {
        props.addPost(formData.newPost);
        formData.newPost = "";
    };

    return (
        <div className={classes.wrapper}>

            <div className={classes.postNew}>
                <div className={classes.header}>
                    <h3>Add new post</h3>
                </div>

                <div className={classes.postNew__body}>
                    <PostForm onSubmit={onAddPost}/>
                </div>
            </div>

            <div className={classes.postsOld}>
                <div className={classes.header}>
                    <h3>My Posts</h3>
                </div>
                <div className={classes.posts}>

                    {
                        props.posts.map((post) => <Post key={post.id}
                                                        photo={props.profile? props.profile.photos.small: null}
                                                        message={post.message}
                                                        likeCount={post.likesCount}
                                                        dislikeCount={post.dislikeCount}
                            />
                        )}
                </div>
            </div>

        </div>
    )
})

// export default MyPosts;