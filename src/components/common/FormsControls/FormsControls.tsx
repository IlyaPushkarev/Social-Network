import React from "react";
import classes from "./FormsControls.module.css";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta:WrappedFieldMetaProps,
}

const FormControl: React.FC<FormControlPropsType> = ({ meta, children, ...props})=>{
    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : " ")}>
            {children}
            {hasError && <p><span>{meta.error}</span></p>}
        </div>
    )
}
export const Textarea: React.FC<WrappedFieldProps> = (props)=> {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props)=>{
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}  /></FormControl>
}

