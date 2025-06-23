import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageRestaurantForm = (props) => {

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Restaurant Name</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Location</p>
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
                Event Website and Registration Link</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-car" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Event Format</p>
            <div style={{border: "none"}}>
                <select 
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value={1}
                        style={{color: "black"}}>Conference</option>
                    <option value={2}
                        style={{color: "black"}}>Festival</option>
                    <option value={3}
                        style={{color: "black"}}>Concert</option>
                    <option value={4}
                        style={{color: "black"}}>Sporting</option>
                </select>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Car(s) Only Price</p>
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
                The information you include in this sections may include;
                <span style={{color: "orange"}}> Accessibility Information:</span> Include details on accessibility features at the venue. 
                <span style={{color: "orange"}}> Motorcoach:</span> The core of the package, providing comfortable, air-conditioned travel between destinations and often including a professional driver. 
                <span style={{color: "orange"}}> Specific routes and stops:</span> Tours often have pre-planned routes and designated stops at key attractions. 
                <span style={{color: "orange"}}> Sightseeing guided tours:</span> Tours often include guided visits to popular attractions and landmarks, with commentary and insights from a tour guide. 
                <span style={{color: "orange"}}> Sightseeing entrance fees:</span> Many packages cover the cost of admission to included attractions, simplifying logistics. 
                <span style={{color: "orange"}}> Sightseeing flexibility:</span> Some tours offer hop-on, hop-off options, allowing travelers to explore at their own pace. 
                <span style={{color: "orange"}}> Varying meal inclusions:</span> Some packages include meals, such as breakfasts or dinners, while others may offer only certain meals or none at all.
                <span style={{color: "orange"}}> Meal packages:</span> Tour operators may offer meal packages at an additional cost or provide restaurant recommendations
                <span style={{color: "orange"}}> Baggage handling:</span> Some packages include assistance with luggage. 
                <span style={{color: "orange"}}> Tips and service charges:</span> These may be included in the overall price. 
                <span style={{color: "orange"}}> Shopping opportunities:</span> Some tours may include stops at outlet malls or shopping centers. 
                <span style={{color: "orange"}}> Entertainment:</span> Some packages may include tickets to shows or other entertainment. 
                <span style={{color: "orange"}}> Specialty tours:</span> There are packages that focus on specific interests, such as Broadway shows or specific historical sites. 
                <span style={{color: "orange"}}> Convenience:</span> Everything is pre-arranged, making travel planning easier. 
                <span style={{color: "orange"}}> Cost savings:</span> Bundling can result in lower overall costs compared to booking separately. 
                <span style={{color: "orange"}}> Expertise:</span> Tour operators often have local knowledge and can provide valuable insights and recommendations. 
                <span style={{color: "orange"}}> Social aspect:</span> Bus tours can be a social experience, particularly for those traveling solo or in small groups. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill elem_id="new_package_hotel_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageRestaurantForm;