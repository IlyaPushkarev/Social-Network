/*DIALOG-REDUCER*/
export type dialogType = {
    name: string,
    id: number
}
export type messageType = {
    message: string,
    id: number
}
/*///////////////////////*/

/*PROFILE-REDUCER*/
export type PostType = {
    [FieldName: string]: number | string
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string,
    photos:PhotosType,
    contacts: {
        [socialName:string]:string
    }
}
/*/////////////////////////*/

/*USER-REDUCER*/
export type UserType = {
    id: number,
    name: string,
    status: string,

}
/*///////////////////////*/