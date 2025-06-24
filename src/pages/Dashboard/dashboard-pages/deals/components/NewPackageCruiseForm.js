import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageCruiseForm = (props) => {

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-ship" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cruise Line and Ship</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Departure ports</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Arrival ports</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Date</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-clock" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Time</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-link" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cruise Duration</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-car" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cabin Type</p>
            <div style={{border: "none"}}>
                <select 
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value={1}
                        style={{color: "black"}}>Inside/Interior</option>
                    <option value={2}
                        style={{color: "black"}}>Ocean View/Outside</option>
                    <option value={3}
                        style={{color: "black"}}>Balcony</option>
                    <option value={4}
                        style={{color: "black"}}>Suite</option>
                </select>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Cruise(s) Only Price</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
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