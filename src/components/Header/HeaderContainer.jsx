import React from "react";
import Header from "./Header";
import {connect} from "react-redux";

import {authorizeThunkCreator, setAuthUserData} from "../../redux/auth-reducer";
import {authAPI} from "../../api/authAPI";



class HeaderContainer extends React.Component{

    componentDidMount() {
        /*authAPI.auth()
            .then(response=>{

                if(response.data.resultCode == 0){
                    let {id,email, login} = response.data.data;

                    this.props.setAuthUserData(id,email,login)
                }
            })*/

        this.props.authorize();
    }

    render(){
        return(<Header {...this.props} />)
    }
}
let mapStateToProps = (state)=>{
    return{
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
let mapDispatchToProps = (dispatch)=>{
    return{
        setAuthUserData: (userId, email, login)=>{
            dispatch(setAuthUserData(userId, email, login));
        },
        authorize: ()=>{
            dispatch(authorizeThunkCreator());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);