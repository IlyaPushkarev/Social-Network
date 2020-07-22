import React from "react";
import classes from "./users.module.css";
import userPhoto from "../../assets/images/userMalePhoto.jpg"
import {NavLink} from "react-router-dom";
import Button from "../common/Button/Button";
import Preloader from "../common/Preloader/Preloader";
import PaginatorCreate from "../common/Pagination/Pagination";
import {UserType} from "../../types/types";

type UserPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>
    onPageChanged(pageNum:number):void
    follow(userId:number):void
    unfollow(userId:number):void
    isFetching:boolean
    followingInProgress:Array<number>
    isAuth:boolean
}

let Users: React.FC<UserPropsType> = (props:UserPropsType) => {
    // debugger
    if (props.isFetching) {
        return (<Preloader/>)
    }

    return (
        <div className={classes.users}>
            <div className={classes.usersContainer}>
                {
                    props.users.map(u => (
                            <div className={classes.userBox} key={u.id}>
                                <div className={classes.subscriptionWrapper}>
                                    <div className={classes.userBox__photo}>
                                        <NavLink to={'/profile/' + u.id}>
                                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                                 alt={"User"}/>
                                        </NavLink>
                                    </div>
                                    {props.isAuth &&
                                    <div className={classes.userBox__btn}>
                                        {
                                            u.followed
                                                ? <Button disabled={props.followingInProgress.some(id => id === u.id)}
                                                          onClick={() => props.unfollow(u.id)} /*thunk-функция*!*/
                                                          text={"Unfollow"}
                                                />

                                                : <Button disabled={props.followingInProgress.some(id => id === u.id)}
                                                          onClick={() => props.follow(u.id)} /*thunk-функция*!*/
                                                          text={"Follow"}/>
                                        }
                                    </div>
                                    }
                                </div>
                                <div className={classes.userBox__description}>

                                    <div className={classes.description__item}><span>Name: </span>{u.name}</div>
                                    <div className={classes.description__item}><span>Status: </span>{u.status}</div>

                                    <div className={classes.description__item}>
                                        <div>{"u.location.country"}</div>
                                        <div>{"u.location.city"}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            <PaginatorCreate limitionAmountPages={20}
                             totalCountItems={props.totalUsersCount}
                             pageSize={props.pageSize}
                             onChangePage={props.onPageChanged}
                             currentPage={props.currentPage}
            />
        </div>
    )
}

export default Users;