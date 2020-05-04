import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navBarReducer from "./navBar-reducer";
import usersReducer from "./users-reducer";
import newsReducer from "./news-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navBar: navBarReducer,
    usersPage: usersReducer,
    newsPage: newsReducer,
    auth: authReducer
});
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;