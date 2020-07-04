import {followSuccess, getUsersThunkCreator, setUsersAC} from "./users-reducer";
import MockAdapter from "axios-mock-adapter";
import API from "../api/api";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

// const FOLLOW = "FOLLOW";
// const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

it('should create action successful user subscription', function () {
    const userId = 12;
    const expectedAction = {
        type: "FOLLOW",
        userId
    }
    expect(followSuccess(userId)).toEqual(expectedAction)
});

it('should create action to set users', function () {
    const users = [];
    const expectedAction = {
        type: "SET-USERS",
        users,
    }
    expect(setUsersAC(users)).toEqual(expectedAction)
});

const mock = new MockAdapter(API);
const getUserMock = () => mock.onGet(/users\?page=\d&count=\d/).reply(200, {items: [
        {
            followed: true,
            id: 9022, //was 9902
            name: "andrey5",
            status: null,
            uniqueUrlName: null
        }
    ],
    totalCount: 100
})

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};
const usersList = [
        {
            followed: true,
            id: 9022,
            name: "andrey5",
            status: null,
            uniqueUrlName: null
        }
    ],
    currentPage = 1,
    totalUsersCount = 100;

describe("users thunk", () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
    it('get users when fetching has been done', async function (done) {
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
})
