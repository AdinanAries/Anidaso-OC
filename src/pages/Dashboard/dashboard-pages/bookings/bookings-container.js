import BookedFlightsSearchForm from "../../../../components/booked-flghts-search-form";
import BookedHotelsSearchForm from "../../../../components/booked-hotels-search-form";
import BookedCarsSearchForm from "../../../../components/booked-cars-search-form";
import SearchResultsPage from "../search-results/SearchResultsPage";

import { 
    show_booking_search_type_form, 
    show_bookings_pane_main_page, 
    show_bookings_pane_search_results_page, 
    show_bookings_pane_selected_results_page 
} from "../../../../helpers/helper-functions";
import { getBookingById } from "../../../../helpers/endpoint-calls";
import { select_booking_from_list } from "../../../../helpers/helper-functions";
import SelectedTicketPage from "../selected-ticket/SelectedTicketPage";
import RecentBookings from "./components/RecentBookings";
import BookingHealthChecker from "../../../../components/BookingHealthChecker";
import HpAnalytics from "./components/HpAnalytics";
import { useState } from "react";
import RecentBookingAttempts from "./components/RecentBookingAttempts";
import AgentDetailsCard from "../../../../components/AgentDetailsCard";
import CONSTANTS from "../../../../constants/Constants";

let BookingsContainer = (props)=>{

    const {
        userDetails,
    } = props;

    let isOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    const [ mostRecentBookingData, setMostRecentBookingData ] = useState({});

    return(
         <section id="bookings-container">
             <div id="bookings-container-main-pane">
                <div className="main-seaction-containers">
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div className="booking-pane-search-type-options">
                            <div onClick={()=>show_booking_search_type_form("flights")} 
                                id="booking-pane-search-type-flights-option" 
                                className="booking-pane-search-type-each-option active">
                                <i className="fa fa-plane"></i>
                                Flights
                            </div>
                            <div onClick={()=>show_booking_search_type_form("hotels")} 
                                id="booking-pane-search-type-hotels-option" 
                                    className="booking-pane-search-type-each-option">
                                <i className="fa fa-bed"></i>
                                Hotels
                            </div>
                            <div onClick={()=>show_booking_search_type_form("cars")} id="booking-pane-search-type-cars-option" className="booking-pane-search-type-each-option">
                                <i className="fa fa-car"></i>
                                Cars
                            </div>
                        </div>
                        <div style={{padding: 10, borderRadius: 5}}>
                            <div style={{color: "white", display: "flex", alignItems: "center"}}>
                                <i style={{marginRight: 10, fontSize: 16, color: "lightgreen"}} className="fa fa-info-circle"></i>
                                <div>
                                    <p>
                                        <span style={{fontSize: 12}}>
                                            March:
                                            <span style={{marginLeft: 5, color: "yellow"}}>
                                                $2,000.00</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <p style={{textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                               44 sales
                            </p>
                        </div>
                    </div>
                    <div className="booking-pane-search-inputs-area">
                        <div className="booking-pane-search-inputs-area-inputs-section">
                            <BookedFlightsSearchForm />
                            <BookedHotelsSearchForm />
                            <BookedCarsSearchForm />

                        </div>
                        <div className="booking-pane-search-inputs-area-other-section">
                            {/**Flights: Booking Health Checker */}
                            {
                                (isOwner || isAdmin) && <BookingHealthChecker
                                    title="Health - Recent Booking"
                                    showButton={true}
                                    data={mostRecentBookingData}
                                />
                            }
                            {/**Agent Details Card */}
                            {
                                isAgent && <AgentDetailsCard
                                    userDetails={userDetails}
                                />
                            }
                        </div>
                    </div>
                </div>
                {/**Analytics */}
                <HpAnalytics />
                {/**Recent Bookings */}
                <RecentBookings />
                {/**Recent Booking Attemps */}
                <RecentBookingAttempts />
            </div>
            {/**Search Results Page */}
            <SearchResultsPage />
            {/**Selected Ticket */}
            <SelectedTicketPage />
        </section>
    )
}

export default BookingsContainer;