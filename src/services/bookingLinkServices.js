import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

export const createNewBookingLink = async (formData, path=`\\api\\booking-links\\create\\`) => {
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

export const fetchBookingLinksByAgentId = async (agent_id, filters, setTotalItemsState=()=>{}, offset=1, limit=10, path=`\\api\\booking-links\\agent\\all\\`) => {
    try{
        return await fetch(API_URL+path+agent_id+'\\'+offset+'\\'+limit, {
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