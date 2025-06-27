import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageCruiseForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
    } = props;

    const cruiseLineShipOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, cruise_line_and_ship: e.target.value  } : item
            )
        })
    }

    const departurePortOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, departure_ports: e.target.value  } : item
            )
        })
    }

    const arrivalPortOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, arrival_ports: e.target.value  } : item
            )
        })
    }

    const startDateOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, start_date: e.target.value  } : item
            )
        })
    }

    const startTimeOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, start_time: e.target.value  } : item
            )
        })
    }

    const durationOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, cruise_duration: e.target.value  } : item
            )
        })
    }

    const cabinTypeOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.cruise ? { ...item, cabin_type: e.target.value  } : item
            )
        })
    }

    let cruiseData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.cruise)[0];

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-ship" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cruise Line and Ship</p>
            <div style={{border: "none"}}>
                <input onInput={cruiseLineShipOnInput}
                    value={cruiseData?.cruise_line_and_ship}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Departure ports</p>
            <div style={{border: "none"}}>
                <input onInput={departurePortOnInput}
                    value={cruiseData?.departure_ports}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Arrival ports</p>
            <div style={{border: "none"}}>
                <input onInput={arrivalPortOnInput}
                    value={cruiseData?.arrival_ports}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Date</p>
            <div style={{border: "none"}}>
                <input onInput={startDateOnInput}
                    value={cruiseData?.start_date}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-clock" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Time</p>
            <div style={{border: "none"}}>
                <input onInput={startTimeOnInput}
                    value={cruiseData?.start_time}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-stopwatch" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cruise Duration</p>
            <div style={{border: "none"}}>
                <input onInput={durationOnInput}
                    value={cruiseData?.cruise_duration}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cabin Type</p>
            <div style={{border: "none"}}>
                <select onInput={cabinTypeOnInput}
                    value={cruiseData?.cabin_type}
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value="Inside/Interior"
                        style={{color: "black"}}>Inside/Interior</option>
                    <option value="Ocean View/Outside"
                        style={{color: "black"}}>Ocean View/Outside</option>
                    <option value="Balcony"
                        style={{color: "black"}}>Balcony</option>
                    <option value="Suite"
                        style={{color: "black"}}>Suite</option>
                </select>
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
                <span style={{color: "orange"}}> Cabin Type:</span> Describe the type of cabin (stateroom) included in the package, such as inside, ocean view, balcony, or suite.
                <span style={{color: "orange"}}> Cabin Location:</span> Mention the general location of the cabin on the ship (e.g., lower decks, midship, or upper decks). You may also want to explain the pros and cons of different locations (e.g., midship cabins are good for those prone to seasickness).
                <span style={{color: "orange"}}> Cabin Amenities:</span> Detail the amenities found in the cabin, such as bed type, bathroom setup, closet, and any additional features specific to the cabin type. 
                <span style={{color: "orange"}}> Meals:</span> Specify which meals are included in the cruise fare (e.g., meals in the main dining room, buffet, etc.).
                <span style={{color: "orange"}}> Drinks:</span> Indicate which beverages are included (e.g., water, tea, coffee, lemonade, iced tea). You may also want to mention drink packages as an optional add-on.
                <span style={{color: "orange"}}> Onboard Entertainment and Activities:</span> List the various entertainment options and activities included in the cruise fare, such as stage shows, live music, dance parties, pools, hot tubs, fitness centers, and various recreational activities.
                <span style={{color: "orange"}}> Kids Clubs (if applicable):</span> If the cruise caters to families, highlight the kids' clubs and any associated activities or services. 
                <span style={{color: "orange"}}> Specialty Dining:</span> Explain that specialty restaurants and other premium dining experiences typically incur an additional fee.
                <span style={{color: "orange"}}> Alcoholic and Specialty Beverages:</span> Clarify that alcoholic beverages and specialty drinks (e.g., soda, specialty coffees) are usually not included in the fare, unless a drink package is purchased.
                <span style={{color: "orange"}}> Shore Excursions:</span> Note that shore excursions are typically an additional cost. You may want to provide information about the booking process or recommended excursions.
                <span style={{color: "orange"}}> Gratuities:</span> Explain the cruise line's policy on gratuities, whether they are automatically added to the guest account or are discretionary.
                <span style={{color: "orange"}}> Spa and Salon Services:</span> Mention that spa and salon services come with an extra charge.
                <span style={{color: "orange"}}> Other Potential Costs:</span> Include any other activities or services that incur an additional fee, such as certain onboard attractions, laundry services, internet access, etc. 
                <span style={{color: "orange"}}> Required Documents:</span> List all necessary documents, such as passports, visas, boarding passes, and any health forms required by the cruise line.
                <span style={{color: "orange"}}> Packing Recommendations:</span> Provide suggestions for what to pack, including clothing, shoes, toiletries, medications, and any other relevant items.
                <span style={{color: "orange"}}> Onboard Policies:</span> Briefly mention any important ship policies, such as smoking restrictions, laundry services, or alcohol restrictions. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill elem_id="new_package_hotel_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageCruiseForm;