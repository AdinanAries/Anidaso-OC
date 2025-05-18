import { onclickSearchBookedHotel } from "../helpers/endpoint-calls";
import { toggle_show_main_sections } from "../helpers/helper-functions";
import CONSTANTS from "../constants/Constants";

function BookedHotelsSearchForm(props){

    const {
        userDetails,
    } = props;

    let isOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    return (
        <div id="bookings-pane-booked-hotels-search-form" style={{display: "none", marginTop: 10}}>
            <div className="two-inputs-flex-container">
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-hotel"></i>
                        Hotel Name</p>
                    <input id="booked-hotel-search-name-input" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter name here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Hotel City</p>
                    <input id="booked-hotel-search-city-input" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter city here"
                    />
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 20}}>
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-envelope"></i>
                        Customer Email</p>
                    <input id="booked-hotel-search-email-input" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter customer email here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-calendar"></i>
                        Checkin - Checkout Dates</p>
                    <input id="booked-hotel-search-dates-input" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="select dates here"
                    />
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "calc(100% - 150px)"}} onClick={onclickSearchBookedHotel} className="standard-action-button">
                    Search
                </div>
                <div onClick={()=>{
                        toggle_show_main_sections("staff");
                        if(isAgent){
                            window.__viewStaffInfo(userDetails?._id);
                            window.__showBookingEnginePage();
                        }
                    }}
                    className='tool-tip-parent'
                    style={{fontSize: 13, whiteSpace: "nowrap", margin: 20, marginBottom: 0, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                        className={"fa-solid fa-"+(isAgent ? "server" : "users")}></i>
                        {isAgent ? "Booking Engine" : "Manage Staff"}
                    {
                        isAgent &&
                        <div className='tool-tip' style={{color: "black", left: -100}}>
                            You can share your booking engine link or put it on your business website to allow your customers to search on their own.
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default BookedHotelsSearchForm;