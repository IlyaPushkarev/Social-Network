import React from "react";
import {Field, FormSection, reduxForm} from "redux-form";
import {connect} from "react-redux";
//import {connect} from "react-redux";
const required = value => {
    // console.log(value)
    return value !== undefined ? undefined : 'Required'
}
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength55 = maxLength(55)

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)
const minLength10 = minLength(10)

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} />
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

let Contacts = (props)=>{
    return(
        <>
            <Field
                name={"github"}
                type={"text"}
                component={renderField}
                label={"GitHub: "}
            />
            <Field
                name={"vk"}
                type={"text"}
                component={renderField}
                label={"VK: "}
            />
            <Field
                name={"facebook"}
                type={"text"}
                component={renderField}
                label={"Facebook: "}
            />
        </>
    )
}
let EditingProfileForm = (props)=>{
    const {handleSubmit, submitting,pristine} = props;

    return(
        <form onSubmit={handleSubmit}>
            <Field
                name={"fullName"}
                type={"text"}
                component={renderField}
                label={"Full name:"}
                validate={[required,maxLength55,minLength2]}
            />
            <Field
                name={"aboutMe"}
                type={"text"}
                component={renderField}
                label={"About me:"}
                validate={[required,minLength10]}
            />
           <div>
               <label>Looking for a job</label>
                       <Field
                           name="lookingForAJob"
                           component={renderField}
                           type="checkbox"
                           />

                   {/*<label>No
                       <Field
                           name="lookingForAJob"
                           component={renderField}
                           type="radio"
                           value="false"/>
                   </label>*/}
           </div>
            <Field
                name={"lookingForAJobDescription"}
                type={"text"}
                component={renderField}
                label={"Job description:"}
                validate={required}
            />
            <FormSection name={"contacts"}>
                <Contacts/>
            </FormSection>
            <button type="submit" disabled={submitting || pristine}>
                Edit
            </button>
        </form>
    )
}


EditingProfileForm = reduxForm({
    form: "editingProfileForm"
})(EditingProfileForm)

/*
const selector = formValueSelector('editingProfileForm')
EditingProfileForm = connect((state) => {
    const lookingJobValue = selector(state.form.EditingProfileForm, "lookingForAJob");
    // debugger
    return {
        lookingJobValue
    }
})(EditingProfileForm)
*/
EditingProfileForm = connect(
    state => ({
        initialValues: state.profilePage.profile // pull initial values from account reducer
    }),
)(EditingProfileForm)

export default EditingProfileForm;