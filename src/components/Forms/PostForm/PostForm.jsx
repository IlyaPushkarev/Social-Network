import React from "react";
import {Field, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

let PostForm = (props)=>{
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
                <Button onClick={props.handleSubmit}
                        text={"ADD POST"}/>
            </div>
        </form>
    )
}

PostForm = reduxForm({
    form: "post"
})(PostForm);

export default PostForm;