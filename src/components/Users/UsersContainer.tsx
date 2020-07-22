import React from "react";
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator,
    unfollowThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    requestUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {rootStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUsers(currPAge: number, pageSize: number): void
    follow(userId: number): void
    unfollow(userId: number): void
}

type OwnPropsType = {
    // title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNum: number) => {
        this.props.getUsers(pageNum, this.props.pageSize);
        // this.props.setCurrentPage(pageNum)
    }

    render() {

        // console.log("render users")
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
                   isAuth={this.props.isAuth}
            />
        </>
    }
}

let mapStateToProps = (state: rootStateType) => {
    // console.log("mapStateToPros users")
    return {
        users: requestUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth
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
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType,
        rootStateType>(mapStateToProps, {/*Ссылки на функцию(объект) action creator (AC)*/
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator,
        // setCurrentPage: setCurrentPageAC,
        // toggleFollowingProgress,
        getUsers: getUsersThunkCreator/*используеться результат вызова getUsersThunkCreator*/,
    })
)(UsersContainer)
