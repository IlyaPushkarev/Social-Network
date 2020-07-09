import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileStatusTC,
    getUserProfileThunkCreator, setMainPhotoProfile, updateProfileInfo,
    updateUserProfileStatusTC
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
// import {withAuth} from "../HOC/withAuth/withAuth";
import {compose} from "redux";
import {withAuth} from "../HOC/withAuth/withAuth";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }
    checkOwner(){
        if(this.props.match.params.userId){
            return +this.props.match.params.userId === +this.props.authorizedUserId
        }
        return !!this.props.authorizedUserId
    }
    componentDidMount() {
        // let isAuth = this.props.auth.isAuth;
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        // console.log(this.checkOwner())
        return (
            <Profile profile={this.props.profile}
                     isOwner={this.checkOwner()}
                     {...this.props}
            />
            // <ProfileWithAuth {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    // console.log("mapStateToPros profile")
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isLoadedProfile: state.profilePage.isLoadedProfile,
        isLoadedStatus: state.profilePage.isLoadedStatus
    }
}

export default compose(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileThunkCreator,
        getUserStatus: getUserProfileStatusTC,
        updateUserStatus: updateUserProfileStatusTC,
        savePhoto: setMainPhotoProfile,
        updateProfileInfo: updateProfileInfo
    }),
    withRouter,
    withAuth
)(ProfileContainer)

/*
let ProfileWithAuth = withAuth(ProfileContainer)/!*isAuth приходит в props*!/

let WithUrlDataContainerComponent = withRouter(ProfileWithAuth);/!*Что бы получить данные из URL*!/

export default connect(mapStateToProps, {

    getUserProfile: getUserProfileThunkCreator,
})(WithUrlDataContainerComponent);
*/
