import React from "react";
import classes from "./Message.module.css";
 type PropsType = {
    message: string
}
const Message = (props:PropsType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

export default Message;