import {newsAPI} from "../api/newsAPI";
import {articleType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";

const SET_ARTICLES = "SET_ARTICLES";

let initialState = {
    articles: [] as Array<articleType>,
}

export type initialStateType = typeof initialState

/*Action types*/
type inferValueTypes<T> = T extends {[key:string]: infer U} ? U : never

function inferLiteralFromString<T extends string>(arg:T):T{
    return arg
}
type SetArticlesACType = {
    type: typeof  SET_ARTICLES,
    articles: Array<articleType>
}
export const setArticlesAC = (articles:Array<articleType>):SetArticlesACType=>{
    return {
        type: inferLiteralFromString(SET_ARTICLES),
        articles: articles

    }
}

const actionCreators = {
    setArticlesAC
}

type ActionTypes = ReturnType<inferValueTypes<typeof actionCreators>>
/*//////////////////////////////////////*/
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


export const getNewsThunkCreator = (): ThunkAction<Promise<void>, rootStateType, unknown, ActionTypes> =>{
    return  (dispatch)=>{
        return newsAPI.getNewsData()
            .then((data)=>{
                // console.log(response.data)
                dispatch(setArticlesAC(data.articles));

            })
    }
}
export default newsReducer;