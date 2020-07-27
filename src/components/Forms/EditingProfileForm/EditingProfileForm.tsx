import React from "react";
import {Field, FormSection, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {ProfileType} from "../../../types/types";
import {rootStateType} from "../../../redux/redux-store";
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form/lib/Field";
//import {connect} from "react-redux";
const required = (value:string) => {
    // console.log(value)
    return value !== undefined ? undefined : 'Required'
}
const maxLength = (max:number) => (value:string) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength55 = maxLength(55)

const minLength = (min:number) => (value:string) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)
const minLength10 = minLength(10)

type EditingProfileFormValuesType = ProfileType

type EditingProfileFormOwnPropsType = {

}

type ContactsProfileFormValuesType = {
    github:string
    vk:string
    facebook:string
    mail:string
}

type ContactsProfileFormOwnPropsType = {

}

type renderFieldParamsType = {
    meta: WrappedFieldMetaProps,
    input: WrappedFieldInputProps,
    label:string
    type: string
}
const renderField:React.FC<renderFieldParamsType> = ({
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

let Contacts:React.FC = (props)=>{
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

let EditingProfileForm:React.FC<InjectedFormProps<EditingProfileFormValuesType,EditingProfileFormOwnPropsType>&EditingProfileFormOwnPropsType> = (props)=>{
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


let EditingProfileReduxForm = reduxForm<EditingProfileFormValuesType,EditingProfileFormOwnPropsType>({
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

type MapStatePropsType = {
    initialValues: ProfileType
}
type MapDispatchPropsType = {

}
type OwnPropsType = {}

let EditingProfileReduxFormWithConnect = connect<{},EditingProfileFormOwnPropsType,{},rootStateType>(
    (state:rootStateType) => ({
        initialValues: state.profilePage.profile // pull initial values from account reducer
    }),
)(EditingProfileReduxForm)

export default EditingProfileReduxFormWithConnect;