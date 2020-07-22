import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import {rootStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    auth: rootStateType["auth"]
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {

    componentDidMount() {
        // this.props.login();
    }

    render() {
        return (<Header auth={this.props.auth} logout={this.props.logout}/>)
    }
}

let mapStateToProps = (state: rootStateType) => {
    return {
        auth: state.auth,
    }
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        /*setAuthUserData: (userId:number, email:string, login:string)=>{
            dispatch(setAuthUserData(userId, email, login));
        },*/
        /* login: ()=>{
             dispatch(loginTC());
         },*/
        logout: () => {
            dispatch(logoutTC())
        }
    }
}

export default connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    rootStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);