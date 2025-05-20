import { useEffect, useState } from "react";

const AgentServiceContract = (props) => {

    const {
        userDetails,
    } = props;

    const __SERVICE_PLAN_SETTINGS_PROP_NAME = "Service Plan";
    const __SERVICE_PLAN_VALUE_CONSTANTS = {
        free_tier: 1,
        basic_tier: 2,
        advanced_tier: 3,
    };

    const [ currentServicePlan, setcurrentServicePlan ] = useState(__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier);

    useEffect(()=>{
        if(userDetails?._id){
            (async()=>{
                // Get and set current service fee from DB here
            })();
        }
    }, [])

    const changeServicePlanOnClick = (_plan) => {
        // 1. Collect Payment Details.
        // 2. Save To Database
        setcurrentServicePlan(_plan);
    }


    return <div>
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa-solid fa-file-signature"></i>
            Change Welldugo Contract
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div onClick={()=>changeServicePlanOnClick(__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier)}
                    className="each-welldugo-service-contract-item" 
                    style={{border: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier ? "2px solid lightgreen" : "none", backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier ? "lightgreen" : "red"}} 
                            className={"fa-solid fa-"+(currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier ? "check" : "circle-dot")}></i>
                        Free Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            No Charge</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    400 Customers
                                </span>
                                <span>
                                    You can add up to 400 customers with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    10 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 10 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    1 Data Provider
                                </span>
                                <span>
                                    You can choose only one Data Provider (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={()=>changeServicePlanOnClick(__SERVICE_PLAN_VALUE_CONSTANTS?.basic_tier)}
                    className="each-welldugo-service-contract-item" 
                    style={{border: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.basic_tier ? "2px solid lightgreen" : "none", backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.basic_tier ? "lightgreen" : "red"}} 
                            className={"fa-solid fa-"+(currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.basic_tier ? "check" : "circle-dot")}></i>
                        Basic Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            $25/Month</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    5,000 Customers
                                </span>
                                <span>
                                    You can add up to 5,000 customers with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    10 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 10 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    1 Data Provider
                                </span>
                                <span>
                                    You can choose only one Data Provider (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div   onClick={()=>changeServicePlanOnClick(__SERVICE_PLAN_VALUE_CONSTANTS?.advanced_tier)}
                    className="each-welldugo-service-contract-item" 
                    style={{border: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.advanced_tier ? "2px solid lightgreen" : "none", backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.advanced_tier ? "lightgreen" : "red"}} 
                            className={"fa-solid fa-"+(currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.advanced_tier ? "check" : "circle-dot")}></i>
                        Advanced Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            $50/Month</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    Unlimited Customers
                                </span>
                                <span>
                                    You can add up to as many customers as possible with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    20 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 20 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    All Data Providers
                                </span>
                                <span>
                                    You can switch in-between Data Providers (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine whenever you want and be able to compare prices from different data providers
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgentServiceContract;