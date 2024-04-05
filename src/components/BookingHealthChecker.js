import { select_booking_from_list } from "../helpers/helper-functions";

const BookingHealthChecker = (props) => {

    const {
        title,
        showButton
    } = props;

    return <div style={{backgroundColor: "#2b343d",borderRadius: 6, padding: 10}}>
            <div style={{fontSize: 12, letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                <div style={{marginTop: 5, color: "rgba(255,255,255,0.7)", marginBottom: (showButton ? 0 : 10)}}>
                    <i style={{marginRight: 5, color: "aqua"}} className="fa fa-heart"></i>
                    {title}
                </div>
                {
                    showButton && <div onClick={()=>select_booking_from_list("home")} 
                        id="booking-home-page-booking-tracker-view-more-btn">
                        see details</div>
                }
            </div>
            <p style={{color: "white", margin: 5, fontSize: 13, fontWeight: "bolder", letterSpacing: 1}}>
                <i style={{color: "crimson", marginRight: 10, fontSize: 17}} className="fa fa-plane"></i>
                Ref: G5U28E
            </p>
            <div className="booking-status-tracker">
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid lightgreen"}}>
                    <div className="booking-status-tracker-stage-point active animated-status-icon" style={{backgroundColor: "green", right: "calc(100% - 14px)"}}>
                        <i className="fa fa-ticket"></i>
                    </div>
                    <div className="booking-status-tracker-stage-point active animated-status-icon" style={{backgroundColor: "green"}}>
                        <i className="fa fa-credit-card"></i>
                    </div>
                    <p className="booking-status-tracker-stage-title" style={{display: "flex", justifyContent: "space-between", width: "calc(100% + 40px)", marginLeft: -20}}>
                        <span>Booking</span> <span>Payment</span></p>
                </div>
                <div  className="booking-status-tracker-stage"style={{borderTop: "5px solid gold",}}>
                    <div className="booking-status-tracker-stage-point active animated-status-icon" style={{backgroundColor: "goldenrod"}}>
                        <i className="fa fa-envelope"></i>
                    </div>
                    <p className="booking-status-tracker-stage-title">
                        Email Sent</p>
                </div>
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid orange",}}>
                    <div className="booking-status-tracker-stage-point" style={{backgroundColor: "orangered"}}>
                    <i className="fa fa-exclamation-triangle"></i>
                    </div>
                    <p className="booking-status-tracker-stage-title" style={{color: "red"}}>
                        Errors?</p>
                </div>
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid red",}}>
                    <p className="booking-status-tracker-stage-title" style={{color: "lightgreen"}}>
                        All Good</p>
                    <div className="booking-status-tracker-stage-point active animated-status-icon">
                        <i className="fa fa-check"></i>
                    </div>
                </div>
            </div>
            <div style={{letterSpacing: 1, padding: 5, paddingLeft: 15, borderLeft: "3px solid orange", backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontSize: 13}}>
                <p style={{letterSpacing: 1, color: "white", fontSize: 13, marginBottom: 5}}>
                    Confirmation: 
                    <span style={{marginLeft: 10, color: "orange"}}>
                        97362223673836
                    </span>
                </p>
                <p style={{letterSpacing: 1, color: "white", fontSize: 13}}>
                    Email: 
                    <span style={{marginLeft: 10, color: "orange"}}>
                        adinanaries@outlook.com
                    </span>
                </p>
            </div>
        </div>
}

export default BookingHealthChecker;