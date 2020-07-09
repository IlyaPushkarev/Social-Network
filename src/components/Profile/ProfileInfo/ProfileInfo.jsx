import React, {useState} from "react";
import classes from "./ProfileInfo.module.css";
// import ProfileStatus from "./ProfileStatus/ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/userMalePhoto.jpg";
import EditingProfileForm from "../../Forms/EditingProfileForm/EditingProfileForm";

const ProfileData = (props) => {
    // debugger
    const [isEditMode, setIsEditMode] = useState(false);

    const createContact = (obj) => {
        let fragment = [];

        for (let contact in obj) {

            if (obj[contact]) {
                fragment.push({
                    name: contact,
                    value: obj[contact],
                });
            }
        }
        return fragment;
    }
    let contactElements = createContact(props.profile.contacts);
    // debugger
    const onLoadMainPhoto = (e) => {
        if (e.currentTarget.files.length > 0) {
            props.savePhoto(e.currentTarget.files[0])
        }
        e.currentTarget.value = ""
    }
    const updateProfileData = (formData)=>{
        console.log(formData)
        props.updateProfileInfo(formData,props.authorizedUserId)
        setIsEditMode(false)
    }
    return (
        isEditMode
            ? <><div onClick={()=>setIsEditMode(false)}>"Close" </div>
                <EditingProfileForm onSubmit={updateProfileData} />
            </>
            : <div className={classes.userProfileDescription}>
                <div className={classes.userProfileDescription__header}>
                    <h3>User</h3>
                </div>
                <div className={classes.userProfileDescription__body}>
                    <div className={classes.userAvatar}>
                        {props.profile.photos.large ? <img src={props.profile.photos.large} alt=""/> :
                            <img src={userPhoto} alt=""/>}
                        {props.isOwner && <input type="file" onChange={onLoadMainPhoto}/>}
                    </div>
                    <div className={classes.userInfo}>
                            <div className={classes.userInfo__userName}>
                                <div className={classes.userInfo__item}><span>Status: </span> <ProfileStatusWithHooks
                                    status={props.status} updateUserStatus={props.updateUserStatus} {...props}/></div>
                            </div>
                            <div className={classes.userInfo__userName}>
                                <div className={classes.userInfo__item}><span>Username: </span>{props.profile.fullName}
                                </div>
                            </div>
                            <div className={classes.userInfo__about}>
                                <div className={classes.userInfo__item}><span>About me: </span>{props.profile.aboutMe}
                                </div>
                            </div>
                            <div className={classes.userInfo__lookingJob}>
                                <div className={classes.userInfo__item}>
                                    <span>Looking for job: </span>{props.profile.lookingForAJob ? "Yes" : "No"}</div>
                                {props.profile.lookingForAJob
                                && <div className={classes.userInfo__item}>
                                    <span>Profession skills: </span>{props.profile.lookingForAJobDescription}</div>}
                            </div>
                            <div className={classes.userInfo__contact}>
                                <div className={classes.userInfo__item}>
                                    <span>Contact:</span>
                                    {
                                        contactElements.map((c, i) => (<p className={classes.contactWrapper} key={i}>
                                                    <span className={classes.contact__name}>{c.name}:</span>
                                                    <span className={classes.contact__value}><a
                                                        href={c.value}>{c.value}</a></span>
                                                </p>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                </div>
                <div onClick={()=>setIsEditMode(true)}>"Edit"</div>
            </div>
    )
}
const ProfileInfo = (props) => {
    // debugger
    if (!props.profile) {
        return
    }

    return (<div className={classes.userProfileInfo}>
              <ProfileData {...props}/>
        </div>
    )
}

export default ProfileInfo;