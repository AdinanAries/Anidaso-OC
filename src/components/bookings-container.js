import BookedFlightsSearchForm from "./booked-flghts-search-form";
import BookedHotelsSearchForm from "./booked-hotels-search-form";
import BookedCarsSearchForm from "./booked-cars-search-form";

import { show_booking_search_type_form, show_bookings_pane_main_page } from "./helper-functions";

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
                    <table className="bookings-pane-booking-list">
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
                                Origin - Destination
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
                                CGD - MAD
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
                                LGA - ACC
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
                                ACC - NGA
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
                                MAD - CGD
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
        </section>
    )
}

export default BookingsContainer;