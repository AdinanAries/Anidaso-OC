import { 
    show_main_menu, 
    show_notifications_container, 
    toggle_show_main_sections 
} from "../helpers/helper-functions";
import { 
    onclickGetBookingByConfirmation, 
    searchByConfirmationOninput 
} from "../helpers/endpoint-calls";
import wellgo_logo from "../WillgoLogo.png";
import CONSTANTS from "../constants/Constants";
import { 
    logoutPost,
    fetchSvrPingInfo,
    fetchClientAppSvrPingInfo
} from "../services/accountServices";
import { useEffect, useState } from "react";
import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

function Header(props){

    const {
        userDetails,
    } = props;

    const {
        business_name,
        logo_url,
        business_email,
        business_phone,
        business_facebook_link,
        business_twitter_link,
        business_instagram_link,
    } = userDetails?.company_info;

    const user_role_const = userDetails?.role_info?.constant;
    let isLoggedUserOwner = (user_role_const===CONSTANTS.app_role_constants.owner);
    let isLoggedUserAdmin = (user_role_const===CONSTANTS.app_role_constants.admin);
    let isLoggedUserAgent = (user_role_const===CONSTANTS.app_role_constants.agent);

    const [ svrStatus, setSvrStatus ] = useState({
        isCustProDB: false,
        isOCProDB: false,
        client_app_active_env: "...",
        client_url: "",
        payment_processor: "...",
        flights_api_provider: "...",
        price_markup_percentage: 0
    });

    useEffect(()=>{
        (async () => {
            let data = await fetchSvrPingInfo();
            let c_data = await fetchClientAppSvrPingInfo();
            data.client_app_active_env = c_data?.svr_env?.active_env;
            data.client_url = c_data?.svr_env?.client_url;
            data.payment_processor = c_data?.svr_env?.payment_processor;
            data.flights_api_provider = c_data?.svr_env?.flights_api_provider;
            data.price_markup_percentage = c_data?.price_markup_percentage;
            if(isLoggedUserAgent){
                let agent_info = userDetails?.agent_info;
                let pm_obj = agent_info?.find(each=>each.property==="price_markup");
                data.price_markup_percentage=(pm_obj?.value || "N/A");
                // To do Data Provider for Agent User
            }
            setSvrStatus(data);
        })();
    }, []);

    const logoutOnclick = () => {
        logoutPost();
        window.location.reload();
    }

    return (
        <div className="main-header">
            <div style={{padding: "0 10px"}}>
                <div style={{display: "flex", flexDirection: "row !important", justifyContent: "space-between", alignItems: "center"}}>
                    <div onClick={show_main_menu} className="main-menu-button" style={{marginRight: 20}}>
                        <i style={{color: "rgba(255,255,255,0.8)", fontSize: 30}} className="fa fa-bars"></i>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div className="main-menu-company-title" >
                            <div className="site_logo_container">
                                <div style={{height: "100%", display: "flex", alignItems: "center", width: 200}}>
                                    {
                                        isLoggedUserAgent ?
                                        <>
                                            <p style={{marginRight: 10}}>
                                                <img style={{width: 45, borderRadius: "50%"}} src={LOGO_PLACEHOLDER} alt="Logo"/></p>
                                            <p style={{fontSize: 15}}>
                                                {business_name || "Business Name"}
                                            </p>
                                        </> :
                                        <>
                                            <p style={{marginRight: 5}}>
                                                <img style={{width: 45}} src={wellgo_logo} alt="Logo"/></p>
                                            <p>Welldugo
                                                <sup style={{fontSize: 12}}>&reg;</sup></p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="main-search-box" 
                                style={{borderRadius: 50, width: "calc(100vw - 152px)",
                                maxWidth: 350, margin: "auto", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.2)"}}>
                                <input onInput={searchByConfirmationOninput} 
                                    id="search-booking-by-confirmation-input" 
                                    style={{border: "none", width: "calc(100% - 60px)", padding: "20px 10px", background: "none", color: "white"}} 
                                    placeholder="Enter booking reference number here"/>
                                <button onClick={()=>{
                                    onclickGetBookingByConfirmation();
                                    if(document.getElementById("bookings-container").style.display==="none")
                                        toggle_show_main_sections("bookings");
                                }} className="top-search-box-submit-btn">
                                    <i style={{color: "white"}} className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>
                                    Customer app is in {svrStatus?.client_app_active_env?.toUpperCase()}
                                </p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                    <i style={{fontSize: 14,
                                        color: svrStatus?.client_app_active_env?.toLowerCase()=="production" ? "green" : "red"
                                    }} className="fa-solid fa-shop"></i></span> 
                                    Customer</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>Payment is currently processed with {svrStatus?.payment_processor?.toUpperCase()}</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                <i style={{fontSize: 14}} className="fa-solid fa-building-columns"></i></span> 
                                {svrStatus?.payment_processor?.toUpperCase()}</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>Currency is USD</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                <i style={{fontSize: 14}} className="fa fa-globe"></i></span> 
                                USD</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>Current price markup is {svrStatus?.price_markup_percentage}%</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                <i style={{fontSize: 14}} className="fa fa-level-up"></i></span> 
                                {svrStatus?.price_markup_percentage}%</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>Flights data is provided by {svrStatus?.flights_api_provider}</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                    <i style={{fontSize: 14}} className="fa fa-share-alt"></i></span> 
                                    {svrStatus?.flights_api_provider}</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>{
                                    svrStatus?.isCustProDB ? "Bookings data on this OC connected to production database" 
                                    : "Bookings data on this OC connected to test database or NOT connected"
                                }</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                    <i style={{fontSize: 14, 
                                            color: svrStatus?.isCustProDB ? "green" : "red"}} 
                                        className="fa fa-database"></i></span> 
                                {
                                    svrStatus?.isCustProDB ? "Data" : "Warning"
                                } </p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div className="tool-tip-parent">
                            <div className="tool-tip">
                                <p>{
                                    svrStatus?.isOCProDB ? "Operational center connected to production database" 
                                    : "Operational center connected to test database or Not connected"
                                }</p>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                    <i style={{fontSize: 14, 
                                            color: svrStatus?.isOCProDB ? "green" : "red"}} 
                                        className="fa fa-server"></i></span> 
                                {
                                    svrStatus?.isOCProDB ? "Agent" : "Warning"
                                } </p>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div onClick={show_notifications_container} style={{position: "relative"}} id="top-menu-notifications-btn" 
                            className="header-right-side-icon tool-tip-parent">
                            <div className="header-icon-status-indicator">

                            </div>
                            <p className="header-icon" style={{textAlign: "center"}}>
                                <i style={{color: "skyblue", fontSize: 18}} className="fa fa-bell" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles tool-tip" 
                                style={{minWidth: 60, left: -15}}>
                                <span style={{color: "black", fontSize: 12}}>
                                Notifications</span>
                            </p>
                        </div>
                        <div onClick={()=>toggle_show_main_sections("settings")}
                             id="top-menu-settings-btn" className="header-right-side-icon tool-tip-parent">
                            <p className="header-icon" style={{textAlign: "center"}}>
                                <i style={{color: "skyblue", fontSize: 18}} className="fa-solid fa-cogs" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles tool-tip" 
                                style={{minWidth: 60, left: -15}}>
                                <span style={{color: "black", fontSize: 12}}>
                                    Settings</span></p>
                        </div>
                        <div onClick={logoutOnclick} className="header-right-side-icon tool-tip-parent" 
                            style={{cursor: "pointer", padding: "0 10px"}}>
                            <p className="header-icon bumpup" style={{textAlign: "center"}}>
                                <i style={{color: "skyblue", fontSize: 18}} className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles tool-tip" 
                                style={{minWidth: 60, left: -19}}>
                                <span style={{color: "black", fontSize: 12}}>
                                    Logout</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;