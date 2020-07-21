import {newsAPI} from "../api/newsAPI";

type articleType = {
    [fieldName:string]:string | object,
    source: {
        id: null | number,
        name: string},
}

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


export const getNewsThunkCreator = ()=>{
    return  (dispatch:Function)=>{
        return newsAPI.getNewsData()
            .then((response:any)=>{
                // console.log(response.data)
                dispatch(setArticlesAC(response.data.articles));

            })
    }
}
export default newsReducer;