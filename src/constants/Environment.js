import CONSTANTS from "./Constants";

const ENVIRONMENT = {
    data_provider: "DUFFEL",
    wellgo_api_svr: "https://welldugo-oc-prod-backend-b7f63faaa3a9.herokuapp.com",
    client_app_svr: "https://wellgo-backend-a2628ce79736.herokuapp.com",
    //wellgo_dev_api_svr: "https://welldugo-oc-prod-backend-b7f63faaa3a9.herokuapp.com",
    client_app_dev_svr: "https://wellgo-backend-a2628ce79736.herokuapp.com",
    wellgo_dev_api_svr: "http://localhost:4000",
    //wellgo_dev_api_svr: "https://welldugo-oc-backend-e0594471c7e0.herokuapp.com", // out-dated
    runtime: {
        env: CONSTANTS.dev
    }
}

export const getApiHost = () => {
    return (ENVIRONMENT.runtime.env===CONSTANTS.prod) ?
        ENVIRONMENT.wellgo_api_svr : ENVIRONMENT.wellgo_dev_api_svr;
}

export const getClientAppApiHost = () => {
    return (ENVIRONMENT.runtime.env===CONSTANTS.prod) ?
        ENVIRONMENT.client_app_svr : ENVIRONMENT.client_app_dev_svr;
}

export const getUserToken = () => {
    let token="";
    if(localStorage.getItem("user_token"))
        token=localStorage.getItem("user_token");
    else
        localStorage.setItem("user_token", token);
    return token;
}

export const deleteUserToken = () => {
    localStorage.removeItem("user_token");
}

export default ENVIRONMENT;