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
import { 
    logoutPost 
} from "../services/accountServices";

function Header(props){

    const logoutOnclick = () => {
        logoutPost();
        window.location.reload();
    }

    return (
        <div className="main-header">
            <div className="wrapper">
                <div style={{display: "flex", flexDirection: "row !important", justifyContent: "space-between", alignItems: "center"}}>
                    <div onClick={show_main_menu} className="main-menu-button" style={{marginRight: 20}}>
                        <i style={{color: "rgba(255,255,255,0.8)", fontSize: 30}} className="fa fa-bars"></i>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className="main-menu-company-title" >
                            <div className="site_logo_container">
                                <div style={{height: "100%", display: "flex", alignItems: "center"}}>
                                    <p style={{marginRight: 10}}>
                                        <img style={{width: 45}} src={wellgo_logo} alt="Logo"/></p>
                                    <p>Welldugo
                                        <sup style={{fontSize: 12}}>&reg;</sup></p>
                                </div>
                            </div>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Operational Center</p>
                        </div>
                        <div style={{marginLeft: 40}}>
                            <div className="main-search-box" 
                                style={{borderRadius: 20, width: "calc(100vw - 152px)", border: "2px solid white",
                                maxWidth: 350, margin: "auto", overflow: "hidden", backgroundColor: "white"}}>
                                <input onInput={searchByConfirmationOninput} 
                                    id="search-booking-by-confirmation-input" 
                                    style={{border: "none", width: "calc(100% - 60px)", padding: 10}} 
                                    placeholder="Enter booking reference number here"/>
                                <button onClick={()=>{
                                    onclickGetBookingByConfirmation();
                                    toggle_show_main_sections("bookings");
                                }} className="top-search-box-submit-btn">
                                    <i style={{color: "white"}} className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                <i style={{fontSize: 14}} className="fa fa-globe"></i></span> 
                                USD</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                <i style={{fontSize: 14}} className="fa fa-level-up"></i></span> 
                                10%</p>
                        </div>
                        <div style={{fontSize: 12, margin: "0 10px", color: "rgba(255,255,255,0.1)"}}>
                            |
                        </div>
                        <div>
                            <p style={{color: "orange", fontSize: 12}}>
                               <span style={{color: "rgba(255,255,255,0.6)", marginRight: 5}}>
                                    <i style={{fontSize: 14}} className="fa fa-share-alt"></i></span> 
                                GDS, Duffel</p>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
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
                        <div onClick={logoutOnclick} className="header-right-side-icon" style={{cursor: "pointer", padding: "0 10px", marginLeft: 10, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <p className="header-icon bumpup" style={{marginBottom: 5, textAlign: "center"}}>
                                <i style={{color: "rgba(255,0,0,0.6)"}} className="fa fa-sign-out" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "rgba(255,0,0,0.6)", fontSize: 12}}>
                                Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;