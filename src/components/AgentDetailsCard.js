import { useState } from "react";
import { 
    add_commas_to_number,
    toggle_show_main_sections,
 } from "../helpers/helper-functions";

const AgentDetailsCard = (props) => {

    const {
        userDetails,
    } = props

    return <div>
            <div style={{backgroundColor: "#2b343d", borderRadius: 6, padding: 20}}>
                <div style={{fontSize: 12, letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                    <div style={{color: "rgba(255,255,255,0.7)"}}>
                        <i style={{fontSize: 30, marginRight: 10, color: "rgba(0, 140, 255, 0.7)"}} className="fa fa-user-tie"></i>
                        {(userDetails?.first_name || "first name: N/A")} {(userDetails?.last_name || "last name: N/A")}
                    </div>
                    <div style={{color: "orange", cursor: "pointer"}} onClick={()=>{
                        toggle_show_main_sections("staff");
                        window.__viewStaffInfo(userDetails?._id);
                    }}>
                            See Information
                    </div>
                </div>
                <p style={{color: "rgba(0, 140, 255, 0.7)", margin: "5px 0", fontSize: 10, fontWeight: "bolder", letterSpacing: 1}}>
                    ID: {(userDetails?._id?.toUpperCase()?.substring(0,7)) || "N/A"}
                    {userDetails?._id && "..."}
                </p>
                
                <div style={{letterSpacing: 1}}>
                    <p style={{letterSpacing: 1, color: "rgb(217, 0, 255)", fontSize: 14, marginBottom: 10}}>
                        Sales: 
                        <span style={{marginLeft: 10, color: "orange"}}>
                        $3,000 
                        </span>
                        <span style={{marginLeft: 5, color: "rgba(255, 255, 255, 0.57)"}}>
                            - 8 days
                        </span>
                    </p>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10}}>
                        <p style={{letterSpacing: 1, color: "white", fontSize: 12}}>
                            Flights: 
                            <span style={{marginLeft: 10, color: "orange"}}>
                                $3,000
                            </span>
                            <span style={{marginLeft: 5, color: "rgba(255, 255, 255, 0.57)"}}>
                                (450)
                            </span>
                        </p>
                        <p style={{letterSpacing: 1, color: "white", fontSize: 12}}>
                            Hotels: 
                            <span style={{marginLeft: 10, color: "orange"}}>
                                $0
                            </span>
                            <span style={{marginLeft: 5, color: "rgba(255, 255, 255, 0.57)"}}>
                                (0)
                            </span>
                        </p>
                        <p style={{letterSpacing: 1, color: "white", fontSize: 12}}>
                            Cars: 
                            <span style={{marginLeft: 10, color: "orange"}}>
                                $0
                            </span>
                            <span style={{marginLeft: 5, color: "rgba(255, 255, 255, 0.57)"}}>
                                (0)
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: "#2b343d", borderRadius: 6, padding: 20, marginTop: 5, cursor: "pointer"}}>
                <p onClick={()=>toggle_show_main_sections("settings")}
                    style={{fontSize: 13, color: "lightblue", textDecoration: "underline"}}>
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    Create Booking Link
                </p>
                <div style={{marginTop: 10}}>
                    <p style={{fontSize: 12, color: "white"}}>
                        <i style={{marginRight: 10, color: "lightgreen"}} className="fa fa-info"></i>
                        a booking link allows you to sell by sharing a link with a customer
                    </p>
                </div>
            </div>
        </div>
}

export default AgentDetailsCard;