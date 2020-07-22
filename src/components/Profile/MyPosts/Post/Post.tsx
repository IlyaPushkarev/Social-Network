import React from "react";
import classes from "./Post.module.css";

type PropsType = {
    photo:string | null
    message: string
    likeCount: number
    dislikeCount: number
}
const Post = (props:PropsType)=>{
    const defaultSrc = "https://img.tsn.ua/cached/1518092914/tsn-3122bdbfc8d6fcfa75d8528e9b9cd61a/thumbs/315x210/b4/b1/ada811fe61784362abc9a989cbceb1b4.jpg"
    return (
        <div className={classes.item}>

            <img src={props.photo ? props.photo : defaultSrc} alt=""/>
            <div className="message">{props.message}</div>
           <div className={classes.estimate}>
               <span>Like: {props.likeCount}</span>
               <span>Dislike: {props.dislikeCount}</span>

           </div>
        </div>
    )
}

export default Post;