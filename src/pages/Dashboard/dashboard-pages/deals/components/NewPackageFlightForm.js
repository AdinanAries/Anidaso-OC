import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageFlightForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
    } = props;

    const departureAirportOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.flight ? { ...item, departure_airport: e.target.value  } : item
            )
        })
    }

    const destinationAirportOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.flight ? { ...item, destination_airport: e.target.value  } : item
            )
        })
    }

    const airlinesOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.flight ? { ...item, airlines: e.target.value  } : item
            )
        })
    }

    const departureReturnDatesOnInput = (e) => {
        let _dates = e.target.value?.split(" - ");
        if(_dates.length < 1){
            _dates.push("");
        }
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.flight ? { 
                    ...item, 
                    departure_date: _dates[0],
                    return_date: _dates[1]
                } : item
            )
        })
    }

    let flightData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.flight)[0];

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Departure Airport</p>
            <div style={{border: "none"}}>
                <input onInput={departureAirportOnInput}
                    value={flightData?.departure_airport}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Destination Airport</p>
            <div style={{border: "none"}}>
                <input onInput={destinationAirportOnInput}
                    value={flightData?.destination_airport}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-plane-departure" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Airline(s)</p>
            <div style={{border: "none"}}>
                <input onInput={airlinesOnInput}
                    value={flightData?.airlines}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa-solid fa-calendar-alt" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Departure - Return Dates
                <span style={{fontSize: 12, color: "white", marginLeft: 30}}>
                    <input className="cm-toggle"
                        type="checkbox" />
                    <label>
                        <span style={{marginLeft: 10}}>
                            Return Flights
                        </span>
                    </label>
                </span>
            </p>
            <div style={{border: "none"}}>
                <input onInput={departureReturnDatesOnInput}
                    value={(flightData?.departure_date + (flightData?.return_date ? (" - " + flightData?.return_date) : ""))}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", 
                width: "100%", height: 200, background: "rgba(0,0,0,0.2)", borderRadius: 8,
                cursor: "pointer"}}>
                <div>
                    <p style={{textAlign: "center"}}>
                        <i style={{color: "orange", fontSize: 27}} className="fa fa-plus"></i>
                    </p>
                    <p style={{marginTop: 5, fontSize: 13, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                        Add Cover Picture
                    </p>
                </div>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-paragraph" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Details (Guide)
                <span className="tool-tip-parent" style={{marginLeft: 15, cursor: "pointer", color: "lightgreen"}}>
                    <i className="fa-solid fa-robot"></i>
                    <span className="tool-tip" style={{color: "black", textAlign: "center"}}>
                        Generate with AI
                    </span>
                </span>
            </p>
            <p style={{fontSize: 12, color: "white", padding: 10}}>
                The information you include in this section may include;
                <span style={{color: "orange"}}> Flight Numbers:</span> Provide the specific flight numbers for each leg of the journey. 
                <span style={{color: "orange"}}> Departure and Arrival Airports:</span> List the departure and arrival airports for each flight. Include airport codes for clarity. 
                <span style={{color: "orange"}}> Price Competitiveness:</span> Calculate costs and set a competitive price that reflects the value of your package.
                <span style={{color: "orange"}}> Baggage Allowance:</span> Specify the included baggage allowance (checked and carry-on) and any associated fees.
                <span style={{color: "orange"}}> Airline Policies:</span> Include relevant airline policies, such as cancellation fees, change fees, and no-show policies.
                <span style={{color: "orange"}}> Travel Insurance Details:</span> If travel insurance is included or recommended, provide details on coverage and how to file claims.
                <span style={{color: "orange"}}> Emergency Contact Information:</span> Include emergency contact information for the travel company and any relevant local contacts.
                <span style={{color: "orange"}}> Detailed Daily Schedule:</span> Provide a detailed daily schedule for the entire trip, including flight information, transportation arrangements (transfers, car rentals, etc.), accommodation details, and planned activities/excursions.
                <span style={{color: "orange"}}> Layover/Connecting Flight Details:</span> If the itinerary includes layovers or connecting flights, include the airport, duration of the layover, and any relevant details.
                <span style={{color: "orange"}}> Check-in & Check-out Times:</span> Clearly list check-in and check-out times for accommodations and any deadlines for activities. 
                <span style={{color: "orange"}}> Full Name(s):</span> Include the full names of all travelers as they appear on their passports.
                <span style={{color: "orange"}}> Passport Information (for international travel):</span> Passport number, issue and expiry dates, and nationality.
                <span style={{color: "orange"}}> Special Requirements:</span> Note any special meal preferences, seating preferences, or accessibility needs
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill elem_id="new_package_flight_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageFlightForm;