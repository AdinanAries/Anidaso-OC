import {
    toggle_show_main_sections
} from "../helpers/helper-functions";

const MiniLoggedInUserInfoCard = (props) => {

    const {
        userDetails
    } = props;

    const showUserPage = () => {
        // user from props, maybe
        toggle_show_main_sections("staff");
        window.__viewStaffInfo(userDetails?._id);
    }
    return <div onClick={showUserPage} style={{cursor: "pointer", background: "rgba(255,255,255,0.1)", borderRadius: 50, margin: "20px 10px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)"}}>
                    <i style={{color: "orange", fontSize: 22}} className="fa fa-user"></i>
                </div>
                <p className="tool-tip-parent" style={{fontSize: 12, color: "orange", marginLeft: 10}}>
                    <span className="tool-tip" style={{color: "black", left: -30}}>
                        {((userDetails?.first_name +" "+ userDetails?.last_name) || "full name not found")}
                    </span>
                    {(((userDetails?.first_name).substring(0,5)+"...") || "N/A")} - <span style={{color: "white", fontSize: 12}}>
                        {((userDetails?.role_info?.title).substring(0,5) || "N/A")}</span>
                </p>
            </div>
        </div>
    </div>
}

export default MiniLoggedInUserInfoCard;