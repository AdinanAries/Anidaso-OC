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
                        <p style={{fontSize: 14, color: "red", fontWeight: "bolder", letterSpacing: 1}}>
                            <i style={{marginRight: 5}} className="fa fa-exclamation"></i>
                            Alert</p>
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
                        <input value="March 23 - Jun 15" style={{padding: 5, borderRadius: 4, border: "none", backgroundColor: "lightblue"}}/>
                    </div>
                 </div>
                <table id="bookings-pane-booking-list">
                    <tr>
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
                            Name
                            </td>
                        <td className="header">
                            Booking Date
                        </td>
                        <td className="header"></td>
                    </tr>
                    <tr>
                        <td className="bookings-pane-booking-list-column first booking-type-col">
                            flight
                        </td>
                        <td className="bookings-pane-booking-list-column second">
                            0233922278
                        </td>
                        <td className="bookings-pane-booking-list-column first mobile-hidden">
                            adinanaries@outlook.com
                        </td>
                        <td className="bookings-pane-booking-list-column second mobile-hidden">
                            Mohammed Adinan
                        </td>
                        <td className="bookings-pane-booking-list-column first">
                            March 23 2021
                        </td>
                        <td className="bookings-pane-booking-list-column second edit-icon">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr>
                        <td className="bookings-pane-booking-list-column first booking-type-col">
                            flight
                        </td>
                        <td className="bookings-pane-booking-list-column second">
                            0233922278
                        </td>
                        <td className="bookings-pane-booking-list-column first mobile-hidden">
                            adinanaries@outlook.com
                        </td>
                        <td className="bookings-pane-booking-list-column second mobile-hidden">
                            Mohammed Adinan
                        </td>
                        <td className="bookings-pane-booking-list-column first">
                            March 23 2021
                        </td>
                        <td className="bookings-pane-booking-list-column second edit-icon">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr>
                        <td className="bookings-pane-booking-list-column first booking-type-col">
                            hotel
                        </td>
                        <td className="bookings-pane-booking-list-column second">
                           4353543534
                        </td>
                        <td className="bookings-pane-booking-list-column first mobile-hidden">
                            kinki@gmail.com
                        </td>
                        <td className="bookings-pane-booking-list-column second mobile-hidden">
                            Kwaku Manu
                        </td>
                        <td className="bookings-pane-booking-list-column first">
                            April 14 2021
                        </td>
                        <td className="bookings-pane-booking-list-column second edit-icon">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr>
                        <td className="bookings-pane-booking-list-column first booking-type-col">
                            flight
                        </td>
                        <td className="bookings-pane-booking-list-column second">
                            0233922278
                        </td>
                        <td className="bookings-pane-booking-list-column first mobile-hidden">
                            adinanaries@outlook.com
                        </td>
                        <td className="bookings-pane-booking-list-column second mobile-hidden">
                            Mohammed Adinan
                        </td>
                        <td className="bookings-pane-booking-list-column first">
                            March 23 2021
                        </td>
                        <td className="bookings-pane-booking-list-column second edit-icon">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </td>
                    </tr>
                </table>
             </div>
        </section>
    )
}

export default BookingsContainer;