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
import {rootStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";
import {RouteComponentProps} from "react-router"

type RouteParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: string
    isLoadedProfile: boolean
    isLoadedStatus: boolean
}
type MapDispatchPropsType = {
    getUserProfile: ( userId: string)=>void
    getUserStatus: (userId:string)=>void
    updateUserStatus: (status:string)=>void
    savePhoto: (photo:File)=>void
    updateProfileInfo: (profileInfo: ProfileType,userId: string)=>void
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<RouteParamsType>

class ProfileContainer extends React.Component<PropsType> {
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

    componentDidUpdate(prevProps:PropsType, prevState:MapStatePropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        // console.log(this.checkOwner())
        // debugger
        return (
            <Profile {...this.props}
                profile={this.props.profile}
                     isOwner={this.checkOwner()}

            />
            // <ProfileWithAuth {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state:rootStateType) => {
    // console.log("mapStateToPros profile")
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isLoadedProfile: state.profilePage.isLoadedProfile,
        isLoadedStatus: state.profilePage.isLoadedStatus,
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
