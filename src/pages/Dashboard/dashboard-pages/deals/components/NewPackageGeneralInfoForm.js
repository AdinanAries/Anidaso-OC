import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageGeneralInfoForm = (props) => {

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-globe" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Travel Destination</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-heading" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Heading/Title</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-globe" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Package Window <span style={{color: "rgba(255,255,255,0.7)"}}>
                    (Date Start - Date End)</span></p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-user-group" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Age Group(s)</p>
            <div style={{display: "flex", marginTop: 20}}>
                <p style={{fontSize: 12, color: "white", marginRight: 30}}>
                    <input className="cm-toggle"
                        type="checkbox" />
                    <label>
                        <span style={{marginLeft: 5}}>
                            Adults (18+ years)
                        </span>
                    </label>
                </p>
                <p style={{fontSize: 12, color: "white", marginRight: 30}}>
                    <input className="cm-toggle"
                        type="checkbox" />
                    <label>
                        <span style={{marginLeft: 5}}>
                            Children (2-17 years)
                        </span>
                    </label>
                </p>
                <p style={{fontSize: 12, color: "white", marginRight: 30}}>
                    <input className="cm-toggle"
                        type="checkbox" />
                    <label>
                        <span style={{marginLeft: 5}}>
                            Infants (below 2 years)
                        </span>
                    </label>
                </p>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Max No. of Adults</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Max No. of Children</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Max No. of Infants</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Total Price</p>
            <div style={{border: "none"}}>
                <input 
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
                Description (Guide)
                <span className="tool-tip-parent" style={{marginLeft: 15, cursor: "pointer", color: "lightgreen"}}>
                    <i className="fa-solid fa-robot"></i>
                    <span className="tool-tip" style={{color: "black", textAlign: "center"}}>
                        Generate with AI
                    </span>
                </span>
            </p>
            <p style={{fontSize: 12, color: "white", padding: 10}}>
                The information you include in this sections may include;
                <span style={{color: "orange"}}> Crafted Activities:</span> Develop a detailed itinerary with a mix of activities, attractions, and free time. 
                <span style={{color: "orange"}}> Considered Logistics:</span> Plan transportation, accommodation, and other logistical elements to ensure a smooth and enjoyable experience. 
                <span style={{color: "orange"}}> Travel Dates and Times:</span> Specify the exact dates and times of departure and arrival for each flight, noting the local time at each location.
                <span style={{color: "orange"}}> Confirmation Number:</span> Provide the flight confirmation or booking reference number.
                <span style={{color: "orange"}}> Ticket Number:</span> Include the ticket number, not just the reservation number, as this is crucial for replacement if lost.
                <span style={{color: "orange"}}> Reservation Number:</span> While the ticket number is essential, the reservation number can also be included for convenience
            </p>
            <div style={{backgroundColor: "white"}}>
                {/* -- Required Component
                    <textarea  
                        style={{fontSize: 14, width: "calc(100% - 20px)", minHeight: 130, padding: 10, background: "none", color: "white", border: "none"}}
                    >
                    type here...
                    </textarea>*/}
                <RichTextEditorQuill elem_id="new_package_general_info_form_description_field" />
            </div>
        </div>
    </div>
}

export default NewPackageGeneralInfoForm;