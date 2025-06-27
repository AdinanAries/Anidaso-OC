import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageHotelForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
    } = props;

    const hotelAddressOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.stay ? { ...item, hotel_address: e.target.value  } : item
            )
        })
    }

    const hotelBrandNameOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.stay ? { ...item, brand_name: e.target.value  } : item
            )
        })
    }

    const hotelRatingsOnInput = (e) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.stay ? { ...item, rating: e.target.value  } : item
            )
        })
    }

    const hotelAmenitiesOnInput = (amenity) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>{
                if(item.name === INCLUDE_ITEMS?.stay){
                    let __amenities = item?.room_amenities;
                    if(__amenities.includes(amenity)){
                        __amenities = __amenities.filter(each=>each!==amenity);
                    }else{
                        __amenities.push(amenity);
                    }
                    return { 
                        ...item, 
                        room_amenities: __amenities,
                    }
                } else {
                    return item
                }
            })
        })
    }

    const hotelRoomTypesOnInput = (room_type) => {
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>{
                if(item.name === INCLUDE_ITEMS?.stay){
                    let __r_types = item?.room_types;
                    if(__r_types.includes(room_type)){
                        __r_types = __r_types.filter(each=>each!==room_type);
                    }else{
                        __r_types.push(room_type);
                    }
                    return { 
                        ...item, 
                        room_types: __r_types,
                    }
                } else {
                    return item
                }
            })
        })
    }

    const checkInCheckOutDatesOnInput = (e) => {
        let _dates = e.target.value?.split(" - ");
        if(_dates.length < 1){
            _dates.push("");
        }
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.stay ? { 
                    ...item, 
                    check_in_date: _dates[0],
                    check_out_date: _dates[1]
                } : item
            )
        })
    }

    let hotelData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.stay)[0];

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Hotel Address</p>
            <div style={{border: "none"}}>
                <input onInput={hotelAddressOnInput}
                    value={hotelData?.hotel_address}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Brand Name</p>
            <div style={{border: "none"}}>
                <input onInput={hotelBrandNameOnInput}
                    value={hotelData?.brand_name}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa-solid fa-calendar-alt" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Checkin - Checkout Dates
            </p>
            <div style={{border: "none"}}>
                <input onInput={checkInCheckOutDatesOnInput}
                    value={(hotelData?.check_in_date + (hotelData?.check_out_date ? (" - " + hotelData?.check_out_date) : ""))}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Rating</p>
            <div style={{border: "none"}}>
                <select onInput={hotelRatingsOnInput}
                    value={hotelData?.rating}
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value={1}
                        style={{color: "black"}}>1 Star - Very Bad</option>
                    <option value={2}
                        style={{color: "black"}}>2 Stars - Bad</option>
                    <option value={3}
                        style={{color: "black"}}>3 Stars - Average</option>
                    <option value={4}
                        style={{color: "black"}}>4 Stars - Good</option>
                    <option value={5}
                        style={{color: "black"}}>5 Stars - Excellent</option>
                </select>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Room Amenities</p>
            <div style={{marginTop: 20}}> 
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("sleeping")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("sleeping"))}
                        id="new_package_hotel_room_amenities_sleeping_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_sleeping_check">
                            <span style={{color: "orange"}}>Sleeping:</span> Comfortable beds (king or queen), premium linens, pillows.
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("bathroom")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("bathroom"))}
                         id="new_package_hotel_room_amenities_bathroom_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_bathroom_check">
                            <span style={{color: "orange"}}>Bathroom:</span> Toiletries (shampoo, conditioner, soap, lotion), towels, hairdryer. 
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("entertainment")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("entertainment"))}
                         id="new_package_hotel_room_amenities_entertainment_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_entertainment_check">
                            <span style={{color: "orange"}}>Entertainment:</span> Television, Wi-Fi. 
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("comfort")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("comfort"))}
                         id="new_package_hotel_room_amenities_comfort_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_comfort_check">
                            <span style={{color: "orange"}}>Comfort:</span> Air conditioning/heating, desk, wardrobe, iron and ironing board. 
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("convenience")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("convenience"))}
                         id="new_package_hotel_room_amenities_convenience_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_convenience_check">
                            <span style={{color: "orange"}}>Convenience:</span> Mini-fridge, coffee maker, safe, telephone. 
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelAmenitiesOnInput("other")}
                        className="cm-toggle"
                        checked={(hotelData?.room_amenities?.includes("other"))}
                         id="new_package_hotel_room_amenities_other_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_amenities_other_check">
                            <span style={{color: "orange"}}>Other:</span> Writing desk, chair, luggage rack, in-room safe, blackout curtains.
                        </label>
                    </span>
                </p>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Room Type(s)</p>
            <div style={{marginTop: 20}}>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("deluxe")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("deluxe"))}
                        id="new_package_hotel_room_room_type_deluxe_check"
                        type="checkbox" />
                    <span style={{marginLeft: 10, fontSize: 13}}>
                        <label htmlFor="new_package_hotel_room_room_type_deluxe_check">
                            <span style={{color: "orange"}}>Deluxe Room:</span> Offers more space and amenities than a standard room, potentially with better views, a larger work area, and more luxurious decor. 
                        </label>
                    </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("executive")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("executive"))}
                        id="new_package_hotel_room_room_type_executive_check"
                        type="checkbox" />
                        <span style={{marginLeft: 10, fontSize: 13}}>
                            <label htmlFor="new_package_hotel_room_room_type_executive_check">
                                <span style={{color: "orange"}}>Executive Room:</span> Designed for business travelers, offering features like larger workspaces, better Wi-Fi, and access to executive lounges.
                            </label>
                        </span>
                    </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("single")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("single"))}
                        id="new_package_hotel_room_room_type_single_check"
                        type="checkbox" />
                        <span style={{marginLeft: 10, fontSize: 13}}>
                            <label htmlFor="new_package_hotel_room_room_type_single_check">
                                <span style={{color: "orange"}}>Single Room:</span> Designed for one person, typically with one bed. 
                            </label>
                        </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("standard")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("standard"))}
                        id="new_package_hotel_room_room_type_standard_check"
                        type="checkbox" />
                        <span style={{marginLeft: 10, fontSize: 13}}>
                            <label htmlFor="new_package_hotel_room_room_type_standard_check">
                                <span style={{color: "orange"}}>Standard Room:</span> The most basic and affordable option, typically featuring one or two beds, a private bathroom, and basic amenities like Wi-Fi and a TV.
                            </label>
                        </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("double")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("double"))}
                        id="new_package_hotel_room_room_type_double_check"
                        type="checkbox" />
                        <span style={{marginLeft: 10, fontSize: 13}}>
                            <label htmlFor="new_package_hotel_room_room_type_double_check">
                                <span style={{color: "orange"}}>Double Room:</span> Designed for two people, typically with one double bed or two twin beds. 
                            </label>
                        </span>
                </p>
                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                    <input onInput={()=>hotelRoomTypesOnInput("twin")}
                        className="cm-toggle"
                        checked={(hotelData?.room_types?.includes("twin"))}
                        id="new_package_hotel_room_room_type_twin_check"
                        type="checkbox" />
                        <span style={{marginLeft: 10, fontSize: 13}}>
                            <label htmlFor="new_package_hotel_room_room_type_twin_check">
                                <span style={{color: "orange"}}>Twin Room:</span> Designed for two people, with two separate twin beds.
                            </label>
                        </span>
                </p>
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
                <span style={{color: "orange"}}> Hotels:</span> The package usually includes a specified number of nights at pre-selected hotels, often chosen for their proximity to attractions or for their amenities.
                <span style={{color: "orange"}}> Room Types:</span> Clearly state the specific room category (e.g., standard double, deluxe suite, family room).
                <span style={{color: "orange"}}> Room Amenities:</span> List essential amenities like bathroom facilities, air conditioning, TV, Wi-Fi, etc.
                <span style={{color: "orange"}}> Hotel Facilities:</span> Mention any on-site facilities like a restaurant, bar, pool, spa, gym, etc.
                <span style={{color: "orange"}}> Meals:</span> Indicate if meals are included (e.g., breakfast only, half-board, full-board) and the type of dining (buffet, à la carte).
                <span style={{color: "orange"}}> Spa Treatments:</span> If spa treatments are included, specify the type and duration.
                <span style={{color: "orange"}}> Blackout Dates:</span> Note any dates where the package is not available.
                <span style={{color: "orange"}}> Cancellation Policy:</span> Clearly state the cancellation policy for the hotel and the package.
                <span style={{color: "orange"}}> Other Restrictions:</span> Include any other relevant restrictions, such as age limits for certain activities or room occupancy limits.
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill elem_id="new_package_hotel_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageHotelForm;