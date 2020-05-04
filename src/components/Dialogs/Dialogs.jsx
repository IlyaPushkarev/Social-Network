import React from "react";
import classes from "./Dialogs.module.css";
// import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator, changeTextareaActionCreator} from "../../redux/dialogs-reducer";
import Button from "../common/Button/Button";
import {Redirect} from "react-router-dom";


const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map((d,i) => <DialogItem name={d.name} id={d.id} key={d.id}/>);

    let messagesElements = props.messages.map((m,i) => <Message message={m.message} key={m.id}/>);

    let newMessageElem = React.createRef();

    let onChangeTextarea = ()=>{
        let message = newMessageElem.current.value;
        props.updateNewMessageText(message)

    }
    let onAddMessage = ()=>{
        props.addMessage();
        // props.dispatch(addMessageActionCreator())
    }

    if(!props.isAuth){
        return (
            <Redirect to={"/login"} />
        )
    }
    return (
        <div className={classes.dialogs}>

            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.correspondence}>

                <div  className={classes.messages}>
                    {messagesElements}
                </div>

                <div className={classes.messageNew}>


                            <textarea ref={newMessageElem} onChange={onChangeTextarea} value={props.newTextMessage}></textarea>
                            {/*<button onClick={onAddMessage}>Send</button>*/}
                            <Button onClick={onAddMessage} text={"SEND"}/>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;