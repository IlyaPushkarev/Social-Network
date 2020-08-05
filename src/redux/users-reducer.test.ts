import usersReducer, {
    ActionsTypes,
    followSuccess,
    getUsersThunkCreator,
    setUsersAC,
    unfollowSuccess,
    setCurrentPageAC,
    setTotalUsersCountAC,
    toggleIsFetchingAC, toggleFollowingProgress, initialState, followThunkCreator, unfollowThunkCreator
} from "./users-reducer";
import MockAdapter from "axios-mock-adapter";
import API from "../api/api";
import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { UserType} from "../types/types";
import {rootStateType} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type DispatchExts = ThunkDispatch<rootStateType, void, ActionsTypes>;

const middlewares = [thunk];
const mockStore = configureMockStore<rootStateType,DispatchExts>(middlewares);

const usersList = [
        {
            followed: true,
            id: 9022,
            name: "andrey5",
            status: null,
            uniqueUrlName: null,
            photos:{
                small: "url/somePhoto",
                large: null
            }
        }
    ],
    currentPage = 1,
    totalUsersCount = 100;

describe("users sync actions",()=>{

    it('should create action successful user subscription', function () {
        const userId = 12;
        const expectedAction = {
            type: FOLLOW,
            userId
        }
        expect(followSuccess(userId)).toEqual(expectedAction)
    });

    it('should create action successful user unfollow', function () {
        const userId = 12;
        const expectedAction = {
            type: UNFOLLOW,
            userId
        }
        expect(unfollowSuccess(userId)).toEqual(expectedAction)
    });

    it('should create action to set users', function () {
        const users:Array<UserType> = usersList;
        const expectedAction = {
            type: "SET-USERS",
            users,
        }
        expect(setUsersAC(users)).toEqual(expectedAction)
        expect(setUsersAC(users).users.length).toBe(1)
    });

    it('should create action to set current page number', function () {
        const currPageNum = 10
        const expectedAction = {
            type:SET_CURRENT_PAGE,
            currentPage: currPageNum
        }

        expect(setCurrentPageAC(currPageNum)).toEqual(expectedAction)
        expect(setCurrentPageAC(currPageNum+1)).not.toEqual(expectedAction)
    });

    it('should create action to set total user amount', function () {
        const totalUserCount = 1000
        const expectedAction = {
            type:SET_TOTAL_USERS_COUNT,
            count:totalUserCount
        }
        expect(setTotalUsersCountAC(totalUserCount)).toEqual(expectedAction)
    });

    it('should set isFetching in true', function () {
        const isFetching = true
        const expectedAction = {
            type:TOGGLE_IS_FETCHING,
            isFetching
        }
        expect(toggleIsFetchingAC(isFetching)).toEqual(expectedAction)
        expect(toggleIsFetchingAC(!isFetching)).not.toEqual(expectedAction)
    });

    it('should set following progress in true', function () {
        const isFetching = true;
        const userId = 13;
        const expectedAction ={
            type:TOGGLE_IS_FOLLOWING_PROGRESS,
            isFetching,
            userId
        }

        expect(toggleFollowingProgress(isFetching,userId)).toEqual(expectedAction)
    });
})

