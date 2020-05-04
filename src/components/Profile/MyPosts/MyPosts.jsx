import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import Button from "../../common/Button/Button";

const MyPosts = (props)=>{
    let newPostElement = React.createRef();

    const onAddPost = ()=> {
        props.addPost();
    };

    const onChangeTextarea = ()=>{
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={classes.posts}>

            <div className={classes.postNew}>
                <div className={classes.header}>
                    <h3>Add new post</h3>
                </div>

                <div className={classes.postNew__body}>
                    <textarea ref={newPostElement} onChange={onChangeTextarea} value={props.newTextPost}></textarea>
                    {/*<button className={classes.btn}  onClick={onAddPost}>Add post </button>*/}
                    <Button onClick={onAddPost} text={"ADD POST"}/>

                </div>
            </div>

            <div className={classes.postsOld}>
                <div className={classes.header}>
                    <h3>My Posts</h3>
                </div>
                <div className={classes.posts}>

                    { props.posts.map((post)=> <Post message={post.message} likeCount={post.likesCount} key={post.id}/>)}
                </div>
            </div>

        </div>
    )
}

export default MyPosts;