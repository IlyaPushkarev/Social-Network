import MockAdapter from "axios-mock-adapter";
import API from "../api/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {rootStateType} from "./redux-store";
import authReducer, {
    ActionsTypes,
    setAuthUserData,
    getCaptchaUrlSuccess,
    setIsFetchingAuth,
    initialStateAuthType,
    getAuthUserData
} from "./auth-reducer";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_SUCCESS = "auth/GET_CAPTCHA_SUCCESS";
const SET_IS_FETCHING_AUTH = 'auth/SET_IS_FETCHING_AUTH'

type DispatchExts = ThunkDispatch<rootStateType, void, ActionsTypes>;
const middlewares = [thunk];
const mockStore = configureMockStore<rootStateType, DispatchExts>(middlewares);


describe('auth sync actions', () => {
    it('should create action to set user auth data', function () {
        const userId = 12, email = "temp@gmail.com", login = "Name_1", isAuth = true;
        const expectedAction: ActionsTypes = {
            type: SET_USER_DATA,
            data: {
                email,
                id: userId,
                isAuth,
                login
            }
        }
        expect(setAuthUserData(userId, email, login, isAuth)).toEqual(expectedAction)
    });

    it('should create action to successful get captcha url', () => {
        const captchaUrl = "someCaptchaUrl";
        const expectedAction: ActionsTypes = {
            type: GET_CAPTCHA_SUCCESS,
            captchaUrl
        }
        expect(getCaptchaUrlSuccess(captchaUrl)).toEqual(expectedAction)
    })

    it('should create action to set isFetchingUserAuthData in true', () => {
        const isFetching = true
        const expectedAction: ActionsTypes = {
            type: SET_IS_FETCHING_AUTH,
            isFetchingUserAuthData: isFetching
        }
        expect(setIsFetchingAuth(isFetching)).toEqual(expectedAction)
    })
})

describe('auth reducer', () => {

    it('SET_IS_FETCHING_AUTH', () => {
        const prevState: initialStateAuthType = {
            id: null,
            email: null,
            login: null,
            isFetchingUserAuthData: false,
            isAuth: false,
            captchaUrl: null,
        }
        const action: ActionsTypes = {
            type: SET_IS_FETCHING_AUTH,
            isFetchingUserAuthData: true
        }
        expect(authReducer(prevState, action)).toEqual({
            ...prevState,
            isFetchingUserAuthData: true
        })
    })

    it('SET_USER_DATA', () => {
        const prevState: initialStateAuthType = {
            id: null,
            email: null,
            login: null,
            isFetchingUserAuthData: false,
            isAuth: false,
            captchaUrl: null,
        }
        const userId = 12, email = "temp@gmail.com", login = "Name_1", isAuth = true;
        const action: ActionsTypes = {
            type: SET_USER_DATA,
            data: {
                email,
                id: userId,
                isAuth,
                login
            }
        }
        expect(authReducer(prevState, action)).toEqual({
            ...prevState,
            id: userId,
            email,
            login,
            isAuth,

        })
    })

    it('GET_CAPTCHA_SUCCESS', () => {
        const prevState: initialStateAuthType = {
            id: null,
            email: null,
            login: null,
            isFetchingUserAuthData: false,
            isAuth: false,
            captchaUrl: null,
        }
        const captchaUrl = "someCaptchaUrl"
        const action: ActionsTypes = {
            type: GET_CAPTCHA_SUCCESS,
            captchaUrl
        }
        expect(authReducer(prevState, action)).toEqual({
            ...prevState,
            captchaUrl
        })
    })
})

describe('auth thunks', () => {
    let store = mockStore();

    const mock = new MockAdapter(API);
    const getAuthUserDataMock = () => mock.onGet(`auth/me`).reply(200, {
        data: {
            id: 12,
            email: "temp@gmail.com",
            login: "Name_1"
        }
    })
    /*
    const loginSuccessMock = (login:string, password:string, rememberMe:boolean,captchaText:string) =>{
        return mock.onPost('auth/login').reply(200,{
            resultCode: 0
        })
    }
    const loginFailureMock = (login:string, password:string, rememberMe:boolean,captchaText:string) =>{
        return mock.onPost('auth/login').reply(200,{
            resultCode: 1
        })
    }
*/
    beforeEach(() => {
        store = mockStore();
    });

    it('get auth user data when fetching has been done', async (done) => {
        const userId = 12, email = "temp@gmail.com", login = "Name_1", isAuth = true;
        const expectedActions: Array<ActionsTypes> = [
            {
                type: SET_IS_FETCHING_AUTH,
                isFetchingUserAuthData: true
            },
            {
                type: SET_IS_FETCHING_AUTH,
                isFetchingUserAuthData: false
            },
            {
                type: SET_USER_DATA,
                data: {
                    email,
                    id: userId,
                    isAuth,
                    login
                }
            }
        ]
        getAuthUserDataMock()
        return store.dispatch(getAuthUserData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    // it("successful login",async(done)=>{})
})