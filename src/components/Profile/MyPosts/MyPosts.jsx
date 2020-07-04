import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm from "../../Forms/PostForm/PostForm";

export default React.memo(function MyPosts(props) {

        const onAddPost = (formData) => {
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
                            props.posts.map((post) => <Post photo={props.profile.photos.small}
                                                              message={post.message}
                                                              likeCount={post.likesCount}
                                                              dislikeCount={post.dislikeCount}
                                                              key={post.id}/>
                        )}
                    </div>
                </div>

            </div>
        )
})

// export default MyPosts;