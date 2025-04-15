const StaffListItem = (props) => {

    const {
        viewStaffInfo,
        info
    } = props;

    const viewStaffInfoOnclick = () => {
        viewStaffInfo(info?._id);
    }

    return <div onClick={viewStaffInfoOnclick} style={{background: "rgba(0,0,0,0.1)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)"}}>
                    <i style={{color: "orange", fontSize: 27}} className="fa fa-user"></i>
                </div>
                <div>
                    <p style={{fontSize: 14, color: "orange", marginLeft: 10}}>
                        {info.first_name} {info.last_name}
                    </p>
                    <p style={{fontSize: 12, color: "rgba(255,255,255,0.8)", marginLeft: 10}}>
                        {info.email}
                    </p>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%", border: "1px solid rgba(255,255,255,0.1)"}}>
                <i style={{color: "lightgreen", fontSize: 20}} className="fa fa-angle-right"></i>
            </div>
        </div>
    </div>
}

export default StaffListItem;