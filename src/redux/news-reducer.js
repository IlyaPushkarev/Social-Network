import {newsAPI} from "../api/newsAPI";

const SET_ARTICLES = "SET_ARTICLES";
let initialState = {
    articles: [],
}

const newsReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_ARTICLES:
            return {
                ...state,
                articles: [...state.articles, ...action.articles]
            };

        default:
            return state;
    }
}

export const setArticlesAC = (articles)=>{
    return {
        type: SET_ARTICLES,
        articles,
    }
}

export const getNewsThunkCreator = ()=>{
    return (dispatch)=>{
        newsAPI.getNewsData()
            .then(res=>{

                dispatch(setArticlesAC(res.data.articles));

            })
    }
}
export default newsReducer;