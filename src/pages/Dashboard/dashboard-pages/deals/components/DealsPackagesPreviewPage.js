import { add_commas_to_number } from "../../../../../helpers/helper-functions";

const DealsPackagesPreviewPage = (props) => {

    const {
        createNewPackageData,
        INCLUDE_ITEMS
    } = props;

    const {
        title,
        travel_destination,
        total_price,
        items,
    } = createNewPackageData;

    const INCLUDED_ITEMS_NAME_ARRAY = createNewPackageData.items?.map(each=>each.name);

    return <div style={{background: "white"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 20, borderBottom: "1px solid rgba(0,0,0,0.1)", background: "rgb(0, 37, 63)"}}>
                <h3 style={{maxWidth: 160, color: "yellow"}}>
                    How Customers Will View This Package!</h3>
                <div>
                    <select style={{padding: 20, border: "none", color: "white", background: "rgba(0,0,0,0.2)", borderRadius: 8}}>
                        <option style={{color: "black"}}>Page: Highlighter</option>
                    </select>
                    <select style={{marginLeft: 5, padding: 20, border: "none", color: "white", background: "rgba(0,0,0,0.2)", borderRadius: 8}}>
                        <option style={{color: "black"}}>Color: Sunshine</option>
                    </select>
                </div>
            </div>
            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundImage: `url('https://welldugo-oc-53db16692066.herokuapp.com/static/media/news-letter-bg1.f922fef0.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 400}}>
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
                                    1 Person</p>
                                <p style={{fontSize: 13}}>
                                    <i style={{marginRight: 10}} className="fa-solid fa-calendar-alt"></i>
                                    23-03-2025 - 04-05-2025</p>
                            </div>
                        </div>
                        <div style={{padding: 10}}>
                            <p style={{fontSize: 13, marginBottom: 20}}>
                                The information you include in this section may include; Crafted Activities: Develop a detailed itinerary with a mix of activities, attractions, and free time. Considered Logistics: Plan transportation, accommodation, and other logistical elements to ensure a smooth and enjoyable experience. Travel Dates and Times: Specify the exact dates and times of departure and arrival for each flight, noting the local time at each location. Confirmation Number: Provide the flight confirmation or booking reference number. Ticket Number: Include the ticket number, not just the reservation number, as this is crucial for replacement if lost. Reservation Number: While the ticket number is essential, the reservation number can also be included for convenience
                            </p>
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
                                if(!_flip){
                                    return <div style={{marginTop: 20, display: "flex"}}>
                                        <div style={{width: "250px", backgroundImage: `url('https://welldugo-oc-53db16692066.herokuapp.com/static/media/news-letter-bg1.f922fef0.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                                        </div>
                                        <div style={{width: "calc(100% - 230px)", margin: 10, marginRight: 0, padding: 10, marginLeft: -20, background: "yellow"}}>
                                            <h3 style={{marginBottom: 10}}>
                                                {name} details:</h3>
                                            <p style={{fontSize: 13}}>
                                                The information you include in this section may include; Hotels: The package usually includes a specified number of nights at pre-selected hotels, often chosen for their proximity to attractions or for their amenities. Room Types: Clearly state the specific room category (e.g., standard double, deluxe suite, family room). Room Amenities: List essential amenities like bathroom facilities, air conditioning, TV, Wi-Fi, etc. Hotel Facilities: Mention any on-site facilities like a restaurant, bar, pool, spa, gym, etc. Meals: Indicate if meals are included (e.g., breakfast only, half-board, full-board) and the type of dining (buffet, à la carte). Spa Treatments: If spa treatments are included, specify the type and duration. Blackout Dates: Note any dates where the package is not available. Cancellation Policy: Clearly state the cancellation policy for the hotel and the package. Other Restrictions: Include any other relevant restrictions, such as age limits for certain activities or room occupancy limits.
                                            </p>
                                        </div>
                                    </div>
                                }else{
                                    return <div style={{marginTop: 20, display: "flex"}}>
                                        <div style={{width: "calc(100% - 230px)", zIndex: 2, margin: 10, marginLeft: 0, padding: 10, marginRight: -20, background: "yellow"}}>
                                            <h3 style={{marginBottom: 10}}>
                                                {name} details:</h3>
                                            <p style={{fontSize: 13}}>
                                                The information you include in this section may include; Hotels: The package usually includes a specified number of nights at pre-selected hotels, often chosen for their proximity to attractions or for their amenities. Room Types: Clearly state the specific room category (e.g., standard double, deluxe suite, family room). Room Amenities: List essential amenities like bathroom facilities, air conditioning, TV, Wi-Fi, etc. Hotel Facilities: Mention any on-site facilities like a restaurant, bar, pool, spa, gym, etc. Meals: Indicate if meals are included (e.g., breakfast only, half-board, full-board) and the type of dining (buffet, à la carte). Spa Treatments: If spa treatments are included, specify the type and duration. Blackout Dates: Note any dates where the package is not available. Cancellation Policy: Clearly state the cancellation policy for the hotel and the package. Other Restrictions: Include any other relevant restrictions, such as age limits for certain activities or room occupancy limits.
                                            </p>
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