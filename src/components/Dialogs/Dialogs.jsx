import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import MessageForm from "../Forms/MessageForm/MessageForm";


const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map((d,i) => <DialogItem name={d.name} id={d.id} key={d.id}/>);

    let messagesElements = props.messages.map((m,i) => <Message message={m.message} key={m.id}/>);

    let onSendMessage = (formData)=>{
        props.addMessage(formData.newMessage);
        formData.newMessage = "";
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

{
                           /*
                            <textarea ref={newMessageElem} onChange={onChangeTextarea} value={props.newTextMessage}></textarea>
                            <button onClick={onAddMessage}>Send</button>
                            <Button onClick={onAddMessage} text={"SEND"}/>
                            */
}
                            <MessageForm onSubmit = {onSendMessage}
                            />
                </div>
            </div>

        </div>
    )
}

export default Dialogs;