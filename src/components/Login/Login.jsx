import React from "react";
import LoginFormRedux from "../Forms/LoginForm/LoginForm";
import classes from "./Login.module.css";

const Login = (props)=>{
    // debugger
    return (
        <div className={classes.wrapper_loginForm}>
            <div className={classes.loginForm__header}>
                <h3>Login</h3>
            </div>

            <LoginFormRedux onSubmit={props.onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

export default Login;