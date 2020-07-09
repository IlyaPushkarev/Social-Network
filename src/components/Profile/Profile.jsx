import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";


const Profile = (props)=>{
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
            <ProfileInfo profile={props.profile} {...props}/>
            <MyPostsContainer profile={props.profile}/>
            </div>
        </div>
    )
}
export default Profile;