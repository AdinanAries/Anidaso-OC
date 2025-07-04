import { useState, useEffect } from "react";
import { toggle_show_main_sections } from "../helpers/helper-functions";
import CONSTANTS from "../constants/Constants";
import { 
    fetchBookingEngineByAgentId,
} from "../services/bookingEngineServices";

const RequiredActions = (props) => {

    const {
        userDetails,
    } = props;

    const __SETTINGS_TYPES = {
        percentage: "price_markup",
        flat_rate: "flat_rate",
        data_provider: "data_provider",
        profit_type: "profit_type",
    }

    const user_role_const = userDetails?.role_info?.constant;
    let isLoggedUserOwner = (user_role_const===CONSTANTS.app_role_constants.owner);
    let isLoggedUserAdmin = (user_role_const===CONSTANTS.app_role_constants.admin);
    let isLoggedUserAgent = (user_role_const===CONSTANTS.app_role_constants.agent);

    const [ isMinimizedWindow, setIsMinimizedWindow ] = useState(false);

    let data={};
    if(isLoggedUserAgent){
        let agent_info = userDetails?.agent_info;
        let profit_type = agent_info?.find(each=>each.property===__SETTINGS_TYPES?.profit_type);
        if(profit_type?.property){
            data.profit_type=profit_type?.value;
            if(profit_type?.value===__SETTINGS_TYPES?.percentage){
                let pm_obj = agent_info?.find(each=>each.property===__SETTINGS_TYPES?.percentage);
                if(pm_obj?.value)
                    data.price_markup_percentage=pm_obj?.value;
                else
                    data.price_markup_percentage=""
            }else if(profit_type?.value===__SETTINGS_TYPES?.flat_rate){
                let fl_obj = agent_info?.find(each=>each.property===__SETTINGS_TYPES?.flat_rate);
                if(fl_obj?.value)
                    data.flat_rate_amount=fl_obj?.value;
                else
                    data.flat_rate_amount="";
            }
        }else{
            data.profit_type="";
        }
        let data_provider = agent_info?.find(each=>each.property===__SETTINGS_TYPES?.data_provider);
        if(data_provider?.value){
            data.data_provider=(data_provider?.value).toUpperCase();
        } else {
            data.data_provider=""
        }
        
    }

    console.log("Required Actions Pane:", userDetails);

    const {
        website_url,
        company_info,
        wallet_info,
    } = userDetails

    const {
        business_name,
        business_email,
        business_phone,
    } = company_info;

    const [BESettings, setBESettings] = useState({});
    
    useEffect(()=>{
        (async()=>{
            let __be_res = await fetchBookingEngineByAgentId(userDetails?._id);
            if(__be_res?._id){
                setBESettings(__be_res);
            }
        })()
    }, []);

    // Legal Compliance
    let isLegalComplianceOk = false;

    let isBusinessInfoOk = true;
    if(
        !business_name ||
        !business_email ||
        !business_phone
    ){
        isBusinessInfoOk=false;
    }

    // Wallet Balance
    let isWalletOk = true;
    if(wallet_info) {
        if(!wallet_info?.current_balance) {
            isWalletOk = false;
        }
    }else{
        isWalletOk = false;
    }

    // Booking Engine
    let isBookingEngineOk = true;
    if(!website_url || !BESettings?._id){
        isBookingEngineOk = false;
    }

    // Business Bank
    let isBusinessBankOk = false;

    // Price-Bound Profit
    let isPriceBoundProfitOk = true;
    if(data.profit_type){
        if(data.profit_type===__SETTINGS_TYPES?.percentage && !data.price_markup_percentage){
            isPriceBoundProfitOk=false;
        }else if (data.profit_type===__SETTINGS_TYPES?.flat_rate && !data.flat_rate_amount){
            isPriceBoundProfitOk=false;
        }
    }else{
        isPriceBoundProfitOk=false;
    }
                    
    // Email Sender
    let isEmailSenderOk = false;

    return <div style={{padding: isMinimizedWindow ? 10 : 20, paddingBottom: isMinimizedWindow ? 0 : 20, backgroundColor: isMinimizedWindow ? "rgb(0, 37, 63)" : "white"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{width: "calc(100% - 50px)"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    {
                        isMinimizedWindow ?
                        <div style={{display: "flex"}}>
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showLegalCompliancePage();
                                }}
                                className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isLegalComplianceOk ? "lightgreen" : "red"}} className="fa-solid fa-file-contract"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Business Compliance is 
                                    {   
                                        isLegalComplianceOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showWalletPage();
                                }} 
                                className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isWalletOk ? "lightgreen" : "red" }} className="fa-solid fa-wallet"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Balance Wallet is 
                                    {   
                                        isWalletOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showInfoPage();
                                }} 
                                className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isBusinessInfoOk ? "lightgreen" : "red"}} className="fa-solid fa-briefcase"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Business Information is
                                    {   
                                        isBusinessInfoOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showBookingEnginePage();
                                }}
                                className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isBookingEngineOk ? "lightgreen" : "red"}} className="fa-solid fa-server"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Booking Engine is
                                    {   
                                        isBookingEngineOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isBusinessBankOk ? "lightgreen" : "red"}} className="fa-solid fa-money-bill-transfer"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Business Bank is
                                    {   
                                        isBusinessBankOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showAgentConfigsPage();
                                }}
                                className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isPriceBoundProfitOk ? "lightgreen" : "red"}} className="fa-solid fa-percent"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Price-bound Profit is
                                    {   
                                        isPriceBoundProfitOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                            <div className="tool-tip-parent">
                                <div style={{width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <i style={{fontSize: 16, color: isEmailSenderOk ? "lightgreen" : "red"}} className="fa-solid fa-envelope"></i>
                                </div>
                                <div style={{left: -15, minWidth: 120, textAlign: "center", fontSize: 13}}
                                    className="tool-tip">
                                    Email Sender is
                                    {   
                                        isEmailSenderOk ?
                                        <span style={{color: "green", fontWeight: "bolder"}}> OK</span> :
                                        <span style={{color: "red", fontWeight: "bolder"}}> Not OK</span>
                                    }
                                    ...
                                </div>
                            </div>
                        </div> :
                        <h4>
                            <i style={{marginRight: 10, color: "crimson"}}
                                className="fa-solid fa-tools"></i>
                            Required Configs
                        </h4>
                    } 
                    <p onClick={()=>setIsMinimizedWindow(!isMinimizedWindow)}
                        style={{color: isMinimizedWindow ? "lightgreen" : "green", fontWeight: "initial", cursor: "pointer", marginLeft: 20, fontSize: 13, textDecoration: "underline"}}>
                        {
                            isMinimizedWindow ? "See Details" : "Minimize Window"
                        }
                        <span>
                            <i style={{color: "rgba(0,0,0,0.5)", marginLeft: 10}}
                                className={"fa-solid fa-angle-" + (isMinimizedWindow ? "down" : "up")}></i>
                        </span>
                    </p>
                </div>
                {
                    !isMinimizedWindow &&
                    <div style={{marginTop: 10}}>
                        <div style={{display: "flex"}}>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-file-contract"></i>
                                    Business Compliance</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    It is important to complete the business compliance form, and to submit required verifications documents in order for us to verify your personal, business, and agency credentials to establish trust in order to start using this platform.
                                </p>
                                <p onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showLegalCompliancePage();
                                    }}
                                    style={{fontSize: 13, cursor: "pointer", color: isLegalComplianceOk ? "green" : "red", textDecoration: "underline", marginTop: 15}}>
                                    {
                                        isLegalComplianceOk ?
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "green"}} className="fa-solid fa-check"></i>
                                            OK, go to page...
                                        </> : 
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "red"}} className="fa-solid fa-exclamation-triangle"></i>
                                            Not Ok, take action...
                                        </>
                                    }
                                </p>
                            </div>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-wallet"></i>
                                    Balance Wallet</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    This website uses paid, metered, third party API's to give you access to the various data and services required for your business operations, therefore wallet balance is needed to get you access to these API's and services.
                                </p>
                                <p onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showWalletPage();
                                    }}
                                    style={{fontSize: 13, cursor: "pointer", color: isWalletOk ? "green" : "red", textDecoration: "underline", marginTop: 15}}>
                                    {
                                        isWalletOk ?
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "green"}} className="fa-solid fa-check"></i>
                                            OK, go to page...
                                        </> : 
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "red"}} className="fa-solid fa-exclamation-triangle"></i>
                                            Not Ok, take action...
                                        </>
                                    }
                                </p>
                            </div>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-server"></i>
                                    Booking Engine</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    As an Independent Travel Agent using this platform, you have your own booking engine with exact prices directly from suppliers. You can integrate the engine in your exsiting business website and customize it based on your needs.
                                </p>
                                <p onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showBookingEnginePage();
                                    }}
                                    style={{fontSize: 13, cursor: "pointer", color: isBookingEngineOk ? "green" : "red", textDecoration: "underline", marginTop: 15}}>
                                    {
                                        isBookingEngineOk ?
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "green"}} className="fa-solid fa-check"></i>
                                            OK, go to page...
                                        </> : 
                                        <>
                                            <i style={{marginRight: 10, fontSize: 16, color: "red"}} className="fa-solid fa-exclamation-triangle"></i>
                                            Not Ok, take action...
                                        </>
                                    }  
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="tool-tip-parent">
                <div style={{width: 40, height: 40, borderRadius: "100%", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <i style={{color: isMinimizedWindow ? "lightgreen" : "green"}} className="fa-solid fa-angle-right"></i>
                </div>
                <div style={{left: -15, minWidth: 80, textAlign: "center", fontSize: 13}}
                    className="tool-tip">
                    see all..
                </div>
            </div>
        </div>
    </div>
}

export default RequiredActions;