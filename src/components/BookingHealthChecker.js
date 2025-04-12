import { useState } from "react";
import { 
    select_booking_from_list,
    add_commas_to_number
 } from "../helpers/helper-functions";

const BookingHealthChecker = (props) => {

    const {
        title,
        showButton,
    } = props;

    const [ data, setData ] = useState(props.data);

    const forceSetBookingHealthCheckerData = (data_p) => {
        setData(data_p);
    }

    window.__forceSetBookingHealthCheckerData = forceSetBookingHealthCheckerData;

    let booking_ref_number = "N/A";
    let actual_price = 0;
    let total_paid = 0;
    if(data?.originPayloads){
        booking_ref_number = data?.originPayloads[0]?.booking_reference || "N/A";
        actual_price = parseFloat(data?.originPayloads[0]?.total_amount).toFixed(0);
    }


    let booking_active_status_animated = ""; // [ 'animated-status-icon active', 'animated-status-icon error' ]
    let booking_active_status = ""; // [ 'active', 'error' ]
    let payment_active_status_animated = ""; // [ 'animated-status-icon active', 'animated-status-icon error' ]
    let payment_active_status = ""; // [ 'active', 'error' ]
    let booking_tt_msg = "No status to show for booking";
    let payment_tt_msg="No status to show for payment";
    if(data?.booking_intent){
        let b_success=(data?.booking_intent?.booking_status.toLowerCase()==="confirmed");
        let p_success=(data?.booking_intent?.payment_status.toLowerCase()==="succeeded");
        if (b_success) {
            booking_active_status_animated="animated-status-icon active";
            booking_active_status="active";
            booking_tt_msg="This booking was completed successfully";
        }else{
            booking_active_status_animated="animated-status-icon error";
            booking_active_status="error";
            booking_tt_msg="This booking completed with error";
        }
        if (p_success) {
            payment_active_status_animated="animated-status-icon active";
            payment_active_status="active";
            payment_tt_msg="The payment for this booking was successful";
        } else{
            payment_active_status_animated="animated-status-icon error";
            payment_active_status="error";
            payment_tt_msg="The payment for this booking failed";
        }

        if(data?.booking_intent?.payment_intent){
            total_paid = parseFloat(data?.booking_intent?.payment_intent?.amount/100).toFixed(0);
        }
        
    }

    let associated_customer_email = "N/A";
    if(data?.travellers){
        let t_with_emails=data?.travellers?.filter(traveler=>(traveler.email));
        if (t_with_emails?.length > 0){
            associated_customer_email = t_with_emails[0]?.email || "N/A";
        }
    }

    let booking_profit = "N/A";
    let booking_profit_desc = "";
    if (total_paid && actual_price) {
        // To do: deduct extra or service fees from total paid to get acurate percentage
        let p_diff = total_paid - actual_price;
        let b_profit_perc = ((p_diff*100)/actual_price).toFixed(0);
        booking_profit = `$${add_commas_to_number(p_diff)}`;
        booking_profit_desc = `= ${add_commas_to_number(b_profit_perc)}% or 
        ($${add_commas_to_number(total_paid)} - $${add_commas_to_number(actual_price)})`;
    }

    return <div style={{backgroundColor: "#2b343d", borderRadius: 6, padding: 20}}>
            <div style={{fontSize: 12, letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                <div style={{marginTop: 5, color: "rgba(255,255,255,0.7)", marginBottom: (showButton ? 0 : 10)}}>
                    <i style={{fontSize: 18, marginRight: 10, color: "rgba(0, 140, 255, 0.33)"}} className="fa-solid fa-heart-pulse"></i>
                    {title}
                </div>
                {
                    showButton && <div onClick={()=>alert('here')/*()=>select_booking_from_list("home")*/} 
                        id="booking-home-page-booking-tracker-view-more-btn">
                        See Details</div>
                }
            </div>
            <p style={{color: "white", margin: "20px 5px", fontSize: 13, fontWeight: "bolder", letterSpacing: 1}}>
                Ref: {booking_ref_number}
            </p>
            <div className="booking-status-tracker">
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid lightgreen"}}>
                    <div className={"booking-status-tracker-stage-point "+booking_active_status_animated} style={{right: "calc(100% - 14px)"}}>
                        <i className="fa fa-ticket"></i>
                    </div>
                    <div className={"booking-status-tracker-stage-point "+payment_active_status_animated}>
                        <i className="fa fa-credit-card"></i>
                    </div>
                    <p style={{display: "flex", justifyContent: "space-between", width: "calc(100% + 40px)", marginLeft: -20}}>
                        <span className={"booking-status-tracker-stage-title tool-tip-parent "+booking_active_status}>
                            Booking
                            <span className="tool-tip" style={{color: "black", textAlign: "initial"}}>
                                {booking_tt_msg}
                            </span>
                        </span> 
                        <span style={{marginRight: 0}} className={"booking-status-tracker-stage-title tool-tip-parent "+payment_active_status}>
                            Payment
                            <span className="tool-tip" style={{color: "black", textAlign: "initial"}}>
                                {payment_tt_msg}
                            </span>
                        </span>
                    </p>
                </div>
                <div  className="booking-status-tracker-stage"style={{borderTop: "5px solid gold",}}>
                    <div className="booking-status-tracker-stage-point">
                        <i className="fa fa-envelope"></i>
                    </div>
                    <p className="booking-status-tracker-stage-title tool-tip-parent">
                        Email Sent
                        <span className="tool-tip" style={{color: "black", textAlign: "initial"}}>
                            No status to show for email sent
                        </span>
                    </p>
                </div>
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid orange",}}>
                    <div className="booking-status-tracker-stage-point">
                    <i className="fa fa-exclamation-triangle"></i>
                    </div>
                    <p className="booking-status-tracker-stage-title tool-tip-parent">
                        Errors?
                        <span className="tool-tip" style={{color: "black", textAlign: "initial"}}>
                            No status to show for errors
                        </span>
                    </p>
                </div>
                <div className="booking-status-tracker-stage" style={{borderTop: "5px solid red",}}>
                    <p className="booking-status-tracker-stage-title tool-tip-parent">
                        All Good
                        <span className="tool-tip" style={{color: "black", textAlign: "initial"}}>
                            No status to show for all good
                        </span>
                    </p>
                    <div className="booking-status-tracker-stage-point">
                        <i className="fa fa-check"></i>
                    </div>
                </div>
            </div>
            <div style={{letterSpacing: 1, padding: 5, paddingLeft: 15, borderLeft: "3px solid orange", backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontSize: 13}}>
                <p style={{letterSpacing: 1, color: "white", fontSize: 13, marginBottom: 5}}>
                    Profit: 
                    <span style={{marginLeft: 10, color: "orange"}}>
                        {booking_profit}
                    </span>
                    <span style={{marginLeft: 5, color: "rgba(255, 255, 255, 0.57)"}}>
                        {booking_profit_desc}
                    </span>
                </p>
                <p style={{letterSpacing: 1, color: "white", fontSize: 13}}>
                    Email: 
                    <span style={{marginLeft: 10, color: "orange"}}>
                        {associated_customer_email}
                    </span>
                </p>
            </div>
        </div>
}

export default BookingHealthChecker;