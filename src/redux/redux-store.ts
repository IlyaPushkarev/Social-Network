import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navBarReducer from "./navBar-reducer";
import usersReducer from "./users-reducer";
import newsReducer from "./news-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navBar: navBarReducer,
    usersPage: usersReducer,
    newsPage: newsReducer,
    auth: authReducer,
    form: formReducer
});
export let store = createStore(reducers,applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
export type rootStateType = ReturnType<typeof reducers>
// export default store;