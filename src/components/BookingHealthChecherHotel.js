import { select_booking_from_list } from "../helpers/helper-functions"

const BookingHealthCheckerHotel = (props) => {
    return <div style={{display: "none", backgroundColor: "rgb(43,23,99)",borderRadius: 6, padding: 10}}>
        <div style={{fontSize: 13, fontWeight: "bolder", letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
            <div style={{marginTop: 5, color: "white"}}>
                <i style={{marginRight: 5, color: "aqua"}} className="fa fa-history"></i>
                Preview</div>
            <div onClick={()=>select_booking_from_list("home")} id="booking-home-page-booking-tracker-view-more-btn">
                see details</div>
        </div>
        <p style={{color: "white", margin: 5, fontSize: 13, fontWeight: "bolder", letterSpacing: 1}}>
            <i style={{color: "crimson", marginRight: 10, fontSize: 17}} className="fa fa-building"></i>
            Hotel Booking
        </p>
        <div className="booking-status-tracker">
            <div className="booking-status-tracker-stage" style={{borderTop: "5px solid lightgreen"}}>
                <div className="booking-status-tracker-stage-point" style={{backgroundColor: "green", right: "calc(100% - 14px)"}}>
                    <i className="fa fa-user"></i>
                </div>
                <div className="booking-status-tracker-stage-point" style={{backgroundColor: "green"}}>
                    <i className="fa fa-money"></i>
                </div>
                <p className="booking-status-tracker-stage-title" style={{display: "flex", justifyContent: "space-between", width: "calc(100% + 40px)", marginLeft: -20}}>
                    <span>Booked</span> <span>Paid-for</span></p>
            </div>
            <div  className="booking-status-tracker-stage"style={{borderTop: "5px solid gold",}}>
                <div className="booking-status-tracker-stage-point" style={{backgroundColor: "goldenrod"}}>
                    <i className="fa fa-key"></i>
                </div>
                <p className="booking-status-tracker-stage-title">
                    Checked-in</p>
            </div>
            <div className="booking-status-tracker-stage" style={{borderTop: "5px solid orange",}}>
                <div className="booking-status-tracker-stage-point" style={{backgroundColor: "orangered"}}>
                <i className="fa fa-bed"></i>
                </div>
                <p className="booking-status-tracker-stage-title">
                    Staying</p>
            </div>
            <div className="booking-status-tracker-stage" style={{borderTop: "5px solid red",}}>
                <p className="booking-status-tracker-stage-title">
                    Checked-out</p>
                <div className="booking-status-tracker-stage-point active animated-status-icon">
                    <i className="fa fa-history"></i>
                </div>
            </div>
        </div>
        <div style={{letterSpacing: 1, padding: 5, paddingLeft: 15, borderLeft: "3px solid orange", backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontSize: 13}}>
            <p style={{letterSpacing: 1, color: "white", fontSize: 13, marginBottom: 5}}>
                Record ID: 
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