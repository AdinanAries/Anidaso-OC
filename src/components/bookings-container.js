import BookedFlightsSearchForm from "./booked-flghts-search-form";
import BookedHotelsSearchForm from "./booked-hotels-search-form";
import BookedCarsSearchForm from "./booked-cars-search-form";

import { show_booking_search_type_form, show_bookings_pane_main_page, show_bookings_pane_search_results_page, show_bookings_pane_selected_results_page } from "./helper-functions";
import { getBookingById } from "./endpoint-calls";

let where = "home";
export function select_booking_from_list(where_param, id="none"){
    where = where_param;
    show_bookings_pane_selected_results_page()
    getBookingById(id);
}

function back_from_selected_result_pane(){
    if(where === "home"){
        show_bookings_pane_main_page();
    }else if(where === "results"){
        show_bookings_pane_search_results_page();
    }
}

let BookingsContainer = ()=>{
    return(
         <section id="bookings-container">
             <div id="bookings-container-main-pane">
                <div className="main-seaction-containers">
                    <div className="booking-pane-search-type-options">
                        <div onClick={()=>show_booking_search_type_form("flights")} id="booking-pane-search-type-flights-option" className="booking-pane-search-type-each-option active">
                            <i className="fa fa-plane"></i>
                            Flights
                        </div>
                        <div onClick={()=>show_booking_search_type_form("hotels")} id="booking-pane-search-type-hotels-option" className="booking-pane-search-type-each-option">
                            <i className="fa fa-bed"></i>
                            Hotels
                        </div>
                        <div onClick={()=>show_booking_search_type_form("cars")} id="booking-pane-search-type-cars-option" className="booking-pane-search-type-each-option">
                            <i className="fa fa-car"></i>
                            Cars
                        </div>
                    </div>
                    <div className="booking-pane-search-inputs-area">
                        <div className="booking-pane-search-inputs-area-inputs-section">
                            <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                                Search Booking
                            </p>
                            <BookedFlightsSearchForm />
                            <BookedHotelsSearchForm />
                            <BookedCarsSearchForm />

                        </div>
                        <div className="booking-pane-search-inputs-area-other-section">
                            
                            <div style={{display: "none",backgroundColor: "rgb(43,23,99)",borderRadius: 6, padding: 10}}>
                                <div style={{fontSize: 13, fontWeight: "bolder", letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                                    <div style={{marginTop: 5, color: "white"}}>
                                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-history"></i>
                                        Last Viewed</div>
                                    <div onClick={()=>select_booking_from_list("home")} id="booking-home-page-booking-tracker-view-more-btn">
                                        view again</div>
                                </div>
                                <p style={{color: "white", margin: 5, fontSize: 13, fontWeight: "bolder", letterSpacing: 1}}>
                                    <i style={{color: "crimson", marginRight: 10, fontSize: 17}} className="fa fa-plane"></i>
                                    Fight Booking
                                </p>
                                <div className="booking-status-tracker">
                                    <div className="booking-status-tracker-stage" style={{borderTop: "5px solid lightgreen"}}>
                                        <div className="booking-status-tracker-stage-point" style={{backgroundColor: "green", right: "calc(100% - 14px)"}}>
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <div className="booking-status-tracker-stage-point" style={{backgroundColor: "green"}}>
                                            <i className="fa fa-ticket"></i>
                                        </div>
                                        <p className="booking-status-tracker-stage-title" style={{display: "flex", justifyContent: "space-between", width: "calc(100% + 40px)", marginLeft: -20}}>
                                            <span>Booked</span> <span>Ticketed</span></p>
                                    </div>
                                    <div  className="booking-status-tracker-stage"style={{borderTop: "5px solid gold",}}>
                                        <div className="booking-status-tracker-stage-point" style={{backgroundColor: "goldenrod"}}>
                                            <i className="fa fa-briefcase"></i>
                                        </div>
                                        <p className="booking-status-tracker-stage-title">
                                            Checked-in</p>
                                    </div>
                                    <div className="booking-status-tracker-stage" style={{borderTop: "5px solid orange",}}>
                                        <div className="booking-status-tracker-stage-point" style={{backgroundColor: "orangered"}}>
                                        <i className="fa fa-plane"></i>
                                        </div>
                                        <p className="booking-status-tracker-stage-title">
                                            Boarded</p>
                                    </div>
                                    <div className="booking-status-tracker-stage" style={{borderTop: "5px solid red",}}>
                                        <p className="booking-status-tracker-stage-title">
                                            Flown</p>
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
                            <div style={{backgroundColor: "rgb(43,23,99)",borderRadius: 6, padding: 10}}>
                                <div style={{fontSize: 13, fontWeight: "bolder", letterSpacing: 1, display: "flex", justifyContent: "space-between"}}>
                                    <div style={{marginTop: 5, color: "white"}}>
                                        <i style={{marginRight: 5, color: "aqua"}} className="fa fa-history"></i>
                                        Last Viewed</div>
                                    <div onClick={()=>select_booking_from_list("home")} id="booking-home-page-booking-tracker-view-more-btn">
                                        view again</div>
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
                        
                        </div>
                    </div>
                </div>
                <div className="main-seaction-containers">
                    <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                        Recent Bookings
                    </p>
                    <div style={{padding: 10, display: "flex"}}>
                        <p style={{fontSize: 14, fontWeight: "bolder", marginRight: 20, color: "rgba(0,0,0,0.6)"}}>
                            Filters: 
                        </p>
                        <div style={{marginRight: 10}}>
                            <p style={{fontSize: 13, marginBottom: 5}}>Type</p>
                            <select style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}>
                                <option>
                                    All
                                </option>
                                <option>
                                    Flights
                                </option>
                            </select>
                        </div>
                        <div style={{marginRight: 10}}>
                            <p style={{fontSize: 13, marginBottom: 5}}>Booking Dates</p>
                            <input id="bookings-pane-filter-by-dates-input" readOnly="true" style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}/>
                        </div>
                    </div>
                    <div id="bookings-pane-recent-bookings-list-container">
                        <table id="bookings-pane-recent-bookings-list" className="bookings-pane-booking-list">
                        {/** This is supposed to start a comment */}
                            <tr className="header">
                                <td className="header">
                                    Type
                                </td>
                                <td className="header">
                                    Confirmation
                                </td>
                                <td className="header mobile-hidden">
                                    Email
                                </td>
                                <td className="header mobile-hidden">
                                    Origin - Destination
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
                            </tr>
                        {/*This is supposed to end a comment **/}
                        </table>
                    </div>
                    <div id="recent_bookings_pagination_list_markup" className="pagination-numbers-list">
                        
                    </div>
                </div>
            </div>
            <div id="booking-container-search-results-pane" style={{display: "none"}}>
                <div className="main-seaction-containers">
                    <div onClick={show_bookings_pane_main_page} className="standard-button">
                        <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-arrow-left"></i>
                        Back
                    </div>
                    <div id="bookings-pane-fights-search-results-list-container">
                        <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                            Search Results
                        </p>
                        <div style={{padding: 10, display: "flex"}}>
                            <p style={{fontSize: 14, fontWeight: "bolder", marginRight: 20, color: "rgba(0,0,0,0.6)"}}>
                                Filters: 
                            </p>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Type</p>
                                <select style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}>
                                    <option>
                                        All
                                    </option>
                                    <option>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Booking Dates</p>
                                <input value="March 23 - Jun 15" style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}/>
                            </div>
                        </div>
                        <table id="bookings-pane-search-results-bookings-list" className="bookings-pane-booking-list">
                            <tr className="header">
                                <td className="header">
                                    Type
                                </td>
                                <td className="header">
                                    Travel Dates
                                </td>
                                <td className="header mobile-hidden">
                                    Email
                                </td>
                                <td className="header mobile-hidden">
                                    Name
                                    </td>
                                <td className="header">
                                    Airports
                                </td>
                            </tr>
                            <tr onClick={()=>select_booking_from_list("results")}>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    <i style={{marginRight: 5, color: "rgb(255,122,122)"}} className="fa fa-history"></i>
                                    <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                                    One-way
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 24 - Mar 26
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                            </tr>
                            <tr onClick={()=>select_booking_from_list("results")}>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    <i style={{marginRight: 5, color: "skyblue"}} className="fa fa-level-up"></i>
                                    <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                                    Rount-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Apr 27 - May 06
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                            </tr>
                            <tr onClick={()=>select_booking_from_list("results")}>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    <i style={{marginRight: 5, color: "lightgreen"}} className="fa fa-check"></i>
                                    <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                                    Multi-city
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 22 - Mar 23
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    kinki@gmail.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Kwaku Manu
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                            </tr>
                            <tr onClick={()=>select_booking_from_list("results")}>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    <i style={{marginRight: 5, color: "skyblue"}} className="fa fa-level-up"></i>
                                    <i style={{marginRight: 5, color: "aqua"}} className="fa fa-plane"></i>
                                    Round-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 02 - Mar 07
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    ACC - LGA
                                </td>
                            </tr>
                        </table>
                        <div id="search_results_bookings_pagination_list_markup" className="pagination-numbers-list">
                            <div className="previous-next-btn">
                                <i className="fa fa-caret-left"></i>
                            </div>
                            <div className="numbers">
                                <div className="each-number">
                                    1
                                </div>
                                <div className="each-number">
                                    20
                                </div>
                                <div className="each-number">
                                    40
                                </div>
                                <div className="each-number">
                                    60
                                </div>
                            </div>
                            <div style={{marginLeft: 5}} className="previous-next-btn">
                                <i className="fa fa-caret-right"></i>
                            </div>
                        </div>
                    </div>
                    <div id="bookings-pane-hotels-search-results-list-container" style={{display: "none"}}>
                        <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                            Search Results
                        </p>
                        <div style={{padding: 10, display: "flex"}}>
                            <p style={{fontSize: 14, fontWeight: "bolder", marginRight: 20, color: "rgba(0,0,0,0.6)"}}>
                                Filters: 
                            </p>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Type</p>
                                <select style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}>
                                    <option>
                                        All
                                    </option>
                                    <option>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Booking Dates</p>
                                <input value="March 23 - Jun 15" style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}/>
                            </div>
                        </div>
                        <table className="bookings-pane-booking-list">
                            <tr>
                                <td className="header">
                                    Hotel Name
                                </td>
                                <td className="header">
                                    Checkin
                                </td>
                                <td className="header mobile-hidden">
                                    City
                                </td>
                                <td className="header mobile-hidden">
                                    Cust. Name
                                </td>
                                <td className="header">
                                    Email
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Despite Properties
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 24, 2021
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Rount-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Apr 27 - May 06
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Multi-city
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 22 - Mar 23
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    kinki@gmail.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Kwaku Manu
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Round-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 02 - Mar 07
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    ACC - LGA
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="bookings-pane-cars-search-results-list-container" style={{display: "none"}}>
                        <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                            Search Results
                        </p>
                        <div style={{padding: 10, display: "flex"}}>
                            <p style={{fontSize: 14, fontWeight: "bolder", marginRight: 20, color: "rgba(0,0,0,0.6)"}}>
                                Filters: 
                            </p>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Type</p>
                                <select style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}>
                                    <option>
                                        All
                                    </option>
                                    <option>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p style={{fontSize: 13, marginBottom: 5}}>Booking Dates</p>
                                <input value="March 23 - Jun 15" style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}/>
                            </div>
                        </div>
                        <table className="bookings-pane-booking-list">
                            <tr>
                                <td className="header">
                                    Type
                                </td>
                                <td className="header">
                                    Departure - Return
                                </td>
                                <td className="header mobile-hidden">
                                    Email
                                </td>
                                <td className="header mobile-hidden">
                                    Name
                                    </td>
                                <td className="header">
                                    Origin - Destination
                                </td>
                                <td className="header"></td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    One-way
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 24 - Mar 26
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Rount-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Apr 27 - May 06
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Multi-city
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 22 - Mar 23
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    kinki@gmail.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Kwaku Manu
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    MAD - CDG
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                            <tr>
                                <td className="bookings-pane-booking-list-column first booking-type-col">
                                    Round-trip
                                </td>
                                <td className="bookings-pane-booking-list-column second">
                                    Mar 02 - Mar 07
                                </td>
                                <td className="bookings-pane-booking-list-column first mobile-hidden">
                                    adinanaries@outlook.com
                                </td>
                                <td className="bookings-pane-booking-list-column second mobile-hidden">
                                    Mohammed Adinan
                                </td>
                                <td className="bookings-pane-booking-list-column first">
                                    ACC - LGA
                                </td>
                                <td className="bookings-pane-booking-list-column second edit-icon">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="booking-container-selected-results-pane" style={{display: "none"}}>
                <div className="main-seaction-containers">
                    <div style={{display: "flex"}}>
                        <div onClick={back_from_selected_result_pane} className="standard-button" style={{marginRight: 10}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-arrow-left"></i>
                            Back
                        </div>
                        <div onClick={show_bookings_pane_main_page} className="standard-button">
                            <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-home"></i>
                            Home
                        </div>
                    </div>
                    <div className="general-two-flex-children">
                        <div className="general-two-flex-child first shaded-info-center">
                            
                            <div id="selected_booking_status_display_container">

                            </div>

                            <div id="selected_booking_general_information_container">

                            </div>
                            
                            <div style={{marginTop: 20}}>
                                <p style={{color: "rgba(0,0,0,0.7)", fontWeight: "bolder", fontSize: 14, textAlign: "center"}}>
                                    Travelers Information
                                </p>
                                <div id="selected_booking_travelers_or_guests_list">
                                    
                                </div>
                            </div>
                            <div style={{marginTop: 20}}>
                                <p style={{color: "rgba(0,0,0,0.7)", fontWeight: "bolder", fontSize: 14, textAlign: "center"}}>
                                    Price Information
                                </p>
                                <div>
                                    <div style={{marginBottom: 20, borderLeft: "3px solid orangered", padding: 10}}>
                                        <p style={{fontSize: 14, fontWeight: "bolder", marginBottom: 5}}>
                                            Base Price: 
                                            <span style={{marginLeft: 10}}>$500.23</span>
                                        </p>
                                        <p style={{fontSize: 14, fontWeight: "bolder", marginBottom: 5,}}>
                                            Taxes: 
                                            <span style={{marginLeft: 10}}>$230.23</span>
                                        </p>
                                        <p style={{fontSize: 14, fontWeight: "bolder", marginBottom: 5, color: "brown"}}>
                                            Total: 
                                            <span style={{marginLeft: 10}}>$730.46</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="general-two-flex-child second shaded-info-center">
                            <p style={{color: "rgba(0,0,0,0.7)", fontWeight: "bolder", fontSize: 14, marginBottom: 20, textAlign: "center"}}>
                                Itenirary Information</p>
                            <div>
                                <div  style={{marginBottom: 20}}>
                                    <p style={{color: "rgba(0,0,0,0.7)", fontSize: 14, marginBottom: 10}}>
                                        <i style={{color: "orangered", marginRight: 5}} className="fa fa-check"></i>
                                        Departure Segments
                                        <span style={{marginLeft: 10, color: "blue"}}>14h 25mins</span>
                                        </p>
                                    <div>
                                        <div style={{borderLeft: "3px solid orangered", padding: 10, marginLeft: 10}}>
                                            <p style={{fontSize: 14, marginBottom: 5, color: "brown", fontWeight: "bolder"}}>
                                                Accra, Ghana (ACC) - New York, USA (LGA)
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                March 24, 12:30am - March 25, 11:15pm
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Amarican Airline, Etheopian Airline
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Boem wide-belly B211
                                            </p>
                                        </div>
                                        <div style={{borderLeft: "3px solid orangered", padding: 10, marginLeft: 10}}>
                                            <p style={{fontSize: 14, marginBottom: 5, color: "brown", fontWeight: "bolder"}}>
                                                Accra, Ghana (ACC) - New York, USA (LGA)
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                March 24, 12:30am - March 25, 11:15pm
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Amarican Airline, Etheopian Airline
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Boem wide-belly B211
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginBottom: 20}}>
                                    <p style={{color: "rgba(0,0,0,0.7)", fontSize: 14, marginBottom: 10}}>
                                        <i style={{color: "orangered", marginRight: 5}} className="fa fa-check"></i>
                                        Return Segments
                                        <span style={{marginLeft: 10, color: "blue"}}>14h 25mins</span>
                                        </p>
                                    <div>
                                        <div style={{borderLeft: "3px solid orangered", padding: 10, marginLeft: 10}}>
                                            <p style={{fontSize: 14, marginBottom: 5, color: "brown", fontWeight: "bolder"}}>
                                                Accra, Ghana (ACC) - New York, USA (LGA)
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                March 24, 12:30am - March 25, 11:15pm
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Amarican Airline, Etheopian Airline
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Boem wide-belly B211
                                            </p>
                                        </div>
                                        <div style={{borderLeft: "3px solid orangered", padding: 10, marginLeft: 10}}>
                                            <p style={{fontSize: 14, marginBottom: 5, color: "brown", fontWeight: "bolder"}}>
                                                Accra, Ghana (ACC) - New York, USA (LGA)
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                March 24, 12:30am - March 25, 11:15pm
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Amarican Airline, Etheopian Airline
                                            </p>
                                            <p style={{fontSize: 14, marginBottom: 5}}>
                                                Boem wide-belly B211
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingsContainer;