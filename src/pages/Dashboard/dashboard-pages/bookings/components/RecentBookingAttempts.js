import { select_booking_from_list } from "../../../../../helpers/helper-functions";
import { useState } from "react";

const RecentBookingAttempts = (props) => {

    const [includeIntervalDates, setIncludeIntervalDates] = useState(false);

    const includeIntervalDatesOnInput = (e) => {
        setIncludeIntervalDates(e.target.checked)
    }

    return <div className="main-seaction-containers">
        <p className="title-font-color-default" style={{ color: "orange", fontWeight: "bolder", fontSize: 12}}>
            <i style={{marginRight: 10}} className="fa-solid fa-list-check"></i>
            Booking Attempts
        </p>
        <div style={{padding: 10, display: "flex"}}>
            <div style={{marginRight: 10}}>
                <p className="regular-font-color-dark-bg" 
                    style={{fontSize: 13, marginBottom: 5}}>
                        Type</p>
                <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                    <option style={{color: "black"}}>
                        All
                    </option>
                    <option style={{color: "black"}}>
                        Flights
                    </option>
                </select>
            </div>
            <div style={{marginRight: 10}}>
                <div style={{display: "flex"}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                        Email</p>
                </div>
                <input placeholder="enter email here..."
                    style={{padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
            </div>
            <div style={{marginRight: 10}}>
                <div style={{display: "flex"}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                        Ref. Number</p>
                </div>
                <input placeholder="enter ref num. here..."
                    type="text"
                    style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
            </div>
            <div style={{marginRight: 10}}>
                <div style={{display: "flex"}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                        Interval</p>
                        <div style={{display: "flex", marginLeft: 10, paddingLeft: 10, borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "red", fontSize: 13, marginLeft: 5, marginBottom: 5}}>
                                <input checked={includeIntervalDates}
                                    onChange={includeIntervalDatesOnInput} 
                                    id="history_include_date_intervals_checkbox" type="checkbox" />
                            </p>
                            <p style={{color: "lightgreen", fontSize: 13, marginLeft: 5, marginBottom: 5}}>
                                <label htmlFor="history_include_date_intervals_checkbox">Select Interval</label>
                            </p>
                        </div>
                </div>
                <div style={{display: includeIntervalDates ? "none" : "block", padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                    <p style={{fontSize: 13, textAlign: "center"}}>
                        <i style={{color: "orangered", marginRight: 10}} 
                            className="fa fa-exclamation-triangle"></i>
                        Search Without Interval</p>
                </div>
                <input id="booking-attempts-pane-filter-by-dates-input" readOnly="true" 
                    placeholder="select dates here..."
                    style={{display: includeIntervalDates ? "block" : "none", padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
            </div>
        </div>
        <div id="bookings-pane-recent-booking-attempts-list-container">
            <table id="bookings-pane-booking-attempts-list" 
                className="bookings-pane-booking-list">
                <div style={{color: "white", padding: 50, backgroundColor: "rgba(255,0,0,0.1)", display: "flex", justifyContent: "center"}}>
                    <i style={{color: "yellow", marginRight: 10}} className="fa fa-spinner"></i>
                    <p style={{fontSize: 13}}>Please wait while initializing...</p>
                </div>
            {/** This is supposed to start a comment */}
                {/*<tr className="header">
                    <td className="header">
                        Booking
                    </td>
                    <td className="header" style={{backgroundColor: "lightgrey"}}>
                        Status
                    </td>
                    <td className="header mobile-hidden">
                        Email
                    </td>
                    <td className="header mobile-hidden">
                        Condition
                    </td>
                    <td className="header">
                        Attempt Date
                    </td>
                    <td className="header">
                        Ref. Number
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "teal"}} className="fa fa-plane"></i>
                        $200.59
                    </td>
                    <td className="bookings-pane-booking-list-column second" style={{background: "rgb(0, 101, 94)", color: "white"}}>
                        <i style={{marginRight: 5, color: "lightgreen"}} className="fa-solid fa-check"></i>
                        Success
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        Booking and Payment Completed successfully
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        XYYEVW
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "teal"}} className="fa fa-plane"></i>
                        $250.55
                    </td>
                    <td className="bookings-pane-booking-list-column second" style={{background: "rgb(255, 157, 122)",}}>
                        <i style={{marginRight: 5, color: "red"}} className="fa fa-exclamation-triangle"></i>
                        Failed
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        In Catch() Block: Requested offer is no longer available
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon" style={{color: "grey"}}>
                        N/A
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "teal"}} className="fa fa-plane"></i>
                        $130.23
                    </td>
                    <td className="bookings-pane-booking-list-column second" style={{background: "rgb(0, 74, 101)", color: "white"}}>
                        <i style={{marginRight: 5, color: "yellow"}} className="fa fa-person-walking-arrow-loop-left"></i>
                        Uncompleted
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        Booking or Payment were not Completed
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon" style={{color: "grey"}}>
                        N/A
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "teal"}} className="fa fa-building"></i>
                        $140.22
                    </td>
                    <td className="bookings-pane-booking-list-column second" style={{background: "rgb(0, 101, 94)", color: "white"}}>
                        <i style={{marginRight: 5, color: "lightgreen"}} className="fa fa-check"></i>
                        Success
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        kinki@gmail.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        Booking and Payment Completed successfully
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        April 14 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        DGHGZC
                    </td>
                </tr>*/}
            {/*This is supposed to end a comment **/}
            </table>
        </div>
        <div id="recent_booking_attempts_pagination_list_markup" className="pagination-numbers-list">
            
        </div>
    </div>
}

export default RecentBookingAttempts;