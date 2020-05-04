import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunkCreator} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuth} from "../HOC/withAuth/withAuth";
import {compose} from "redux";


class ProfileContainer extends React.Component{
    componentDidMount() {

        let userId = this.props.match.params.userId;
        if(!userId){
            userId =`2`;
        }
        this.props.getUserProfile(userId);
    }

    render() {


        return(
            <Profile {...this.props} profile={this.props.profile}/>
            // <ProfileWithAuth {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state)=>{
    return {
        profile: state.profilePage.profile,
    }
}

export default compose(
    connect(mapStateToProps,{
        getUserProfile: getUserProfileThunkCreator,
    }),
    withRouter,
    withAuth
)(ProfileContainer)
/*

let ProfileWithAuth = withAuth(ProfileContainer)/!*isAuth приходит в props*!/



let WithUrlDataContainerComponent = withRouter(ProfileWithAuth);/!*Что бы получить данные из URL*!/

export default connect(mapStateToProps, {

    getUserProfile: getUserProfileThunkCreator,
})(WithUrlDataContainerComponent);*/
