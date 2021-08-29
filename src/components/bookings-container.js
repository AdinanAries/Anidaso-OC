import BookedFlightsSearchForm from "./booked-flghts-search-form";
import BookedHotelsSearchForm from "./booked-hotels-search-form";
import BookedCarsSearchForm from "./booked-cars-search-form";

import { show_booking_search_type_form } from "./helper-functions";

let BookingsContainer = ()=>{
    return(
         <section id="bookings-container">
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

                    </div>
                </div>
             </div>
             <div className="main-seaction-containers">
                <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                    View search results here</p>
             </div>
        </section>
    )
}

export default BookingsContainer;