import BookedFlightsSearchForm from "../../../../components/booked-flghts-search-form";
import BookedHotelsSearchForm from "../../../../components/booked-hotels-search-form";
import BookedCarsSearchForm from "../../../../components/booked-cars-search-form";
import SearchResultsPage from "../search-results/SearchResultsPage";
import PageRestricted from "../../../../components/page-restricted";

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
    
    const _pageConstant=CONSTANTS.app_page_constants.bookings;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    let isOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    const [ mostRecentBookingData, setMostRecentBookingData ] = useState({});

    return(
         <section id="bookings-container">
            {
                (!has_access_this_page) ? 
                <PageRestricted /> :
                <>
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
                                        <i style={{marginRight: 10, fontSize: 14, color: "lightgreen"}} className="fa fa-wallet"></i>
                                        <div>
                                            <p style={{fontSize: 14, color: "yellow"}}>
                                                ${(userDetails?.wallet_info?.current_balance).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <p style={{textAlign: "right", marginTop: 5, color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                                        5,042 actions
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
                </>
            }
        </section>
    )
}

export default BookingsContainer;