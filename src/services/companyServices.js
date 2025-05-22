import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

export const createNewCompany = async (formData, path=`\\api\\company-info\\create\\`) => {
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

export const fetchCompanyById = async (company_id, path=`\\api\\company-info\\one\\`) => {
    try{
        return await fetch(API_URL+path+company_id, {
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

export const updateCompany = async (formData, path=`\\api\\company-info\\edit\\`) => {
    try{
        return await fetch(API_URL+path, {
            method: "PUT",
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