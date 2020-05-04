let messages = [
    {message: "Hi", id: 1},
    {message: "How are you", id: 2},
    {message: "Yo", id: 3},
    {message: "React cool", id: 4},
    {message: "I know", id: 5},
    {message: ")", id: 6},
    {message: "Do you love this app?", id: 7}
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

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = "ADD-MESSAGE";

let initialState = {
    dialogs,
    messages,
    newTextMessage: " "

}
const dialogsReducer = (state = initialState, action) => {
    let stateCopy;

    switch (action.type) {
        case SEND_MESSAGE:
            let body =  state.newTextMessage;
            state.messages.push({message: body, id: state.messages.length + 1});

             return{
                ...state,
                 newTextMessage: " ",
                messages: [...state.messages]
            };

        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newTextMessage: action.newText
            };

        default:
            return state;
    }
}

export const changeTextareaActionCreator = (message) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: message,
    }
}

export const addMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}

export default dialogsReducer;