describe('users reducer',()=>{
    it('FOLLOW', function () {
        const prevState = {
            users: usersList,
            pageSize: 100,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: true,
            followingInProgress: [],
        };
        const action:ActionsTypes = {
            type: FOLLOW,
            userId: 9022
        }
        expect(usersReducer(prevState,action)).toEqual({
            ...prevState,
            users: prevState.users.map(u => {
                if (u.id === action.userId) {
                    return {...u, followed: true}
                }
                return u
            })
        })
    });

    it('UNFOLLOW', function () {
        const prevState = {
            users: usersList,
            pageSize: 100,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: true,
            followingInProgress: [],
        };
        const action:ActionsTypes = {
            type: UNFOLLOW,
            userId: 9022
        }
        expect(usersReducer(prevState,action)).toEqual({
            ...prevState,
            users: prevState.users.map(u => {
                if (u.id === action.userId) {
                    return {...u, followed: false}
                }
                return u
            })
        })
    });

    it('SET_USERS', function () {
        const action:ActionsTypes = {
            type:SET_USERS,
            users: usersList
        }
        expect(usersReducer(initialState,action)).toEqual({
            ...initialState,
            users: action.users
        })
    });

    it('SET_CURRENT_PAGE', function () {
        const currentPage = 56;

        const action:ActionsTypes = {
            type: SET_CURRENT_PAGE,
            currentPage
        }
        expect(usersReducer(initialState,action)).toEqual({
            ...initialState,
            currentPage
        })
    });

    it('SET_TOTAL_USERS_COUNT', function () {
        const count = 120
        const action:ActionsTypes = {
            type: SET_TOTAL_USERS_COUNT,
            count
        }
        expect(usersReducer(initialState,action)).toEqual({
            ...initialState,
            totalUsersCount:count
        })
    });

    it('TOGGLE_IS_FETCHING in true',()=>{
        const action:ActionsTypes = {
            type: TOGGLE_IS_FETCHING,
            isFetching: true
        }
        expect(usersReducer(initialState,action)).toEqual({
            ...initialState,
            isFetching: true
        })
    })

    it('TOGGLE_IS_FOLLOWING_PROGRESS', function () {
        const userId = 145;
        const action:ActionsTypes = {
            type: TOGGLE_IS_FOLLOWING_PROGRESS,
            isFetching: true,
            userId: userId
        }
        expect(usersReducer(initialState,action)).toEqual({
            ...initialState,
            followingInProgress: [userId]
        })
    });
})

describe("users thunk", () => {
    const mock = new MockAdapter(API);
    const getUserMock = () => mock.onGet(/users\?page=\d&count=\d/).reply(200, {
        items: usersList,
        totalCount: 100
    })
    const followMock = (userId:number) => mock.onPost(`follow/${userId}`).reply(200,{
        resultCode:0,
    })
    const unfollowMock = (userId:number) => mock.onDelete(`follow/${userId}`).reply(200,{
        resultCode:0,
    })

    let store = mockStore();

    beforeEach(() => {
        store = mockStore();
        // store = mockStore(initialState);
    });

    it('get users when fetching has been done (getUsersTC)', async function (done) {
        const expectedActions = [
            {
                isFetching: true,
                type: TOGGLE_IS_FETCHING
            },
            {
                type: SET_CURRENT_PAGE,
                currentPage: currentPage
            },
            {
                type: TOGGLE_IS_FETCHING,
                isFetching: false
            },
            {
                type: SET_USERS,
                users: usersList
            },
            {
                type: SET_TOTAL_USERS_COUNT,
                count: totalUsersCount
            }
        ]

        getUserMock();

        return store.dispatch(getUsersThunkCreator(1, 5)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        })
    });

    it('follow success (followTC)', async function (done) {
        const userId = 1;

        const expectedActions:Array<ActionsTypes> = [
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                isFetching: true,
                userId
            },
            {
                type: FOLLOW,
                userId
            },
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                isFetching: false,
                userId
            }
        ];

        followMock(1);

        return store.dispatch(followThunkCreator(userId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        })
    });

    it('unfollow success (unfollowTC)', async function (done) {
        const userId = 1;

        const expectedActions:Array<ActionsTypes> = [
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                isFetching: true,
                userId
            },
            {
                type: UNFOLLOW,
                userId
            },
            {
                type: TOGGLE_IS_FOLLOWING_PROGRESS,
                isFetching: false,
                userId
            }
        ];

        unfollowMock(1);

        return store.dispatch(unfollowThunkCreator(userId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        })
    });

    afterAll(()=>{
        mock.reset();
    })
})
