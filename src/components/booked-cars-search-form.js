function BookedCarsSearchForm(){
    return (
        <div id="bookings-pane-booked-cars-search-form" style={{display: "none", marginTop: 10}}>
            <div className="two-inputs-flex-container">
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default"
                        style={{marginBottom: 15, fontSize: 13}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Pickup Place</p>
                    <input className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter pickup place here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default"
                        style={{marginBottom: 15, fontSize: 13}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-map-marker"></i>
                        Drop-off Place</p>
                    <input className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter drop-off place here"
                    />
                </div>
            </div>
            <div className="two-inputs-flex-container" style={{marginTop: 20}}>
                <div className="two-inputs-flex-child first">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-envelope"></i>
                        Customer Email</p>
                    <input className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="enter customer email here"
                    />
                </div>
                <div className="two-inputs-flex-child last">
                    <p className="subtitle-font-color-default" 
                        style={{marginBottom: 15, fontSize: 13}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.6)"}} 
                            className="fa fa-calendar"></i>
                        Pickup - Drop-off Dates</p>
                    <input className="standard-search-input"
                        style={{width: "calc(100%)"}}
                        placeholder="select dates here"
                    />
                </div>
            </div>
            {/*<div style={{marginTop: 10}}>
                <p style={{marginBottom: 5, fontSize: 14, color: "rgba(0,0,0,0.5)", fontWeight: "bolder"}}>
                    Origin Airport</p>
                <input style={{padding: 10, borderRadius: 4, border: "1px solid rgba(0,0,0,0.4)", width: "calc(100%)"}}/>
            </div>*/}
            <div className="standard-action-button">
                Search
            </div>
        </div>
    );
}

export default BookedCarsSearchForm;