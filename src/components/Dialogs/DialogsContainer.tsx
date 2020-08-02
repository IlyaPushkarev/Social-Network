import React from "react";
import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
// import {withAuth} from "../HOC/withAuth/withAuth";
import {compose, Dispatch} from "redux";
import {rootStateType} from "../../redux/redux-store";


let mapStateToProps = (state:rootStateType)=>{
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newTextMessage: state.messagesPage.newTextMessage,
        isAuth: state.auth.isAuth,
    }
}
let mapDispatchToProps = (dispatch:Dispatch)=>{
    return {
        addMessage: (newMessage:string)=>{
            dispatch(addMessageActionCreator(newMessage))
        }
    }
}

export default compose<React.ComponentType>(
    // withAuth,
    connect(mapStateToProps, mapDispatchToProps),

)(Dialogs);

