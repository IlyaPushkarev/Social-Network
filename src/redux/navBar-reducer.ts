let initialState = {
    friends: [
        {id: "1", url: "https://wow.zamimg.com/uploads/screenshots/small/661497.jpg"},
        {id: "2", url: "https://wow.zamimg.com/uploads/screenshots/normal/661505-battle-net-avatars.jpg"},
    ]
}
type InitialStateType = typeof initialState

const navBarReducer = (state = initialState):InitialStateType=>{

    return state;
}

export default navBarReducer;