import React from "react";
import LoginFormRedux from "../Forms/LoginForm/LoginForm";
import classes from "./Login.module.css";
// import {SubmitHandler} from "redux-form";

export type LoginOwnFormProps = {
    captchaUrl: string | null
    // onSubmit:(dataFormObj:{ login: string; password: string; rememberMe: boolean; captchaText: string; })=>void
}
export type LoginFormValuesType = {
    email:string,
    password:string
    login:string
    rememberMe:boolean
    captchaText: string
}
// type FormDataType = { login: string; password: string; rememberMe: boolean; captchaText: string; }
type FormDataType =  LoginFormValuesType

type PropsType = {
    onSubmit:(dataFormObj:FormDataType)=>void
    captchaUrl:string | null
}
const Login:React.FC<PropsType> = (props)=>{
    // debugger
    return (
        <div className={classes.wrapper_loginForm}>
            <div className={classes.loginForm__header}>
                <h3>Login</h3>
            </div>

            <LoginFormRedux onSubmit={(data)=>props.onSubmit(data)} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

export default Login;