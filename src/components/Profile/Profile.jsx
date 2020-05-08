import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {Redirect} from "react-router-dom";

const Profile = (props)=>{
    if(!props.profile){
        return <Preloader />
    }

    return (
        <div className={classes.content}>
            <section className={classes.profile}>
            <ProfileInfo profile={props.profile} {...props}/>
            <MyPostsContainer />
            </section>
        </div>
    )
}

export default Profile;