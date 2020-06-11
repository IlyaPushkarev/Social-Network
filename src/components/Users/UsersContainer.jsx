import React from "react";
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator,
    setCurrentPageAC,
    toggleFollowingProgress,
    unfollowThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";


class UsersContainer extends React.Component {
    componentDidMount() {this.props.getUsers(this.props.currentPage, this.props.pageSize);}
    onPageChanged = (pageNum) => {this.props.getUsers(pageNum, this.props.pageSize);}
    render() {
        return <>
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   isFetching={this.props.isFetching}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        toggleIsFetchingAC: (isFetching)=>{
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}*/

/*
export default connect(mapStateToProps, {/!*Ссылки на функцию(объект) action creator (AC)*!/
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    setCurrentPage: setCurrentPageAC,
    toggleFollowingProgress,
    getUsers: getUsersThunkCreator/!*используеться результат вызова getUsersThunkCreator*!/

})(UsersContainer);*/

export default compose(

    // withAuth,
    connect(mapStateToProps, {/*Ссылки на функцию(объект) action creator (AC)*/
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator,
        setCurrentPage: setCurrentPageAC,
        toggleFollowingProgress,
        getUsers: getUsersThunkCreator/*используеться результат вызова getUsersThunkCreator*/

    })
)(UsersContainer)
