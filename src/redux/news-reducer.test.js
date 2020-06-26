import {getNewsThunkCreator, setArticlesAC} from "./news-reducer";
import moxios from "moxios";
import configureMockStore from "redux-mock-store"; // пародия на реальный state
import thunkMiddleware from "redux-thunk";
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const initialState = {
    articles: []
};
const articlesList = [
    { userId: 1,
        id: 1,
        title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
            "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    }
];

describe("news actions",()=>{
    let store;
    beforeEach(()=>{
        moxios.install();
        store = mockStore(initialState);
    });
    afterEach(()=>{
        moxios.uninstall()
    });

    it('set array of articles',()=>{
        expect(setArticlesAC([])).toEqual({
            type: "SET_ARTICLES",
            articles: []
        })
    });

    it('get articles of news when fetching has been done',  (done) =>{
       moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:{
                    articles: [
                        { userId: 1,
                            id: 1,
                            title:
                                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                            body:
                                "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
                        }
                    ]
                }
            })
       }) ;
       const expectedActions = [
           {
               type: "SET_ARTICLES",
               articles: articlesList
           }
       ]

        return store.dispatch(getNewsThunkCreator()).then(()=>{
            const actualAction = store.getActions();
            // console.log(store.getState())
            expect(actualAction).toEqual(expectedActions);
            done();
        })
    });
})