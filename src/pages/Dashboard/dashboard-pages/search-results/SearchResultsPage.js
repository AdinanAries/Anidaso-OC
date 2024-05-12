import { 
    show_bookings_pane_main_page, 
    select_booking_from_list 
} from "../../../../helpers/helper-functions"

const SearchResultsPage = (props) =>  {
    return <div id="booking-container-search-results-pane" style={{display: "none"}}>
                <div className="main-seaction-containers">
                    <div style={{display: "flex", margin: 10, marginBottom: 13}}>
                        <p style={{fontSize: 13, color: "rgba(255,255,255,0.6)"}}>
                            Bookings
                        </p>
                        <p style={{color: "rgba(255,255,255,0.5)", margin: "0 10px", fontSize: 13}} >
                            <i className="fa fa-angle-right"></i>
                        </p>
                        <p style={{fontSize: 13, color: "rgba(255,255,255,0.6)"}}>
                            Search Results
                        </p>
                    </div>
                    <div onClick={show_bookings_pane_main_page} className="standard-button"
                        style={{background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)"}} >
                        <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-arrow-left"></i>
                        Back
                    </div>
                    <div id="bookings-pane-fights-search-results-list-container">
                        <div style={{padding: 10, display: "flex"}}>
                            <p className="regular-font-color-dark-bg" style={{fontSize: 14, fontWeight: "bolder", marginRight: 20}}>
                                Filters: 
                            </p>
                            <div style={{marginRight: 10}}>
                                <p className="regular-font-color-dark-bg" style={{fontSize: 13, marginBottom: 5}}>
                                    Type</p>
                                <select style={{padding: 10, borderRadius: 5, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#eee"}}>
                                    <option>
                                        All
                                    </option>
                                    <option>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p className="regular-font-color-dark-bg" 
                                style={{fontSize: 13, marginBottom: 5}}>
                                    Booking Dates</p>
                                <input value="March 23 - Jun 15" style={{padding: 10, borderRadius: 5, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#eee"}}/>
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
                        <div id="search_results_bookings_pagination_list_markup" 
                            className="pagination-numbers-list">
                            <div className="previous-next-btn">
                                <i className="fa fa-caret-left"></i>
                            </div>
                            <div className="numbers">
                                {/*<div className="each-number">
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
                                </div>*/}
                            </div>
                            <div className="previous-next-btn">
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
}

export default SearchResultsPage;