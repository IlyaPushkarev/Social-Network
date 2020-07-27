import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";
import {requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

export type LoginFormValuesType = {
    newMessage : string
}

export type LoginOwnFormProps = {

}
let MessageForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginOwnFormProps>&LoginOwnFormProps> = (props)=>{
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
let MessageReduxForm = reduxForm<LoginFormValuesType,LoginOwnFormProps>({
    form: "message"
})(MessageForm);

export default  MessageReduxForm;