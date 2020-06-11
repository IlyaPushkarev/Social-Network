import React from "react";
import Header from "./Header";
import {connect} from "react-redux";

import {loginTC, logoutTC, setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component{

    componentDidMount() {
        // this.props.login();
    }

    render(){
        return(<Header {...this.props} />)
    }
}
let mapStateToProps = (state)=>{
    return{
        auth: state.auth,
    }
}
let mapDispatchToProps = (dispatch)=>{
    return{
        setAuthUserData: (userId, email, login)=>{
            dispatch(setAuthUserData(userId, email, login));
        },
        login: ()=>{
            dispatch(loginTC());
        },
        logout: ()=>{
            dispatch(logoutTC())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);