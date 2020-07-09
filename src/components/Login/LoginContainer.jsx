import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {loginTC, setAuthUserData} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
// import {loginAPI} from "../../api/loginAPI";

class LoginContainer extends React.Component {
    componentDidMount() {

    }
    onSubmit = (formData) => {
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

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        id: state.auth.id,
        captchaUrl: state.auth.captchaUrl
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setAuthUserData: (userId, email, login) => {
            dispatch(setAuthUserData(userId, email, login));
        },
        login: (login, password, rememberMe,captchaText) => {
            dispatch(loginTC(login, password, rememberMe,captchaText));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);