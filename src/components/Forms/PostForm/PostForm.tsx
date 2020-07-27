import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

export type LoginFormValuesType = {
    newPost : string
}

export type LoginOwnFormProps = {

}
let PostForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginOwnFormProps>&LoginOwnFormProps> = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newPost"}
                       component={Textarea}
                       placeholder={"create post"}
                       validate ={[requiredField,maxLength10 ]}
                />

            </div>
            <div>
                <Button onClick={()=>props.handleSubmit}
                        text={"ADD POST"}/>
            </div>
        </form>
    )
}

let PostReduxForm = reduxForm<LoginFormValuesType,LoginOwnFormProps>({
    form: "post"
})(PostForm);

export default PostReduxForm;