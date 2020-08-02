import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";
import {requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

export type MessageFormValuesType = {
    newMessage : string
}

export type MessageOwnFormProps = {

}
let MessageForm:React.FC<InjectedFormProps<MessageFormValuesType,MessageOwnFormProps>&MessageOwnFormProps> = (props)=>{
    // debugger
    const { pristine, submitting } = props

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newMessage"}
                       type="text"
                       placeholder="Insert message"
                       component={Textarea}
                       validate={[requiredField]}
                />
            </div>
            <div>
                <Button text={"SEND"} disabled={pristine || submitting} />
            </div>
        </form>

    )
}
let MessageReduxForm = reduxForm<MessageFormValuesType,MessageOwnFormProps>({
    form: "message"
})(MessageForm);

export default  MessageReduxForm;