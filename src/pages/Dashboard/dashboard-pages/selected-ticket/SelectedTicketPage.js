import { 
    back_from_selected_result_pane, 
    show_bookings_pane_main_page 
} from "../../../../helpers/helper-functions";

import BookingHealthChecker from "../../../../components/BookingHealthChecker";

const SelectedTicketPage = (props) =>  {
    return <div id="booking-container-selected-results-pane" style={{display: "none"}}>
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
                    
                    <BookingHealthChecker 
                        title="Health Status"
                    />

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
}

export default SelectedTicketPage