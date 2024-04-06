//import { show_bookings_pane_search_results_page } from "./helper-functions";
import { onclickSearchBookedFlights } from "../helpers/endpoint-calls";
import { 
    onInputAirportsAutocomplete, 
    showInputAirportsAutocompleteContainer, 
    hideInputAirportsAutocompleteContainer 
} from "./airports_auto_complete";

function BookedFlightsSearchForm(){
    return (
        <div id="bookings-pane-booked-flights-search-form" style={{marginTop: 10}}>
            <div className="two-inputs-flex-container" style={{position: "relative"}}>
                <div id="inputAirportsAutocompleteContainer" style={{display: "none", padding: 10, position: "absolute", zIndex: 2, top: "100%", width: "100%", backgroundColor: "white", boxShadow: "1px 2px 3px rgba(0,0,0,0.3)", minHeight: 20, }}>
                    <ul id="flights_auto_complete_list">

                    </ul>
                    <p style={{marginTop: 10, fontSize: 13, textAlign: "right"}}>
                        <span style={{color: "red", fontSize: 13, fontWeight: "bolder", marginRight: 5}}>
                            BYTE THE CODE</span>
                        &copy; {new Date().getFullYear()}</p>
                </div>
                <div id="booked-flight-search-origin-input-container" 
                    className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 5, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Departure Airport</p>
                    <input 
                        onInput={onInputAirportsAutocomplete} 
                        onFocus={showInputAirportsAutocompleteContainer} 
                        onBlur={hideInputAirportsAutocompleteContainer} 
                        id="booked-flight-search-origin-input" autoComplete="off" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter city/airport here"
                    />
                </div>
                <div id="booked-flight-search-destination-input-container" className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 5, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Destination Airport</p>
                    <input 
                        onInput={onInputAirportsAutocomplete} 
                        onFocus={showInputAirportsAutocompleteContainer} 
                        onBlur={hideInputAirportsAutocompleteContainer} 
                        id="booked-flight-search-destination-input" 
                        autoComplete="off" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter city/airport here"
                    />
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 10}}>
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 5, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-envelope"></i>
                        Customer Email</p>
                    <input id="booked-flight-search-email-input" 
                        autoComplete="off" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter customer email here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 5, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-calendar"></i>
                        Depature Date</p>
                    <input id="booked-flight-search-dates-input" 
                        readOnly="true" 
                        className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="select departure date"
                    />
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(100% - 150px)"}} className="standard-action-button" onClick={onclickSearchBookedFlights}>
                    Search
                </div>
                <div className="standard-action-button"
                     style={{fontSize: 13, width: 140, backgroundColor: "crimson", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    New Flight
                </div>
            </div>
        </div>
    );
}

export default BookedFlightsSearchForm;