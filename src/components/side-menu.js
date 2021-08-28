import channelsIcon from "./icons/channels-icon2.png";
import supportIcon from "./icons/support-icon2.png";
import bookingsIcon from "./icons/bookings-icon.png";
import analyticsIcon from "./icons/analytics-icon.png";
import customersIcon from "./icons/customers-icon.png";
import clientsIcon from "./icons/clients-icon.png";
import staffIcon from "./icons/staff-icon.png";

let SideMenu = () => {
    return(
        <div id="main-menu-container" className="side-menu">
            <div className="main-menu-company-title" style={{padding: "20px 10px"}}>
                <p style={{textAlign: "center", color: "orange", fontSize: 19, fontWeight: "bolder", letterSpacing: 1}}>
                    Anidaso O.C.</p>
            </div>
            <div className="side-menu-items-list">
                <p style={{fontSize: 14, color: "rgb(0,255,255)", margin: "10px", marginBottom: "20px"}}>
                    Main menu
                </p>
                <div className="side-menu-each-item active">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={bookingsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Bookings</p>
                    </div>
                </div>
                <div className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={channelsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Channels</p>
                    </div>
                </div>
                <div className="side-menu-each-item">
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
                <p style={{fontSize: 14, color: "rgb(0,255,255)", margin: "10px", marginBottom: "20px"}}>
                    Misc. Menu
                </p>
                <div className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={analyticsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Analytics</p>
                    </div>
                </div>
                <div className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={customersIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Customers</p>
                    </div>
                </div>
                <div className="side-menu-each-item">
                    <div style={{marginRight: 10}}>
                        <p>
                            <img src={clientsIcon} />
                        </p>
                    </div>
                    <div className="side-menu-each-item-name">
                        <p>Clients</p>
                    </div>
                </div>
                <div className="side-menu-each-item">
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