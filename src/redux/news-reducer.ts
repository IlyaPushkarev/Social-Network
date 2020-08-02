import {newsAPI} from "../api/newsAPI";
import {articleType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";

const SET_ARTICLES = "SET_ARTICLES";

let initialState = {
    articles: [] as Array<articleType>,
}
export type initialStateType = typeof initialState

function inferLiteralFromString<T extends string>(arg:T):T{
    return arg
}

export const setArticlesAC = (articles:Array<articleType>)=>{
    return {
        type: inferLiteralFromString(SET_ARTICLES),
        articles: articles

    }
}

const actionCreators = {
    setArticlesAC
}

type inferValueTypes<T> = T extends {[key:string]: infer U} ? U : never
type ActionTypes = ReturnType<inferValueTypes<typeof actionCreators>>

type ThunkType = ThunkAction<void, rootStateType, unknown, ActionTypes>

const newsReducer = (state = initialState, action:ActionTypes):initialStateType=>{
    switch(action.type){
        case SET_ARTICLES:
            return {
                ...state,
                articles: [ ...action.articles],
            };

        default:
            return state;
    }
}


export const getNewsThunkCreator = (): ThunkType =>{
    return  (dispatch)=>{
        return newsAPI.getNewsData()
            .then((data)=>{
                // console.log(response.data)
                dispatch(setArticlesAC(data.articles));

            })
    }
}
export default newsReducer;