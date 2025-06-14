import { useEffect, useState } from "react";
import { 
    fetchAgentInfoByAgentIdAndPropName,
    createNewAgentInfo,
} from "../../../../../services/agentServices";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../../../components/CheckoutForm';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OdjZ3An0YMgH2TtyCpkCBN4vDrMuQlwvmFSNKqBl9gJY996OXSpZ9QLz5dBGHLYLsa7QVvwY51I0DcLHErLxW7y00vjEWv9Lc');

const AgentServiceContract = (props) => {

    const {
        userDetails,
    } = props;

    const __SERVICE_PLAN_SETTINGS_PROP_NAME = "service_plan";
    const __SERVICE_PLAN_VALUE_CONSTANTS = {
        free_tier: 1,
        basic_tier: 2,
        advanced_tier: 3,
    };

    const [ currentServicePlan, setcurrentServicePlan ] = useState(__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier);
    const [ isActive, setIsActive ] = useState(false);
    const [ showPaymentForm, setShowPaymentForm ] = useState(false);
    const [ isChangeSevicePlan, setIsChangeSevicePlan ] = useState(false);

    useEffect(()=>{
        if(userDetails?._id){
            (async()=>{
                // Get and set current service fee from DB here
                let __res = await fetchAgentInfoByAgentIdAndPropName(userDetails?._id, __SERVICE_PLAN_SETTINGS_PROP_NAME);
                if(__res?._id){
                    setcurrentServicePlan(parseInt(__res?.value));
                    // Check payment and set isActive flag
                }
            })();
        }
    }, [])

    const changeServicePlanOnClick = async (_plan) => {
        setIsChangeSevicePlan(false) // State to change a plan for existing expired plan

        if(_plan===currentServicePlan){
            return;
        }

        // 1. Collect Payment Details.
        setShowPaymentForm(true);

        // 2. Save To Database
        const post_obj = {
            user_id: userDetails?._id,
            property: __SERVICE_PLAN_SETTINGS_PROP_NAME,
            value: _plan,
        }
        let __res = await createNewAgentInfo(post_obj);

        // 3. Set State
        setcurrentServicePlan(_plan);
    }

    const checkoutOnComplete = () => {
        alert("Service Plan Activated Successfully!");
        setIsActive(true);
        setShowPaymentForm(false);
    }


    return <div>
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa-solid fa-file-signature"></i>
            Change Welldugo Contract
        </p>
        <div style={{marginBottom: 10}}>
            {
                (showPaymentForm && !isChangeSevicePlan) ?
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "calc(50% - 5px)"}}>
                        <div>
                            <p style={{fontSize: 13, color: "white"}}>
                                <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-credit-card"></i>
                                Payment Method
                            </p>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 10}}>
                                <span style={{marginRight: 5}}>Period:</span>
                                March 25, 2025 - April 25, 2025
                            </p>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize: 11}}>
                                <span style={{marginRight: 5}}>Sub Total:</span>
                                $25.12
                            </p>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize: 11}}>
                                <span style={{marginRight: 5}}>Tax:</span>
                                $4.13
                            </p>
                            <p style={{color: "rgb(140, 255, 0)", fontSize: 14}}>
                                <span style={{marginRight: 5}}>Total:</span>
                                $29.25
                            </p>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm 
                                checkoutOnComplete={checkoutOnComplete}
                            />
                        </Elements>
                    </div>
                    <div style={{width: "calc(50% - 5px)"}}>
                        <p onClick={()=>setIsChangeSevicePlan(true)} style={{textDecoration: "underline", cursor: "pointer", marginBottom: 20, fontSize: 13, color: "lightgreen"}}>
                            Change Service Plan Here
                        </p>
                        <div style={{backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)"}}>
                            <h4 style={{color: "orange"}}>
                                <i style={{marginRight: 20, color: "lightgreen"}} 
                                    className="fa-solid fa-check"></i>
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
                    </div>
                </div> :
                <>
                    {
                        (isActive || currentServicePlan===__SERVICE_PLAN_VALUE_CONSTANTS?.free_tier || isChangeSevicePlan) ?
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
                        </div> : 
                        <div style={{padding: 20, border: "1px solid red", backgroundColor: "rgba(255,0,0,0.2)", borderRadius: 8}}>
                            <p style={{fontSize: 13, color: "white"}}>
                                <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-credit-card"></i>
                                Your service contract is inactive. Please verify your payment method and complete the due amount!!!
                            </p>
                            <p onClick={()=>setShowPaymentForm(true)} style={{textDecoration: "underline", cursor: "pointer", marginTop: 20, fontSize: 13, color: "lightgreen"}}>
                                Complete Payment Here
                            </p>
                        </div>
                    }
                </>
            }
        </div>
    </div>
}

export default AgentServiceContract;