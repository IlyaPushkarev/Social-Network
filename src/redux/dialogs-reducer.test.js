import {addMessageActionCreator} from "./dialogs-reducer";

it('should create an action to send a message', function () {
    const message = "It's message for test";
    const expectedAction = {
        type: "ADD-MESSAGE", // VALUE OF SEND_MESSAGE
        newMessage: message
    }
    expect(addMessageActionCreator(message)).toEqual(expectedAction)
});