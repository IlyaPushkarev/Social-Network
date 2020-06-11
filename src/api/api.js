import * as axios from "axios";
 const API = axios.create({
     baseURL:`https://social-network.samuraijs.com/api/1.0/`,
     withCredentials: true,
    headers: {
        "API-KEY": "0d0f2a57-8c82-4777-9ae0-92794f8f6390",
    },
});
export default API;


