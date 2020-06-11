import React from "react";
import classes from "./Link.module.css";

const MyLink = (props)=>{
    return(
        <a className={classes.link} href={props.url} target={"_blank"} rel={"noopener noreferrer"}>{props.text}</a>
    )
}

export default MyLink;