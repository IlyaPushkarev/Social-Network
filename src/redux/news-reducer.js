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
                articles: [ ...action.articles]
            };

        default:
            return state;
    }
}

export const setArticlesAC = (articles)=>{
    return {
        type: SET_ARTICLES,
        articles: articles

    }
}

export const getNewsThunkCreator = ()=>{
    return  (dispatch)=>{
        return newsAPI.getNewsData()
            .then(response=>{
                // console.log(response.data)
                dispatch(setArticlesAC(response.data.articles));

            })
    }
}
export default newsReducer;