import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: string
    isLoadedProfile: boolean
    isLoadedStatus: boolean
    isOwner:boolean

    savePhoto: (src:File)=>void
    updateProfileInfo:(obj:ProfileType,authorizedUserId:string)=>void
    updateUserStatus:(status:string)=>void
}
const Profile: React.FC<PropsType> = (props)=>{
    // debugger
    if(!props.isLoadedProfile){
        alert("Profile wasn't loaded")
        return <Redirect to={`/`}/>
    }
    if(!props.profile){
            return <Preloader />
    }

    return (
        <div className={classes.content}>
            <div className={classes.profile}>
            <ProfileInfo  {...props} profile={props.profile}/>
            <MyPostsContainer />
            </div>
        </div>
    )
}
export default Profile;