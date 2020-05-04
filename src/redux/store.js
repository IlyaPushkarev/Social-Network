/*
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navBarReducer from "./navBar-reducer";

let posts = [
    {message: "Hi, how are you?", id: 1, likesCount: 11, dislikeCount: 5},
    {message: "It's my first post", id: 2, likesCount: 11, dislikeCount: 5},
    {message: "Development", id: 3, likesCount: 11, dislikeCount: 5},
];

let dialogs = [
    {name: "Dimych", id: 1},
    {name: "Andrey", id: 2},
    {name: "Sveta", id: 3},
    {name: "Sasha", id: 4},
    {name: "Viktor", id: 5},
    {name: "Valera", id: 6},
    {name: "Ilya", id: 7},
];

let messages = [
    {message: "Hi", id: 1},
    {message: "How are you", id: 2},
    {message: "Yo", id: 3},
    {message: "React cool", id: 4},
    {message: "I know", id: 5},
    {message: ")", id: 6},
    {message: "Do you love this app?", id: 7}
];

let friends = [
    {id: "1", url: "https://wow.zamimg.com/uploads/screenshots/small/661497.jpg"},
    {id: "2", url: "https://wow.zamimg.com/uploads/screenshots/normal/661505-battle-net-avatars.jpg"},
];

let store = {
    _state: {
        profilePage: {
            posts,
            newTextPost: "it-comasutra.com"

        },

        messagesPage: {
            dialogs,
            messages,
            newTextMessage: " "
        },

        navBar: {
            friends
        }
    },

    renderEntireTree: () => {
        console.log("state changed")
    },

    get State() {
        return this._state;
    },

    subscribe(observer) {
        this.renderEntireTree = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.navBar = navBarReducer(this._state.navBar, action);

        this.renderEntireTree(this.state);

    }

}

export default store;
window.store = store;*/
