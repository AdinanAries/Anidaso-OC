import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

export const createNewDealPackage = async (formData, path=`\\api\\travel-deals-packages\\create\\`) => {
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
        .then(data =>{ 
            console.log(data);
            return data;
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

export const fetchDealsPackages = async (user_id, filters, setTotalItemsState=()=>{}, offset=1, limit=10, path=`\\api\\travel-deals-packages\\all\\`) => {
    try{
        return await fetch(API_URL+path+user_id+'\\'+offset+'\\'+limit, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
            body: JSON.stringify({filters})
        })
        .then(res => {
            for (var pair of res.headers.entries()) {
                if (pair[0] === 'pagination-total-items') {
                    setTotalItemsState(pair[1]);
                }
            }
            return res.json();
        })
        .then(data => {
            if(data?.status && data?.status === 401)
                deleteUserToken();
            console.log(data);
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

export const fetchDealsPackagesBySearchQuery = async (agent_id, query, setTotalItemsState=()=>{}, offset=1, limit=10, path=`\\api\\travel-deals-packages\\search\\`) => {
    try{
        return await fetch(API_URL+path+agent_id+'\\'+offset+'\\'+limit+'\\'+query, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
        })
        .then(res => {
            for (var pair of res.headers.entries()) {
                if (pair[0] === 'pagination-total-items') {
                    setTotalItemsState(pair[1]);
                }
            }
            return res.json();
        })
        .then(data => {
            if(data?.status && data?.status === 401)
                deleteUserToken();
            console.log(data);
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