import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {rootStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS",
    FINALIZED_SUCCESS = "FINALIZED_SUCCESS";

let initialState = {
    initialized: false
}

export type initialStateAppType = typeof initialState;

/*ACTIONS TYPES*/
type InferValueTypes<T> = T extends {[key:string]: infer U} ? U : never

function inferLiteralFromString<T extends string>(arg:T):T{
    return arg
}

export const initializedSuccess = ()=>{
    return{
        type:inferLiteralFromString(INITIALIZED_SUCCESS),
        initialized: true
    }
}

export const finalizedSuccess = ()=>{
    return{
        type:inferLiteralFromString(FINALIZED_SUCCESS),
        initialized: false
    }
}

const  actionCreators = {
    initializedSuccess,
    finalizedSuccess
}
/*type ActionTypes = ReturnType<typeof initializedSuccess> |
    ReturnType<typeof finalizedSuccess>*/

type ActionTypes = ReturnType<InferValueTypes<typeof actionCreators >>

/*///////////////////////*/

const appReducer = (state = initialState, action:ActionTypes):initialStateAppType=>{
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return{
                ...state,
                initialized: action.initialized,
            }

        case FINALIZED_SUCCESS:
            return {
                ...state,
                initialized: action.initialized
            }
        default:
            return state;

    }
}



export const initializeApp = ():ThunkAction<void, rootStateType, unknown, ActionTypes>=>{
    return (dispatch)=>{
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(()=>{
            dispatch(initializedSuccess());
        });
    }
}

/*export const finilizeApp = ()=>{
    return{
        type:FINALIZED_SUCCESS
    }
}*/
export default appReducer;