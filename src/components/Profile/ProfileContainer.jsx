import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileStatusTC,
    getUserProfileThunkCreator,
    updateUserProfileStatusTC
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
// import {withAuth} from "../HOC/withAuth/withAuth";
import {compose} from "redux";
import {withAuth} from "../HOC/withAuth/withAuth";



class ProfileContainer extends React.Component {
    componentDidMount() {

        // let isAuth = this.props.auth.isAuth;
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);

    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
            // <ProfileWithAuth {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}

export default compose(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileThunkCreator,
        getUserStatus: getUserProfileStatusTC,
        updateUserStatus: updateUserProfileStatusTC,
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
