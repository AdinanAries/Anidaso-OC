import { onclickSearchBookedHotel } from "./endpoint-calls";

function BookedHotelsSearchForm(){
    return (
        <div id="bookings-pane-booked-hotels-search-form" style={{display: "none", marginTop: 10}}>
            <div className="two-inputs-flex-container">
                <div className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Hotel Name</p>
                    <input id="booked-hotel-search-name-input" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Hotel City</p>
                    <input id="booked-hotel-search-city-input" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 10}}>
                <div className="two-inputs-flex-child first">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Customer Email</p>
                    <input id="booked-hotel-search-email-input" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
                <div className="two-inputs-flex-child last">
                    <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                        Checkin - Checkout Dates</p>
                    <input id="booked-hotel-search-dates-input" style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div onClick={onclickSearchBookedHotel} className="standard-action-button">
                Search
            </div>
        </div>
    );
}

export default BookedHotelsSearchForm;