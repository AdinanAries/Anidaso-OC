import { add_commas_to_number } from "../../../../../helpers/helper-functions";
import CONSTANTS from "../../../../../constants/Constants";

const DealsPackagesPreviewPage = (props) => {

    const {
        userDetails,
        createNewPackageData,
        INCLUDE_ITEMS
    } = props;

    const {
        _id,
        title,
        travel_destination,
        total_price,
        cover_picture,
        html_description,
        items,
        max_num_of_adults,
        max_num_of_children,
        max_num_of_infants,
        type,
        view_template,
        view_theme,
        price_currency,
        start_date,
        end_date,
        include_adults,
        include_children,
        include_infants,
        text_editor_content,
    } = createNewPackageData;

    const WELLDUGO_MAIN_WEBSITE_URL = "https://welldugo-56d8210b9fe9.herokuapp.com";
    const AGENT_APP_URL = "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com";

    const user_role_const = userDetails?.role_info?.constant;
    let isLoggedUserOwner = (user_role_const===CONSTANTS.app_role_constants.owner);
    let isLoggedUserAdmin = (user_role_const===CONSTANTS.app_role_constants.admin);
    let isLoggedUserAgent = (user_role_const===CONSTANTS.app_role_constants.agent);

    const search_link_client_app_url = (isLoggedUserAgent ? 
        AGENT_APP_URL : 
        (WELLDUGO_MAIN_WEBSITE_URL+"/search")
    );

    let total_people = ``;
    
        if(include_adults){
            total_people += `${parseInt(max_num_of_adults || 0)} Adult(s)`
        }
        if(include_children){
            total_people += `, ${parseInt(max_num_of_children || 0)} Child(ren)`;
        }
        if(include_infants){
            total_people += `, ${parseInt(max_num_of_infants || 0)} Infant(s)`;
        }

    const INCLUDED_ITEMS_NAME_ARRAY = createNewPackageData.items?.map(each=>each.name);

    return <div style={{background: "white"}}>
            <div style={{borderBottom: "1px solid rgba(0,0,0,0.1)", background: "rgb(0, 37, 63)"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 20}}>
                <h3 style={{maxWidth: 160, color: "yellow"}}>
                    How Customers Will View This Package!</h3>
                <div>
                    <select style={{padding: 20, border: "none", color: "white", background: "rgba(0,0,0,0.2)", borderRadius: 8}}>
                        <option value="highlighter"
                            style={{color: "black"}}>Page: Highlighter</option>
                    </select>
                    <select value="sunshine"
                        style={{marginLeft: 5, padding: 20, border: "none", color: "white", background: "rgba(0,0,0,0.2)", borderRadius: 8}}>
                        <option style={{color: "black"}}>Color: Sunshine</option>
                    </select>
                </div>
                </div>
                {
                    _id && 
                    <>
                        <div style={{display: "flex", borderRadius: 50, margin: 5, marginTop: 0, justifyContent: "space-between", padding: "0 10px", width: "cal(100% - 10px)", backgroundColor: "rgba(0,0,0,0.2)"}}>
                            <p id="packageLinkTextToCopy" style={{whiteSpace: "nowrap", overflow: "hidden", padding: 10, width: "calc(100% - 70px)", fontSize: 13, color: "white"}}>
                                {search_link_client_app_url}/?product=3&ag={userDetails?._id}&pckg={_id}
                            </p>
                            <div className='tool-tip-parent' onClick={()=>{
                                    let elem = document.getElementById("packageLinkTextToCopy");
                                    // Copy the text inside the text field
                                    navigator.clipboard.writeText(elem.innerText);
                                    // Alert the copied text
                                    console.log("Copied the text: " + elem.innerText);
                                    alert("Copied!");
                                }} 
                                style={{cursor: "pointer", display: "flex", alignItems: "center", marginRight: 10, color: "pink", justifyContent: "center"}}>
                                <i className="fa-solid fa-copy"></i>
                                <span style={{left: -50, fontSize: 12, color: "black", minWidth: 90, textAlign: "center"}} className='tool-tip'>
                                    Copy Link
                                </span>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundImage: `url(${cover_picture})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 400}}>
                    <div>
                        <h1 style={{textAlign: "center", color: "white", textShadow: "1px 2px 3px rgba(0,0,0,0.9)"}}>
                            {title|| "Heading Title Here"}</h1>
                        <p style={{textAlign: "center", backgroundColor: "yellow", color: "black"}}>
                            <i className="fa-solid fa-map-marker-alt" style={{marginRight: 10}}></i>
                            {travel_destination || "Travel Destination"}</p>
                    </div>
                </div>
                <div style={{padding: 10}}>
                    <div style={{backgroundColor: "yellow", marginTop: -50, padding: 20, paddingBottom: 40}}>
                        <div style={{padding: 20, width: "fit-content", marginTop: -70, backgroundColor: "orange"}}>
                            {
                                total_price ?
                                <h1>$ {add_commas_to_number(parseFloat(total_price)?.toFixed(2)) || "0.00"}</h1> :
                                <h1>$ 0.00</h1>
                            }
                            <div style={{marginTop: 5}}>
                                <p style={{fontSize: 13}}>
                                    <i style={{marginRight: 10}} className="fa-solid fa-user"></i>
                                    {total_people}
                                </p>
                                {
                                    end_date &&
                                    <p style={{fontSize: 13}}>
                                    <i style={{marginRight: 10}} className="fa-solid fa-calendar-alt"></i>
                                    Available until {end_date}</p>
                                }
                            </div>
                        </div>
                        <div style={{padding: 10}}>
                            {
                                html_description ? 
                                <div style={{fontSize: 13, marginBottom: 20}} 
                                    dangerouslySetInnerHTML={{ __html: html_description }} /> :
                                <p style={{fontSize: 13, marginBottom: 20, color: "rgba(0,0,0,0.7)"}}>
                                    The information you include in this section may include; Crafted Activities: Develop a detailed itinerary with a mix of activities, attractions, and free time. Considered Logistics: Plan transportation, accommodation, and other logistical elements to ensure a smooth and enjoyable experience. Travel Dates and Times: Specify the exact dates and times of departure and arrival for each flight, noting the local time at each location. Confirmation Number: Provide the flight confirmation or booking reference number. Ticket Number: Include the ticket number, not just the reservation number, as this is crucial for replacement if lost. Reservation Number: While the ticket number is essential, the reservation number can also be included for convenience
                                </p>
                            }
                            {
                                (INCLUDED_ITEMS_NAME_ARRAY.length > 0) ?
                                <p style={{fontSize: 14, textAlign: "center"}}>
                                    <span style={{fontWeight: "bolder"}}>
                                        Includes: </span>{
                                            INCLUDED_ITEMS_NAME_ARRAY?.map(each=>`${each.replaceAll("_", " ")}, `)
                                        }</p> :
                                <p style={{fontSize: 14, textAlign: "center"}}>
                                    <i style={{marginRight: 10, color: "red"}} className="fa-solid fa-exclamation-triangle"></i>
                                    No items included in this package
                                </p>
                            }
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: -25}}>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY?.map(each=>{
                                
                                let all_icons = {
                                    flight: "plane",
                                    stay: "hotel",
                                    rental_car: "car",
                                    event: "ticket",
                                    cruise: "ship",
                                    bus_tour: "bus",
                                    restaurant: "spoon",
                                };
                                let _icon = all_icons[each];
                                return <div style={{width: 50, height: 50, borderRadius: "100%", backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 5px"}}>
                                    <i style={{fontSize: 20}} className={('fa-solid fa-'+_icon)}></i>
                                </div>
                            })
                        }
                    </div>
                    <div>
                        {
                            items?.map((each, i)=>{
                                let _flip = ((i%2)===0);
                                let name = each?.name?.replaceAll("_", " ");
                                name = (name[0].toUpperCase() + name.substring(1));
                                let _html_details = each?.html_details;
                                let _image_url = each?.image_url;
                                let individual_fields_info = [];
    
                                for(const key in each){
                                    let __value = each[key];
                                    if(Array.isArray(__value)){
                                        __value = __value?.join(", ");
                                    }
                                    if(
                                        key!=="name" &&
                                        key!=="text_editor_content" &&
                                        key!=="html_details" &&
                                        key!=="image_url" 
                                    ){
                                        if(each[key]){
                                            let _key = key?.replaceAll("_", " ");
                                            _key = (_key[0].toUpperCase() + _key.substring(1))
                                            individual_fields_info.push(<span>
                                                <span style={{color: "rgba(0,0,0,0.8)"}}>
                                                    {_key}:{" "}
                                                </span>
                                                {__value}
                                                <br/>
                                            </span>);
                                        }
                                    }
                                }
                                if(!_flip){
                                    return <div style={{marginTop: 20, display: "flex"}}>
                                        <div style={{width: "250px", backgroundImage: `url(${_image_url})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                                        </div>
                                        <div style={{width: "calc(100% - 230px)", margin: 10, marginRight: 0, padding: 10, marginLeft: -20, background: "yellow"}}>
                                            <h3 style={{marginBottom: 10}}>
                                                {name}s:</h3>
                                            <p style={{marginBottom: 10, fontSize: 13, marginRight: -15, backgroundColor: "orange", padding: 10}}>
                                                {individual_fields_info?.map(each=>each)}
                                            </p>
                                            {
                                                _html_details ? 
                                                <div style={{fontSize: 13}} 
                                                    dangerouslySetInnerHTML={{ __html: _html_details }} /> :
                                                <p style={{fontSize: 13, color: "rgba(0,0,0,0.7)"}}>
                                                    Text editor details will be shown here.. 
                                                </p>
                                            }
                                        </div>
                                    </div>
                                }else{
                                    return <div style={{marginTop: 20, display: "flex"}}>
                                        <div style={{width: "calc(100% - 230px)", zIndex: 2, margin: 10, marginLeft: 0, padding: 10, marginRight: -20, background: "yellow"}}>
                                            <h3 style={{marginBottom: 10}}>
                                                {name}s:</h3>
                                            <p style={{marginBottom: 10, fontSize: 13, marginLeft: -15, backgroundColor: "orange", padding: 10}}>
                                                {individual_fields_info?.map(each=>each)}
                                            </p>
                                            {
                                                _html_details ? 
                                                <div style={{fontSize: 13}} 
                                                    dangerouslySetInnerHTML={{ __html: _html_details }} /> :
                                                <p style={{fontSize: 13, color: "rgba(0,0,0,0.7)"}}>
                                                    Text editor details will be shown here.. 
                                                </p>
                                            }
                                        </div>
                                        <div style={{width: "250px", backgroundImage: `url('https://welldugo-oc-53db16692066.herokuapp.com/static/media/news-letter-bg1.f922fef0.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                    <div style={{padding: 20, borderTop: "1px solid rgba(0,0,0,0.1)", marginTop: 20}}>
                        <p style={{fontSize: 13, textAlign: "center"}}>
                            For more information contact us on +1 123 123 1234
                        </p>
                    </div>
                </div>
            </div>
        </div>
}

export default DealsPackagesPreviewPage;