import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

export const createNewAgentInfo = async (formData, path=`\\api\\agents\\create\\`) => {
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

export const fetchAgentInfoByAgentIdAndPropName = async (user_id, prop_name, path=`\\api\\agents\\`) => {
    try{
        return await fetch(API_URL+path+user_id+"\\"+prop_name, {
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

export const fetchTransactionsByWalletId = async (wallet_id, setTotalItemsState=()=>{}, offset=1, limit=10, path=`\\api\\wallets\\agent\\transaction\\all\\`) => {
    try{
        return await fetch(API_URL+path+wallet_id+'\\'+offset+'\\'+limit, {
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

export const fetchTransactionTypes = async (path=`\\api\\wallets\\agent\\transaction\\type\\all\\`) => {
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

export const fetchWalletById = async (wallet_id, path=`\\api\\wallets\\agent\\transaction\\wallet\\`) => {
    console.log(API_URL+path+wallet_id)
    try{
        return await fetch(API_URL+path+wallet_id, {
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