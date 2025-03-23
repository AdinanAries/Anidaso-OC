import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

export const createNewCustomerAppSettings = async (formData, path=`\\api\\settings\\customer-app\\create\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
            return {isError: true, message: err.message};
        })
    } catch (e){
        console.log(e);
        return {isError: true, message: e.message};
    }
}

export const fetchAllCustomerAppSettings = async (path=`\\api\\settings\\customer-app\\`) => {
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
            if(data?.status && data?.status === 401)
                deleteUserToken();
            return data
        })
        .catch(err => {
            console.log(err);
            return {isError: true, message: err.message};
        })
    } catch (e){
        console.log(e);
        return {isError: true, message: e.message};
    }
}