import channelsIcon from "./icons/channels-icon2.png";
import supportIcon from "./icons/support-icon2.png";
import bookingsIcon from "./icons/bookings-icon.png";
import analyticsIcon from "./icons/analytics-icon.png";
import customersIcon from "./icons/customers-icon.png";
import clientsIcon from "./icons/clients-icon.png";
import staffIcon from "./icons/staff-icon.png";
import dealsIcon from "./icons/deals-icon2.png";
import salesIcon from "./icons/sales-icon.png";
import marketingIcon from "./icons/marketing-icon.png";
import MiniLoggedInUserInfoCard from "./MiniLoggedInUserInfoCard";

import { toggle_show_main_sections } from "../helpers/helper-functions";

let SideMenu = (props) => {

    const {
        userDetails,
    } = props;

    return(
        <div id="main-menu-container" className="side-menu">
            <div className="side-menu-items-list">
                <MiniLoggedInUserInfoCard 
                    userDetails={userDetails}
                />
                <div onClick={()=> {
                    if(document.getElementById("bookings-container").style.display==="none") 
                        toggle_show_main_sections("bookings")
                }} id="side-menu-bookings-item" className="side-menu-each-item active tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={bookingsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Bookings</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("deals")}
                    id="side-menu-deals-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={dealsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Packages & Deals</p>
                    </div>
                </div>
                <div style={{cursor: "not-allowed"}} onClick={()=> toggle_show_main_sections("support")} id="side-menu-support-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img style={{opacity: 0.4}} src={supportIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p style={{color: "rgba(255,255,255,0.3)"}}>Support</p>
                    </div>
                </div>
                
            </div>
            <div className="side-menu-items-list">
                <p style={{display: "none", fontSize: 12, color: "rgb(0,255,255)", margin: "10px", marginTop: 0, marginBottom: "20px"}}>
                    Sales/Marketing
                </p>
                <div onClick={()=> toggle_show_main_sections("sales")} id="side-menu-sales-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={salesIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Sales</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("marketing")} id="side-menu-marketing-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={marketingIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Marketing</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("customers")} id="side-menu-customers-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={customersIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Customers</p>
                    </div>
                </div>
            </div>
            <div className="side-menu-items-list">
                <p style={{display: "none", fontSize: 12, color: "rgb(0,255,255)", margin: "10px", marginTop: 0, marginBottom: "20px"}}>
                    Management
                </p>
                <div style={{cursor: "not-allowed"}} onClick={()=> toggle_show_main_sections("analytics")} id="side-menu-analytics-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img style={{opacity: 0.4}} src={analyticsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p style={{color: "rgba(255,255,255,0.3)"}}>Analytics</p>
                    </div>
                </div>
                <div style={{cursor: "not-allowed"}} onClick={()=> toggle_show_main_sections("channels")} id="side-menu-channels-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img style={{opacity: 0.4}} src={channelsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p style={{color: "rgba(255,255,255,0.3)"}}>Channels</p>
                    </div>
                </div>
                <div onClick={()=> {
                    if(document.getElementById("staff-container").style.display==="none")
                        toggle_show_main_sections("staff")
                }} id="side-menu-staff-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={staffIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p>Profile</p>
                    </div>
                </div>
                <div style={{cursor: "not-allowed"}} onClick={()=> toggle_show_main_sections("clients")} id="side-menu-clients-item" className="side-menu-each-item tool-tip-parent">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img style={{opacity: 0.4}} src={clientsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name tool-tip">
                        <p style={{color: "rgba(255,255,255,0.3)"}}>Partners</p>
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default SideMenu;