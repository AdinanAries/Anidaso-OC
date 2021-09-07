import { hide_notifications_container } from "./helper-functions";

const NotificationsContainer = ()=>{
    return (
        <div style={{display: "none"}} className="full-screen-container-shaded-bg" id="notifications-container">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end",height: "100%"}}>
                <div onClick={hide_notifications_container} className="popup-close-window-btn close-btn-with-bg" >
                    <i className="fa fa-times"></i>
                </div>
                <div id="notification-content-container">
                    <p style={{color: "darkblue", fontSize: 14, fontWeight: "bolder", textAlign: "center"}}>
                        Notifications</p>
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
                                <p style={{color: "rgba(0,0,0,0.7)", fontWeight: "bolder", fontSize: 14}}>This part of page will contain brief notification message...</p>
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
                                <p style={{color: "rgba(0,0,0,0.7)", fontWeight: "bolder", fontSize: 14}}>This part of page will contain brief notification message...</p>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationsContainer;