import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from "./LoginForm.module.css";
import styles from "../../common/FormsControls/FormsControls.module.css";
import Button from "../../common/Button/Button";
import {Input} from "../../common/FormsControls/FormsControls";
import {requiredField} from "../../../utils/validators/validators";

const required = value => value ? undefined : 'Required'

let LoginForm = (props)=>{
    // debugger
    return (
        <form onSubmit={props.handleSubmit}>
            <div >
                <Field className={classes.input}
                       name={"login"}
                       type="text"
                       placeholder="Login"
                       component={Input}
                       validate={[requiredField,]}
                />

            </div>
            <div >
                <Field className={classes.input}
                       name={"password"}
                       type="password"
                       placeholder="Password"
                       component={Input}
                       validate={[requiredField,]}
                />
            </div>
            <div className={classes.checkbox}>
                <Field name={"rememberMe"} type="checkbox" component={"input"}/>remember me
            </div>
            {
                props.error && <div className={styles.form_summary_error}>
                    <p>{props.error}</p>
                </div>
            }
            {props.captchaUrl
            && <div>
                <img src={props.captchaUrl} alt="captcha"/>
                <Field name={"captchaText"} type={"text"} component={"input"} validate={required}/>
            </div>}
            <div>
                <Button text={"Login"} onClick={props.handleSubmit}></Button>
                {/*<button>Login</button>*/}
            </div>
        </form>

    )
}
LoginForm = reduxForm({
    form: "login"
})(LoginForm);

export default  LoginForm;