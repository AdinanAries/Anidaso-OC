//import { show_bookings_pane_search_results_page } from "./helper-functions";
import { useState } from "react";
import { onclickSearchBookedFlights } from "../helpers/endpoint-calls";
import { 
    onInputAirportsAutocomplete, 
    showInputAirportsAutocompleteContainer, 
    hideInputAirportsAutocompleteContainer 
} from "./airports_auto_complete";
import { reset_pagination_params } from "../helpers/helper-functions";

function BookedFlightsSearchForm(){

    const [dateUnk, setDateUnk] = useState(false);

    const dateUnkOnInput = (e) => {
        setDateUnk(e.target.checked)
    }

    return (
        <div id="bookings-pane-booked-flights-search-form" style={{marginTop: 10}}>
            <div className="two-inputs-flex-container" style={{position: "relative"}}>
                <div id="inputAirportsAutocompleteContainer" style={{display: "none", padding: 10, borderRadius: 20, position: "absolute", zIndex: 2, top: "calc(100% + 10px)", width: "100%", backgroundColor: "white", boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.66)", minHeight: 20, }}>
                <p style={{backgroundColor: "darkblue", borderLeft: "10px solid orange", 
                            color: "white", padding: 5, paddingLeft: 10,fontSize: 12, borderRadius: 8, marginBottom: 10}}>
                            <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-info-circle"></i>
                            Enter keywords, then select the airport below:</p>
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
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Departure Airport</p>
                    <input 
                        onInput={onInputAirportsAutocomplete} 
                        onFocus={showInputAirportsAutocompleteContainer} 
                        onBlur={hideInputAirportsAutocompleteContainer} 
                        id="booked-flight-search-origin-input" autoComplete="off" 
                        className="standard-search-input focus-shadow-xtreme-dark-bg"
                        style={{width: "calc(100%)"}}
                        placeholder="enter city/airport here"
                    />
                </div>
                <div id="booked-flight-search-destination-input-container" className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Destination Airport</p>
                    <input 
                        onInput={onInputAirportsAutocomplete} 
                        onFocus={showInputAirportsAutocompleteContainer} 
                        onBlur={hideInputAirportsAutocompleteContainer} 
                        id="booked-flight-search-destination-input" 
                        autoComplete="off" 
                        className="standard-search-input focus-shadow-xtreme-dark-bg"
                        style={{width: "calc(100%)"}}
                        placeholder="enter city/airport here"
                    />
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 20}}>
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}} >
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-envelope"></i>
                        Customer Email</p>
                    <input id="booked-flight-search-email-input" 
                        autoComplete="off" 
                        className="standard-search-input focus-shadow-xtreme-dark-bg"
                        style={{width: "calc(100%)"}}
                        placeholder="enter customer email here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <div style={{display: "flex"}}>
                        <p className="subtitle-font-color-default" 
                            style={{marginBottom: 15, fontSize: 13}} >
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                                className="fa fa-calendar"></i>
                            Depature Date</p>
                            <div style={{display: "flex", marginLeft: 20, paddingLeft: 20, borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                                
                                <p style={{color: "red", fontSize: 13, marginLeft: 5, marginBottom: 5}}>
                                    <input checked={dateUnk}
                                        onChange={dateUnkOnInput} 
                                        id="flight_search_unk_date_checkbox" type="checkbox" />
                                </p>
                                <p style={{color: "red", fontSize: 13, marginLeft: 5, marginBottom: 5}}>
                                    <label htmlFor="flight_search_unk_date_checkbox">Date Unknown</label>
                                </p>
                            </div>
                    </div> 
                    <div className="standard-search-input"
                        style={{display: dateUnk ? "block" : "none"}}
                    >
                        <p style={{fontSize: 13, textAlign: "center"}}>
                            <i style={{color: "yellow", marginRight: 10}} 
                                className="fa fa-exclamation-triangle"></i>
                            Search without departure date</p>
                    </div>
                    <input id="booked-flight-search-dates-input" 
                        readOnly="true" 
                        className="standard-search-input focus-shadow-xtreme-dark-bg"
                        style={{width: "calc(100%)", display: dateUnk ? "none" : "block"}}
                        placeholder="select departure date"
                    />
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{width: "calc(100% - 150px)"}} className="standard-action-button" 
                    onClick={()=>{
                        reset_pagination_params();
                        onclickSearchBookedFlights()
                    }}>
                    Search
                </div>
                <div style={{fontSize: 13, marginLeft: 20, marginTop: 20, color: "pink", cursor: "pointer"}}>
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    Book Flight
                </div>
            </div>
        </div>
    );
}

export default BookedFlightsSearchForm;