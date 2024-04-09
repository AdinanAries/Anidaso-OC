import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();


export const verifyUserToken = async (path="\\api\\sessions\\verify-token\\") => {
    try{
        return await fetch(API_URL+path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data?.status && data?.status === 401){
                deleteUserToken();
                return {
                    valid: false,
                    isError: false,
                }
            }
            return {
                valid: true,
                isError: false,
                data: data
            }
        })
        .catch(err => {
            console.log(err);
            return {
                valid: false,
                isError: true, 
                message: err.message
            };
        })
    } catch (e){
        console.log(e);
        return {
            valid: false,
            isError: true,
            message: e.message
        };
    }
}