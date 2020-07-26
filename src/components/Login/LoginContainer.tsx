import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {rootStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth:boolean
    login:string | null
    id:number | null
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: ( login: string,password: string,rememberMe: boolean,captchaText: string)=>void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class LoginContainer extends React.Component<PropsType> {
    componentDidMount() {
    }

    onSubmit = (formData: { login: string; password: string; rememberMe: boolean; captchaText: string; }) => {
        let {login, password, rememberMe, captchaText} = formData;
        this.props.login(login, password, rememberMe, captchaText);
        // debugger
    }

    render() {return (
            this.props.isAuth
                ? <Redirect to={`/profile/${this.props.id}`}/>
                : <Login onSubmit={this.onSubmit} captchaUrl={this.props.captchaUrl}/>
        )
    }
}

let mapStateToProps = (state: rootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        captchaUrl: state.auth.captchaUrl
    }
}

let mapDispatchToProps = (dispatch:Function) => {
    return {
        /*setAuthUserData: (userId:number, email:string, login:string) => {
            dispatch(setAuthUserData(userId, email, login));
        },*/
        login: (login:string, password:string, rememberMe:boolean,captchaText:string) => {
            dispatch(loginTC(login, password, rememberMe,captchaText));
        }
    }
}

export default connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,rootStateType>(mapStateToProps, mapDispatchToProps)(LoginContainer);