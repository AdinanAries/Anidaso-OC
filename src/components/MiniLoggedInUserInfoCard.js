const MiniLoggedInUserInfoCard = (props) => {
    return <div style={{cursor: "pointer", background: "rgba(255,255,255,0.1)", borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)", margin: 5}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)"}}>
                    <i style={{color: "orange", fontSize: 22}} className="fa fa-user"></i>
                </div>
                <p style={{fontSize: 12, color: "orange", marginLeft: 10}}>
                    Mohammed
                </p>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)"}}>
                <i style={{color: "lightgreen", fontSize: 16}} className="fa fa-pencil"></i>
            </div>
        </div>
    </div>
}

export default MiniLoggedInUserInfoCard;