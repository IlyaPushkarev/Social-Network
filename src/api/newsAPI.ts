import axios from "axios";
import {articleType} from "../types/types";

type GetNewsResponseType = {
    status:string
    totalResult: number
    articles:Array<articleType>
}
export const newsAPI = {
    getNewsData: ()=>{
        return axios.get<GetNewsResponseType>(`http://newsapi.org/v2/top-headlines?country=ua&category=technology&apiKey=aeea882a715c4f038efdba269a744085`)
            .then(res=>res.data)/*Используеться другое API, без headers*/

    }
}