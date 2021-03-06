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

import { toggle_show_main_sections } from "./helper-functions";

let SideMenu = () => {
    return(
        <div id="main-menu-container" className="side-menu">
            <div className="main-menu-company-title" style={{padding: "20px 10px"}}>
                {/*<p style={{textAlign: "center", color: "orange", fontSize: 19, fontWeight: "bolder", letterSpacing: 1}}>
                    Anidaso O.C.</p>*/}
                <div className="site_logo_container">
                    <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <p><span>An</span>i<span>d</span>a<span>s</span>o<sup style={{fontSize: 12}}>&reg;</sup></p>
                    </div>
                </div>
                <p style={{color: "white", fontSize: 14}}>
                    Operational Center</p>
            </div>
            <div className="side-menu-items-list">
                <p style={{fontSize: 14, color: "rgb(0,255,255)", margin: "10px", marginTop: 0, marginBottom: "20px"}}>
                    Travel Agent
                </p>
                <div onClick={()=> toggle_show_main_sections("bookings")} id="side-menu-bookings-item" className="side-menu-each-item active">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={bookingsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Bookings</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("deals")} id="side-menu-deals-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={dealsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Deals</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("support")} id="side-menu-support-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={supportIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Support</p>
                    </div>
                </div>
                
            </div>
            <div className="side-menu-items-list">
                <p style={{fontSize: 14, color: "rgb(0,255,255)", margin: "10px", marginTop: 0, marginBottom: "20px"}}>
                    Sales/Marketing
                </p>
                <div onClick={()=> toggle_show_main_sections("sales")} id="side-menu-sales-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={salesIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Sales</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("marketing")} id="side-menu-marketing-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={marketingIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Marketing</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("customers")} id="side-menu-customers-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={customersIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Customers</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("clients")} id="side-menu-clients-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={clientsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Clients</p>
                    </div>
                </div>
            </div>
            <div className="side-menu-items-list">
                <p style={{fontSize: 14, color: "rgb(0,255,255)", margin: "10px", marginTop: 0, marginBottom: "20px"}}>
                    Management
                </p>
                <div onClick={()=> toggle_show_main_sections("analytics")} id="side-menu-analytics-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={analyticsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Analytics</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("channels")} id="side-menu-channels-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={channelsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Channels</p>
                    </div>
                </div>
                <div onClick={()=> toggle_show_main_sections("staff")} id="side-menu-staff-item" className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={staffIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Staff</p>
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default SideMenu;