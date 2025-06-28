import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageEventForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        resetFormValidation,
    } = props;

    const eventNameOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, event_name_and_tagline: e.target.value  } : item
            )
        })
    }

    const eventVenueOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, venue_location: e.target.value  } : item
            )
        })
    }

    const eventStartDateOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, event_start_date: e.target.value  } : item
            )
        })
    }

    const eventStartTimeOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, event_start_time: e.target.value  } : item
            )
        })
    }

    const eventWebsiteOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, event_website_and_registration_link: e.target.value  } : item
            )
        })
    }

    const eventFormatOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.event ? { ...item, event_format: e.target.value  } : item
            )
        })
    }

    let eventsData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.event)[0];

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-heading" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Name and Tagline</p>
            <div style={{border: "none"}}>
                <input onInput={eventNameOnInput}
                    value={eventsData?.event_name_and_tagline}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Venue/Location</p>
            <div style={{border: "none"}}>
                <input onInput={eventVenueOnInput}
                    value={eventsData?.venue_location}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Start Date</p>
            <div style={{border: "none"}}>
                <input onInput={eventStartDateOnInput}
                    value={eventsData?.event_start_date}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-clock" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Start Time</p>
            <div style={{border: "none"}}>
                <input onInput={eventStartTimeOnInput}
                    value={eventsData?.event_start_time}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-link" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Website and Registration Link</p>
            <div style={{border: "none"}}>
                <input onInput={eventWebsiteOnInput}
                    value={eventsData?.event_website_and_registration_link}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Format</p>
            <div style={{border: "none"}}>
                <select onInput={eventFormatOnInput}
                    value={eventsData?.event_format}
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value="Conference"
                        style={{color: "black"}}>Conference</option>
                    <option value="Festival"
                        style={{color: "black"}}>Festival</option>
                    <option value="Concert"
                        style={{color: "black"}}>Concert</option>
                    <option value="Sporting"
                        style={{color: "black"}}>Sporting</option>
                    <option value="Other"
                        style={{color: "black"}}>Other</option>
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
                <span style={{color: "orange"}}> Dates and Times:</span> Include the specific dates and times for the event, sessions, activities, registration, and setup/teardown times.
                <span style={{color: "orange"}}> Marquee Speakers, Sponsors, and Exhibitors:</span> List prominent speakers, sponsors, or exhibitors involved in the event.
                <span style={{color: "orange"}}> Event Objectives/Goals:</span> If applicable, state the event's goals or intended outcomes. 
                <span style={{color: "orange"}}> Event Description:</span> Provide a brief overview of the event's purpose, format, and key activities. Highlight its unique selling proposition (USP).
                <span style={{color: "orange"}}> Transportation:</span> Details about transportation to and from the event location (e.g., flights, trains, ground transportation). Information about transportation options within the event city (e.g., shuttle services, public transport, parking).
                <span style={{color: "orange"}}> Attendee Event Itinerary:</span> A detailed schedule of sessions, activities, networking opportunities, and free periods.
                <span style={{color: "orange"}}> Session and Activity Details:</span> Descriptions of speakers, topics, and session formats.
                <span style={{color: "orange"}}> Exhibitor Floor Information:</span> Opening and closing times for the exhibitor floor.
                <span style={{color: "orange"}}> Special Activities or Add-ons:</span> Information on exclusive activities or customizable experiences.
                <span style={{color: "orange"}}> Meal Times and Locations:</span> Information on meal options available. 
                <span style={{color: "orange"}}> Tickets and Passes:</span> How to obtain and use event passes or tickets.
                <span style={{color: "orange"}}> Passports and Licenses:</span> Reminders about necessary travel documents.
                <span style={{color: "orange"}}> Itinerary and Map:</span> A downloadable event itinerary and map of the venue/city.
                <span style={{color: "orange"}}> Emergency Contact Information:</span> Contact information for on-site representatives or emergency services.
                <span style={{color: "orange"}}> Dress Code:</span> If applicable, inform attendees about the dress code.
                <span style={{color: "orange"}}> Local Attractions and Recommendations:</span> Suggest nearby attractions, restaurants, or activities for leisure time.
                <span style={{color: "orange"}}> Welcome Packet:</span> Consider sending a welcome packet in advance with helpful information.
                <span style={{color: "orange"}}> Wi-Fi Details:</span> Provide information on Wi-Fi access at the venue.
                <span style={{color: "orange"}}> Accessibility Information:</span> Include details on accessibility features at the venue. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill elem_id="new_package_hotel_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageEventForm;