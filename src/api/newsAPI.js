
import * as axios from "axios";

export const newsAPI = {
    getNewsData: ()=>{
        return axios.get(`http://newsapi.org/v2/top-headlines?country=ua&category=technology&apiKey=aeea882a715c4f038efdba269a744085`)/*Используеться другое API, без headers*/

    }
}