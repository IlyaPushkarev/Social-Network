import React from "react";
import classes from "./Button.module.css";

const Button = React.memo((props)=>{
    // debugger
    let disabled = ``;
    if(props.disabled){
        disabled = `disabled`;
    }
    return (
        <button id={props.id}
                className={[classes["btn"],classes[`${disabled}`]].join(" ")}
                onClick={props.onClick}
                disabled={props.disabled}
                style={props.style}
        >
            {props.text}
        </button>
    )
})

export default Button;