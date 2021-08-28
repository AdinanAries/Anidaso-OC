let BookingsContainer = ()=>{
    return(
         <section id="bookings-container">
             <div className="main-seaction-containers">
                <div className="booking-pane-search-type-options">
                    <div className="booking-pane-search-type-each-option" style={{padding: "10px 20px", color: "blue", borderBottom: "3px solid orangered", fontSize: 14, cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "brown"}} className="fa fa-bed"></i>
                        Hotels
                    </div>
                    <div className="booking-pane-search-type-each-option" style={{padding: "10px 20px", color: "darkgrey", borderBottom: "3px solid darkgrey", fontSize: 14, cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "darkgrey"}} className="fa fa-plane"></i>
                        Flights
                    </div>
                    <div className="booking-pane-search-type-each-option" style={{padding: "10px 20px", color: "darkgrey", borderBottom: "3px solid darkgrey", fontSize: 14, cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "darkgrey"}} className="fa fa-car"></i>
                        Cars
                    </div>
                </div>
                <div className="booking-pane-search-inputs-area">
                    <div className="booking-pane-search-inputs-area-inputs-section">
                        <p style={{color: "", fontWeight: "bolder", fontSize: 14}}>
                            Search Booking
                        </p>
                        <div style={{marginTop: 10}}>
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
                                        Depature Return Dates</p>
                                    <input style={{padding: 10, borderRadius: 6, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                                </div>
                            </div>
                            {/*<div style={{marginTop: 10}}>
                                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                                    Origin Airport</p>
                                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
                            </div>*/}
                            <div style={{padding: 10, marginTop: 10, textAlign: "center", backgroundColor: "rgb(122,23,255)", color: "white", borderRadius: 6}}>
                                Search
                            </div>
                        </div>
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