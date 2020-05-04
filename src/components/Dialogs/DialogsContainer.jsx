import React from "react";
import {addMessageActionCreator, changeTextareaActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuth} from "../HOC/withAuth/withAuth";
import {compose} from "redux";


let mapStateToProps = (state)=>{
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newTextMessage: state.messagesPage.newTextMessage,
        isAuth: state.auth.isAuth,
    }
}
let mapDispatchToProps = (dispatch)=>{
    return {
        updateNewMessageText: (message)=>{
            dispatch(changeTextareaActionCreator(message));
        },
        addMessage: ()=>{
            dispatch(addMessageActionCreator())
        }
    }
}

compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuth,
)(Dialogs);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuth,
)(Dialogs);
/*
const DialogsWithAuth = withAuth(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsWithAuth);

export default DialogsContainer;*/
