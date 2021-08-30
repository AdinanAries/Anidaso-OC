import { show_bookings_pane_search_results_page } from "./helper-functions";

function FlightSearchFunction(){
    show_bookings_pane_search_results_page();
}

function BookedFlightsSearchForm(){
    return (
        <div id="bookings-pane-booked-flights-search-form" style={{marginTop: 10}}>
            <div className="two-inputs-flex-container">
                <div className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Origin Airport</p>
                    <input style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Destination Airport</p>
                    <input style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 10}}>
                <div className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Customer Email</p>
                    <input style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Depature - Return Dates</p>
                    <input style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div className="standard-action-button" onClick={FlightSearchFunction}>
                Search
            </div>
        </div>
    );
}

export default BookedFlightsSearchForm;