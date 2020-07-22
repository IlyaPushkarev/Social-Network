import React from "react";
import classes from "./Button.module.css";

type ButtonPropsType = {
    id?: string | undefined,
    onClick?:()=>void,
    disabled?:boolean,
    style?: object,
    text:string,
}
const Button = React.memo((props:ButtonPropsType)=>{
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