import React from "react";
import classes from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number

}
const DialogItem = (props:PropsType)=>{
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog}>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    )
}

export  default DialogItem;