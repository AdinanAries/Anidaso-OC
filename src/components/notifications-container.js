const NotificationsContainer = ()=>{
    return (
        <div style={{display: "none"}} className="full-screen-container-shaded-bg" id="notifications-container">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end",height: "100%"}}>
                <div style={{maxWidth: 400, width: "100%", height: "100%", backgroundColor: "white", padding: 10}}>
                    <p style={{color: "darkblue", fontSize: 14, fontWeight: "bolder", textAlign: "center"}}>
                        Notifications</p>
                </div>
            </div>
        </div>
    );
}

export default NotificationsContainer;