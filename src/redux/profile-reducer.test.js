import profileReducer, {addPostActionCreator, deletePostAC} from "./profile-reducer";
let state = {
    posts: [
        {message: "Hi, how are you?", id: 1, likesCount: 11, dislikeCount: 5},
        {message: "It's my first post", id: 2, likesCount: 11, dislikeCount: 5},
        {message: "Development", id: 3, likesCount: 11, dislikeCount: 5},
    ]
};

it('length of posts should be incremented', ()=>{
    let action = addPostActionCreator("it-kamasutra.com");

    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(4) ;
})

it('message of new post should be correct', ()=>{
    let action = addPostActionCreator("it-kamasutra.com");

    let newState = profileReducer(state,action);

    expect(newState.posts[2].message).toBe("Development");
})

it('after deleting length of messages should decrement', ()=>{
    let action = deletePostAC(1);

    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(2);
})

it('after deleting length shouldn`t decrement if id is incorrect ', ()=>{
    let action = deletePostAC("incorrect id");

    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(3);
})