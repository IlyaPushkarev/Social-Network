import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state)=>{
    return {isAuth: state.auth.isAuth,}
}
export const withAuth = (Component)=>{
   class RederictComponent extends React.Component{
        render(){
            const props = {...this.props,}
            if(!props.isAuth){
                return (<Redirect to={"/login"} />)
            }
            return (<Component {...props}/>)
        }
    }
    let connectedRederictComponent = connect(mapStateToPropsForRedirect)(RederictComponent);

   return connectedRederictComponent;
}