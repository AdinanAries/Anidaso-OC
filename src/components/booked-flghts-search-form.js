//import { show_bookings_pane_search_results_page } from "./helper-functions";
import { onclickSearchBookedFlights } from "./endpoint-calls";
import { onInputAirportsAutocomplete, showInputAirportsAutocompleteContainer, hideInputAirportsAutocompleteContainer } from "./airports_auto_complete";

function BookedFlightsSearchForm(){
    return (
        <div id="bookings-pane-booked-flights-search-form" style={{marginTop: 10}}>
            <div className="two-inputs-flex-container" style={{position: "relative"}}>
                <div id="inputAirportsAutocompleteContainer" style={{display: "none", padding: 10, position: "absolute", zIndex: 2, top: "100%", width: "100%", backgroundColor: "white", boxShadow: "1px 2px 3px rgba(0,0,0,0.3)", minHeight: 20, }}>
                    <ul id="flights_auto_complete_list">

                    </ul>
                    <p style={{marginTop: 10, fontSize: 13, textAlign: "right"}}>
                        <span style={{color: "orangered", fontSize: 13, fontWeight: "bolder", marginRight: 5}}>
                            Anidaso</span>
                        &copy; 2021</p>
                </div>
                <div id="booked-flight-search-origin-input-container" className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Origin Airport</p>
                    <input onInput={onInputAirportsAutocomplete} onFocus={showInputAirportsAutocompleteContainer} onBlur={hideInputAirportsAutocompleteContainer} id="booked-flight-search-origin-input" autoComplete="off" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div id="booked-flight-search-destination-input-container" className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Destination Airport</p>
                    <input onInput={onInputAirportsAutocomplete} onFocus={showInputAirportsAutocompleteContainer} onBlur={hideInputAirportsAutocompleteContainer} id="booked-flight-search-destination-input" autoComplete="off" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 10}}>
                <div className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Customer Email</p>
                    <input id="booked-flight-search-email-input" autoComplete="off" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Depature Date</p>
                    <input id="booked-flight-search-dates-input" readOnly="true" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div className="standard-action-button" onClick={onclickSearchBookedFlights}>
                Search
            </div>
        </div>
    );
}

export default BookedFlightsSearchForm;