import { getApiHost, getUserToken, getClientAppApiHost, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const CLIENT_APP_API_URL =  getClientAppApiHost();
const USER_TOKEN = getUserToken();

export const fetchSvrPingInfo = async (path='') => {
    try{
        return await fetch(API_URL+path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${USER_TOKEN}`
            },
        })
        .then(res => res.json())
        .then(data => {
            //if(data?.status && data?.status === 401)
                //deleteUserToken();
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

export const fetchClientAppSvrPingInfo = async (path='') => {
    try{
        return await fetch(CLIENT_APP_API_URL+path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${USER_TOKEN}`
            },
        })
        .then(res => res.json())
        .then(data => {
            //if(data?.status && data?.status === 401)
                //deleteUserToken();
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

export const fetchAccountInfo = async (path=`\\api\\users\\me\\`) => {
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

export const fetchUserById = async (user_id, path=`\\api\\users\\`) => {
    try{
        return await fetch(API_URL+path+user_id, {
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

export const fetchRoleByConstant = async (r_constant, path=`\\api\\roles\\`) => {
    try{
        return await fetch(API_URL+path+r_constant, {
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

export const updateAccountInfo = async (user, path=`\\api\\users\\edit\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
            body: JSON.stringify({
                id: user._id,
                ...user
            })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
            return {isError: true};
        })
    } catch (e){
        console.log(e);
        return {isError: true};
    }
}

export const updateAccountPassword = async (user, path=`\\api\\users\\edit\\password\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER_TOKEN}`
            },
            body: JSON.stringify({
                id: user._id,
                ...user
            })
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
            return {isError: true};
        })
    } catch (e){
        console.log(e);
        return {isError: true};
    }
}

export const loginPost = async (formData, path=`\\api\\users\\login\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

export const registerPost = async (formData, path=`\\api\\users\\register\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

export const registerPriceAlertsUser = async (payload, path="\\api\\users\\price-alerts\\subscribe\\") => {
    try{
        return await fetch(API_URL+path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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

export const logoutPost = () => {
    deleteUserToken();
}

