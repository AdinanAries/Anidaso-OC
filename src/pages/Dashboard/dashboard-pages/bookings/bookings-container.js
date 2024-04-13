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

let BookingsContainer = ()=>{
    return(
         <section id="bookings-container">
             <div id="bookings-container-main-pane">
                <div className="main-seaction-containers">
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
                    <div className="booking-pane-search-inputs-area">
                        <div className="booking-pane-search-inputs-area-inputs-section">
                            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 11, margin: 10}}>
                                Search Booking
                            </p>
                            <BookedFlightsSearchForm />
                            <BookedHotelsSearchForm />
                            <BookedCarsSearchForm />

                        </div>
                        <div className="booking-pane-search-inputs-area-other-section">
                            {/**Flights: Booking Health Checker */}
                            <BookingHealthChecker
                                title="Health - Recent Booking"
                                showButton={true}
                            />
                        </div>
                    </div>
                </div>
                {/**Analytics */}
                <HpAnalytics />
                {/**Recent Bookings */}
                <RecentBookings />
            </div>
            {/**Search Results Page */}
            <SearchResultsPage />
            {/**Selected Ticket */}
            <SelectedTicketPage />
        </section>
    )
}

export default BookingsContainer;