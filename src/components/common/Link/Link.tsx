import React from "react";
import classes from "./Link.module.css";

type PropsType = {
    text: string,
    url: string
}
const MyLink = (props:PropsType)=>{
    return(
        <a className={classes.link} href={props.url} target={"_blank"} rel={"noopener noreferrer"}>{props.text}</a>
    )
}

export default MyLink;