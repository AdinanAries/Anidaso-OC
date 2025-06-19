import { useState } from "react";
import { 
    add_commas_to_number,
    toggle_show_main_sections,
    get_three_letter_month_from_num
 } from "../helpers/helper-functions";

const AgentDetailsCard = (props) => {

    const {
        userDetails,
        hideSeeDetailsLink,
        servicePlanTiersList
    } = props

    let current_service_plan = servicePlanTiersList.find(each=>each?.constant===1);
    
    let agent_info = userDetails?.agent_info;
    let sp_obj = agent_info?.find(each=>each.property==="service_plan");
    if(sp_obj?.value){
        current_service_plan=servicePlanTiersList.find(each=>each?.constant===parseInt(sp_obj?.value));
    }

    let Last_Available_Total_Month_Sales=0;
    let Last_Available_Total_Month="";
    if(userDetails?.last_twelve_months_monthly_sales.length>0) {
        let _dp = (userDetails?.last_twelve_months_monthly_sales[0]._id?.split("-"));
        Last_Available_Total_Month = `${get_three_letter_month_from_num((parseInt(_dp[1])-1))}, ${_dp[0]}`;
                
        for (let bb of userDetails?.last_twelve_months_monthly_sales[0].documents){
            Last_Available_Total_Month_Sales += (bb?.payment_intent.amount/100);
        }
    }

    return <div>
            <div style={{backgroundColor: "#2b343d", borderRadius: 6, padding: 20}}>
                <div style={{fontSize: 12, letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                    <div style={{color: "rgba(255,255,255,0.7)"}}>
                        <i style={{fontSize: 30, marginRight: 10, color: "rgba(0, 140, 255, 0.7)"}} className="fa fa-user-tie"></i>
                        {(userDetails?.first_name || "first name: N/A")} {(userDetails?.last_name || "last name: N/A")}
                    </div>
                    {
                        !hideSeeDetailsLink &&
                        <div style={{color: "orange", cursor: "pointer"}} onClick={()=>{
                            toggle_show_main_sections("staff");
                            window.__viewStaffInfo(userDetails?._id);
                        }}>
                                See Information
                        </div>
                    }
                </div>
                <p style={{color: "rgba(0, 140, 255, 0.7)", margin: "5px 0", fontSize: 10, fontWeight: "bolder", letterSpacing: 1}}>
                    ID: {(userDetails?._id?.toUpperCase()?.substring(0,7)) || "N/A"}
                    {userDetails?._id && "..."}
                </p>
                
                <div style={{letterSpacing: 1}}>
                    <p style={{letterSpacing: 1, color: "rgb(217, 0, 255)", fontSize: 14, marginBottom: 10}}>
                        Sales: 
                        {
                            Last_Available_Total_Month_Sales ? <>
                                <span style={{marginLeft: 10, color: "orange"}}>
                                    ${add_commas_to_number(Last_Available_Total_Month_Sales.toFixed(2))}
                                </span>
                                <span style={{marginLeft: 5, fontSize: 11, color: "rgba(255, 255, 255, 0.57)"}}>
                                    sold in {Last_Available_Total_Month}
                                </span>
                            </> : <span style={{color: "red", fontSize: 11, marginLeft: 10}}>
                                <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                No sales to show.
                            </span>
                        }
                    </p>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10}}>
                        <div style={{display: "flex", marginTop: 10, marginBottom: 5}}>
                            <div style={{marginRight: 20}}>
                                <p style={{fontSize: 11, color: "lightblue"}}>
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-users"></i>
                                    0 Customer(s)
                                </p>
                            </div>
                            <div style={{marginRight: 20}}>
                                <p style={{fontSize: 11, color: "lightblue"}}>
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-file-signature"></i>
                                    {current_service_plan?.name}
                                </p>
                            </div>
                            <div style={{marginRight: 20}}>
                                <p style={{fontSize: 11, color: "lightblue"}}>
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-gauge-high"></i>
                                    $1/{current_service_plan?.actions_per_unit} actions
                                </p>
                            </div>
                            <div>
                                <p style={{fontSize: 11, color: "lightblue"}}>
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-share-alt"></i>
                                    {(current_service_plan?.number_of_suppliers_allowed) || "All"} Supplier(s)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: "#2b343d", borderRadius: 6, padding: 20, marginTop: 5, cursor: "pointer"}}>
                <p onClick={()=>toggle_show_main_sections("marketing")}
                    style={{fontSize: 13, color: "lightblue", textDecoration: "underline"}}>
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-envelope-open-text"></i>
                    Send News Letter
                </p>
                <div style={{marginTop: 10}}>
                    <p style={{fontSize: 12, color: "white"}}>
                        <i style={{marginRight: 10, color: "lightgreen"}} className="fa fa-info"></i>
                        You can create news letters/emails that include links to your website or booking engine to send to your customers
                    </p>
                </div>
            </div>
        </div>
}

export default AgentDetailsCard;