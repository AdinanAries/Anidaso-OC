import { select_booking_from_list } from "../../../../../helpers/helper-functions";
import { useState } from "react";

const RecentBookings = (props) => {

    const [includeIntervalDates, setIncludeIntervalDates] = useState(false);

    const includeIntervalDatesOnInput = (e) => {
        setIncludeIntervalDates(e.target.checked)
    }

    return <div className="main-seaction-containers">
        <p className="title-font-color-default" style={{color: "lightgreen", fontWeight: "bolder", fontSize: 12}}>
            <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-check"></i>
            Confirmed Bookings
        </p>
        <div style={{padding: 10, display: "flex"}}>
            <div style={{marginRight: 10}}>
                <p className="regular-font-color-dark-bg" 
                    style={{fontSize: 13, marginBottom: 5}}>
                        Type</p>
                <select style={{padding: "10px 20px", borderRadius: 5, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#eee"}}>
                    <option>
                        All
                    </option>
                    <option>
                        Flights
                    </option>
                </select>
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
                <div style={{display: includeIntervalDates ? "none" : "block", padding: "10px 20px", borderRadius: 5, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#eee"}}>
                    <p style={{fontSize: 13, textAlign: "center"}}>
                        <i style={{color: "orangered", marginRight: 10}} 
                            className="fa fa-exclamation-triangle"></i>
                        Search Without Interval</p>
                </div>
                <input id="bookings-pane-filter-by-dates-input" readOnly="true" 
                    style={{display: includeIntervalDates ? "block" : "none", padding: "10px 20px", borderRadius: 5, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#eee"}}/>
            </div>
        </div>
        <div id="bookings-pane-recent-bookings-list-container">
            <table id="bookings-pane-recent-bookings-list" 
                className="bookings-pane-booking-list">
                <div style={{color: "white", padding: 50, backgroundColor: "rgba(255,0,0,0.1)", display: "flex", justifyContent: "center"}}>
                    <i style={{color: "yellow", marginRight: 10}} className="fa fa-spinner"></i>
                    <p style={{fontSize: 13}}>Please wait while initializing...</p>
                </div>
            {/** This is supposed to start a comment */}
                {/*<tr className="header">
                    <td className="header">
                        Type
                    </td>
                    <td className="header">
                        Reference No.
                    </td>
                    <td className="header mobile-hidden">
                        Email
                    </td>
                    <td className="header mobile-hidden">
                        Departure - Destination
                    </td>
                    <td className="header">
                        Booking Date
                    </td>
                    <td className="header"></td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "rgb(255,122,122)"}} className="fa fa-history"></i>
                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                        flight
                    </td>
                    <td className="bookings-pane-booking-list-column second">
                        0233922278
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        CGD - MAD
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "lightgreen"}} className="fa fa-check"></i>
                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                        flight
                    </td>
                    <td className="bookings-pane-booking-list-column second">
                        0233922278
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        LGA - ACC
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "lightgreen"}} className="fa fa-check"></i>
                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-building"></i>
                        hotel
                    </td>
                    <td className="bookings-pane-booking-list-column second">
                    4353543534
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        kinki@gmail.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        ACC - NGA
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        April 14 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr onClick={()=>select_booking_from_list("home")}>
                    <td className="bookings-pane-booking-list-column first booking-type-col">
                        <i style={{marginRight: 5, color: "skyblue"}} className="fa fa-level-up"></i>
                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                        flight
                    </td>
                    <td className="bookings-pane-booking-list-column second">
                        0233922278
                    </td>
                    <td className="bookings-pane-booking-list-column first mobile-hidden">
                        adinanaries@outlook.com
                    </td>
                    <td className="bookings-pane-booking-list-column second mobile-hidden">
                        MAD - CGD
                    </td>
                    <td className="bookings-pane-booking-list-column first">
                        March 23 2021
                    </td>
                    <td className="bookings-pane-booking-list-column second edit-icon">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                </tr>*/}
            {/*This is supposed to end a comment **/}
            </table>
        </div>
        <div id="recent_bookings_pagination_list_markup" className="pagination-numbers-list">
            
        </div>
    </div>
}

export default RecentBookings;