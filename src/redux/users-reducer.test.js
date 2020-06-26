import {followSuccess, getUsersThunkCreator, setUsersAC} from "./users-reducer";
import moxios from "moxios";
import configureMockStore from "redux-mock-store"
import thunkMiddleware from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};
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
describe("users thunk",()=>{
    let store;
    beforeEach(()=>{
        moxios.install();
        store = mockStore(initialState);
    });
    afterEach(()=>{
        moxios.uninstall()
    });
    it('get users when fetching has been done', function (done) {

        const currentPage = 1,
            totalUsersCount = 100,
            page = 1,
            pageSize = 6;

        let usersList = []


        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:{
                    items:[]
                }
            })
        })

        const expectedActions = [
            {
                type: TOGGLE_IS_FETCHING,
                isFetching: false
            },
            {
                type: SET_CURRENT_PAGE,
                currentPage: currentPage
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

        return store.dispatch(getUsersThunkCreator(page,pageSize)).then(()=>{
            const actualActions = store.getActions();

            expect(actualActions).toEqual(expectedActions)
            done();
        })
    });
})
