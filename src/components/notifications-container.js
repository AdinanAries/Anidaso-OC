import { hide_notifications_container } from "../helpers/helper-functions";

const NotificationsContainer = ()=>{
    return (
        <div style={{display: "none"}} className="full-screen-container-shaded-bg" id="notifications-container">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end",height: "100%"}}>
                <div onClick={hide_notifications_container} className="popup-close-window-btn close-btn-with-bg notifications-window-close-btn" >
                    <i className="fa fa-times"></i>
                </div>
                <div id="notification-content-container">
                    <p style={{paddingBottom: 15, borderBottom: "1px solid rgba(0,0,0,0.1)",
                        color: "darkblue", fontSize: 15, fontWeight: "bolder", textAlign: "center", margin: 10, marginTop: 5}}>
                        <i style={{marginRight: 10}} className="fa-solid fa-bell"></i>
                        Notifications
                    </p>
                    <div id="notifications-list">
                        <div className="notifications-list-item">
                            <div className="title-section">
                                <div className="title">
                                    <div className="status-container">
                                        <div className="status"></div>
                                    </div>
                                    Notification Title
                                </div>
                                <p className="time">March 21 - 11:30am</p>
                            </div>
                            <div>
                                <p style={{color: "rgba(0,0,0,0.7)", fontSize: 14}}>This part of page will contain brief notification message...</p>
                            </div>
                        </div>
                        <div className="notifications-list-item">
                            <div className="title-section">
                                <div className="title">
                                    <div className="status-container">
                                        <div className="status"></div>
                                    </div>
                                    Notification Title
                                </div>
                                <p className="time">March 21 - 11:30am</p>
                            </div>
                            <div>
                                <p style={{color: "rgba(0,0,0,0.7)", fontSize: 14}}>This part of page will contain brief notification message...</p>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationsContainer;