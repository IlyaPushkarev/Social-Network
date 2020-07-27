export type FieldValidatorType = (value:string)=>string | undefined

export const requiredField:FieldValidatorType = value =>{
    // debugger
    if(value){
        return undefined
    }else{
        return "Field is required"
    }
}

export const maxLengthCreator = (maxLength:number):FieldValidatorType=>{
    return (value)=>{
        if(value && value.length > maxLength) return `Max length is ${maxLength} symbols`

        return undefined;
    }
}
