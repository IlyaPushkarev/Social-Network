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
    message: string
    id: number
    likesCount: number
    dislikeCount: number
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string,
    photos: PhotosType,
    contacts: {
        [socialName: string]: string
    }
}
/*/////////////////////////*/

/*USER-REDUCER*/
export type UserType = {
    id: number,
    name: string,
    status: string | null,
    photos: PhotosType
    followed: boolean | null

}
/*///////////////////////*/

/*NEWS-REDUCER*/
export type articleType = {
    source: {
        id: null | number,
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string

}
/*[fieldName:string]:string ,*/
/*///////////////////////////*/
