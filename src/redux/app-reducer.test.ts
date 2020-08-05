// import MockAdapter from "axios-mock-adapter";
// import thunk from 'redux-thunk'
// import configureMockStore from 'redux-mock-store'
// import {rootStateType} from './redux-store'
import appReducer, {ActionTypes, initializedSuccess, initialStateAppType} from "./app-reducer";
// import API from "../api/api";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

// type DispatchExts = ThunkDispatch<rootStateType, void, ActionTypes>

// const middlewares = [thunk];
// const mockStore = configureMockStore<rootStateType,DispatchExts>(middlewares)
// const mock = new MockAdapter(API)

describe('app sync actions',()=>{
    it('should set initialised in true ',()=>{
      const expectAction:ActionTypes = {
          type: INITIALIZED_SUCCESS,
          initialized: true
      }
      expect(initializedSuccess()).toEqual(expectAction)
    })
})

describe('app reducer',()=>{
    it('INITIALIZED_SUCCESS',()=>{
        const prevState:initialStateAppType = {
            initialized: false
        }
        const action:ActionTypes = {
            type: INITIALIZED_SUCCESS,
            initialized: true
        }

        expect(appReducer(prevState,action)).toEqual({
            ...prevState,
            initialized: true
        })
    })
})