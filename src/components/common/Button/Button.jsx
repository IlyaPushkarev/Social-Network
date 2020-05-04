import React from "react";
import classes from "./Button.module.css";

const Button = (props)=>{
    let disabled = ``;
    if(props.disabled){
        disabled = `disabled`;
    }
    return (
        <button className={[classes["btn"],classes[`${disabled}`]].join(" ")}  onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
    )
}

export default Button;