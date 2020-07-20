import React from 'react';
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props)=>{
    // debugger
    return (
        <header className={classes.header}>
            <div className={classes.logoWrapper}>
                <img src="http://pngimg.com/uploads/taxi_logos/taxi_logos_PNG24.png" alt="logo"/>
                <h1>Funny</h1>
            </div>


            <div className={classes.loginBlock} >
                <div >
                    {props.auth.isAuth
                    ? <div>
                            <div>{props.auth.login}</div>
                            <div><button onClick={props.logout}>Logout</button></div>
                    </div>
                    :<NavLink to={"/login"}>Login</NavLink >}

                </div>
            </div>
        </header>
    )
}

export default Header;