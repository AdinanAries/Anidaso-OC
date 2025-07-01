import BookedFlightsSearchForm from "../../../../components/booked-flghts-search-form";
import BookedHotelsSearchForm from "../../../../components/booked-hotels-search-form";
import BookedCarsSearchForm from "../../../../components/booked-cars-search-form";
import SearchResultsPage from "../search-results/SearchResultsPage";
import PageRestricted from "../../../../components/page-restricted";
import RequiredActions from "../../../../components/RequiredActions";

import { 
    show_booking_search_type_form, 
    show_bookings_pane_main_page, 
    show_bookings_pane_search_results_page, 
    show_bookings_pane_selected_results_page,
    toggle_show_main_sections,
} from "../../../../helpers/helper-functions";
import { getBookingById } from "../../../../helpers/endpoint-calls";
import { 
    select_booking_from_list,
    calculateActionPoints,
    add_commas_to_number
} from "../../../../helpers/helper-functions";
import SelectedTicketPage from "../selected-ticket/SelectedTicketPage";
import RecentBookings from "./components/RecentBookings";
import BookingHealthChecker from "../../../../components/BookingHealthChecker";
import HpAnalytics from "./components/HpAnalytics";
import { useState } from "react";
import RecentBookingAttempts from "./components/RecentBookingAttempts";
import AgentDetailsCard from "../../../../components/AgentDetailsCard";
import CONSTANTS from "../../../../constants/Constants";
import RatesAnalytics from "./components/RatesAnalytics";

let BookingsContainer = (props)=>{

    const {
        userDetails,
        servicePlanTiersList
    } = props;

    console.log("servicePlanTiers", servicePlanTiersList);
    
    const _pageConstant=CONSTANTS.app_page_constants.bookings;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    let isOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    let wallet_actions_per_unit = servicePlanTiersList.find(each=>each?.constant===1)?.actions_per_unit;
    if(isAgent){
        let agent_info = userDetails?.agent_info;
        let sp_obj = agent_info?.find(each=>each.property==="service_plan");
        if(sp_obj?.value){
            wallet_actions_per_unit=servicePlanTiersList.find(each=>each?.constant===parseInt(sp_obj?.value))?.actions_per_unit;
        }
    }

    const [ mostRecentBookingData, setMostRecentBookingData ] = useState({});

    return(
         <section id="bookings-container">
            {
                (!has_access_this_page) ? 
                <PageRestricted /> :
                <>
                    <div id="bookings-container-main-pane">
                        <div style={{marginBottom: 10}}>
                            <RequiredActions />
                        </div>
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
                                {
                                    (isAgent && userDetails?.wallet_info) ?
                                    <div onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showWalletPage();
                                    }} style={{padding: 10, borderRadius: 5, cursor: "pointer"}}>
                                        <div style={{color: "white", display: "flex", alignItems: "center"}}>
                                            <i style={{marginRight: 10, fontSize: 14, color: "lightgreen"}} className="fa fa-wallet"></i>
                                            <div>
                                                <p style={{fontSize: 14, color: "yellow", textDecoration: "underline"}}>
                                                    ${add_commas_to_number((userDetails?.wallet_info?.current_balance).toFixed(2))}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{textAlign: "right", marginTop: 5, color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                                            {add_commas_to_number(calculateActionPoints((userDetails?.wallet_info?.current_balance).toFixed(2), wallet_actions_per_unit))} actions
                                        </p>
                                    </div> :
                                    (!isOwner && !isAdmin) &&
                                        <div style={{color: "white", fontSize: 12, background: "rgba(255,0,0,0.2)", padding: 10, border: "1px solid rgba(255,255,255,0.1)"}}>
                                            <i style={{marginRight: 5, color: "yellow"}}
                                                className="fa-solid fa-exclamation-triangle"></i>
                                                Wallet Not Found
                                        </div>
                                }
                            </div>
                            <div className="booking-pane-search-inputs-area">
                                <div className="booking-pane-search-inputs-area-inputs-section">
                                    <BookedFlightsSearchForm
                                        userDetails={userDetails}
                                    />
                                    <BookedHotelsSearchForm 
                                        userDetails={userDetails}
                                    />
                                    <BookedCarsSearchForm 
                                        userDetails={userDetails}
                                    />

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
                                            servicePlanTiersList={servicePlanTiersList}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        {/**Rates */}
                        {
                            isAgent &&
                            <RatesAnalytics />
                        }
                        {/**Analytics */}
                        {
                            (isOwner || isAdmin) &&
                            <HpAnalytics />
                        }
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