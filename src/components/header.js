import { show_main_menu, show_notifications_container, toggle_show_main_sections } from "./helper-functions";
import { onclickGetBookingByConfirmation, searchByConfirmationOninput } from "./endpoint-calls";

function Header(){
    return (
        <div className="main-header">
            <div className="wrapper">
                <div style={{display: "flex", flexDirection: "row !important", justifyContent: "space-between"}}>
                    <div onClick={show_main_menu} className="main-menu-button" style={{marginRight: 20}}>
                        <i style={{color: "rgba(255,255,255,0.8)", fontSize: 30}} className="fa fa-bars"></i>
                    </div>
                    <div>
                        <p className="main-search-box-title" style={{color: "white", fontSize: 12, marginBottom: 5, fontWeight: "bolder", letterSpacing: 1}}>
                            Search by reference number</p>
                        <div className="main-search-box" style={{borderRadius: 20, width: "calc(100vw - 152px)", maxWidth: 500, margin: "auto", overflow: "hidden", backgroundColor: "white"}}>
                            <input onInput={searchByConfirmationOninput} id="search-booking-by-confirmation-input" style={{border: "none", width: "calc(100% - 60px)", padding: 10}} placeholder="enter ref. number here"/>
                            <button onClick={()=>{
                                onclickGetBookingByConfirmation();
                                toggle_show_main_sections("bookings");
                            }} className="top-search-box-submit-btn">
                                <i style={{color: "white"}} className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className="header-right-side-icon" style={{cursor: "pointer", padding: "0 10px", marginLeft: 10, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <p className="header-icon bumpup" style={{marginBottom: 5, textAlign: "center"}}>
                                <i style={{color: "rgba(255,255,255,0.8)"}} className="fa fa-user" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "white", fontSize: 12}}>Account</p>
                        </div>
                        <div onClick={show_notifications_container} style={{position: "relative"}} id="top-menu-notifications-btn" className="header-right-side-icon">
                            <div className="header-icon-status-indicator">

                            </div>
                            <p className="header-icon" style={{marginBottom: 5, textAlign: "center"}}>
                                <i style={{color: "rgba(255,255,255,0.8)"}} className="fa fa-bell" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "white", fontSize: 12}}>Notifications</p>
                        </div>
                        <div onClick={()=>toggle_show_main_sections("settings")} id="top-menu-settings-btn" className="header-right-side-icon">
                            <p className="header-icon" style={{marginBottom: 5, textAlign: "center"}}>
                                <i style={{color: "rgba(255,255,255,0.8)"}} className="fa fa-cogs" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "white", fontSize: 12}}>Settings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;