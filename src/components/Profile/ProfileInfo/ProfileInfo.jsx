import React from "react";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus"

const ProfileInfo = (props) => {
    if (!props.profile) {
        return
    }

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


    return (<div className={classes.userProfileInfo}>
            <div className={classes.userProfileDescription}>
                <div className={classes.userProfileDescription__header}>
                    <h3>User</h3>
                </div>
                <div className={classes.userProfileDescription__body}>
                    <div className={classes.userAvatar}>
                        <img src={props.profile.photos.large} alt=""/>
                    </div>
                    <div className={classes.userInfo}>
                        <div className={classes.userInfo__userName}>
                            <div className={classes.userInfo__item}><span>Status: </span> <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/> </div>
                        </div>
                        <div className={classes.userInfo__userName}>
                            <div className={classes.userInfo__item}><span>Username: </span>{props.profile.fullName}</div>
                        </div>
                        <div className={classes.userInfo__about}>
                            <div className={classes.userInfo__item}><span>About me: </span>{props.profile.aboutMe}</div>
                        </div>
                        <div className={classes.userInfo__contact}>
                            <div className={classes.userInfo__item}>
                            <span>Contact:</span>
                                {
                                    contactElements.map((c, i) => (<p className={classes.contactWrapper} key={i}>
                                                <span className={classes.contact__name}>{c.name}:</span>
                                                <span className={classes.contact__value}><a href={c.value}>{c.value}</a></span>
                                        </p>
                                        )
                                    )
                                }
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo;