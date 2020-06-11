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

const SEND_MESSAGE = "ADD-MESSAGE";

let initialState = {
    dialogs,
    messages,
}
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body =  action.newMessage;
            state.messages.push({message: body, id: state.messages.length + 1});

             return{
                ...state,
                 newTextMessage: " ",
                messages: [...state.messages]
            };

        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessage) => {
    return {
        type: SEND_MESSAGE,
        newMessage
    }
}

export default dialogsReducer;