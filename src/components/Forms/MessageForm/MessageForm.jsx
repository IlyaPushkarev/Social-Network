import React from "react";
import {Field, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";

import {requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

let MessageForm = (props)=>{
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
MessageForm = reduxForm({
    form: "message"
})(MessageForm);

export default  MessageForm;