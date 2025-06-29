import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";
import {
    prepareQuilEditorContentForStorage
} from "../../../../../helpers/helper-functions";

const NewPackageRestaurantForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        resetFormValidation,
    } = props;

    const restaurantNameOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { ...item, restaurant_name: e.target.value  } : item
            )
        })
    }

    const locationOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { ...item, location_address: e.target.value  } : item
            )
        })
    }

    const ratingOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { ...item, rating: e.target.value  } : item
            )
        })
    }

    const websiteLinkOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { ...item, website_link: e.target.value  } : item
            )
        })
    }

    const priceRangeOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { ...item, price_range_value: e.target.value  } : item
            )
        })
    }

    const setHTMDetails = (html_text, editor_content) => {
        let _html_text = prepareQuilEditorContentForStorage(html_text);
        resetFormValidation();
        setCreateNewPackageData((prevState) => ({
            ...prevState,
            items: prevState?.items?.map(item=>
                item.name === INCLUDE_ITEMS?.restaurant ? { 
                    ...item, 
                    html_details: _html_text,
                    text_editor_content: editor_content,
                } : item
            )
        }))
    }

    let restaurantData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.restaurant)[0];
    let restaurantInfoQuilContent = restaurantData?.text_editor_content;

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Restaurant Name</p>
            <div style={{border: "none"}}>
                <input onInput={restaurantNameOnInput}
                    value={restaurantData?.restaurant_name}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Location Address</p>
            <div style={{border: "none"}}>
                <input onInput={locationOnInput}
                    value={restaurantData?.location_address}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Rating</p>
            <div style={{border: "none"}}>
                <select onInput={ratingOnInput}
                    value={restaurantData?.rating}
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
                <i className="fa fa-link" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Website Link</p>
            <div style={{border: "none"}}>
                <input onInput={websiteLinkOnInput}
                    value={restaurantData?.website_link}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Price Range & Value</p>
            <div style={{border: "none"}}>
                <input onInput={priceRangeOnInput}
                    value={restaurantData?.price_range_value}
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
                <span style={{color: "orange"}}> Restaurant Recommendations:</span> Provide a curated list of restaurants spanning various cuisines, price points, and atmospheres to cater to diverse traveler preferences. Consider including details like the restaurant's specialization, highlights of specific dishes, and any unique features or awards it has received.
                <span style={{color: "orange"}}> Operating Hours & Location:</span> Clearly state the restaurant's address, contact information (phone number, website), and operating hours to allow travelers to plan their visits accordingly. You might also mention if reservations are recommended or required.
                <span style={{color: "orange"}}> Dining Experience & Atmosphere:</span> Describe the restaurant's ambiance and atmosphere (e.g., casual, romantic, family-friendly, lively) to help travelers choose a setting that aligns with their desired dining experience.
                <span style={{color: "orange"}}> Tips for Ordering:</span> Offer helpful tips on local specialties or must-try dishes, particularly if the cuisine is unfamiliar to the traveler.
                <span style={{color: "orange"}}> Accessibility & Dietary Considerations:</span> Include information on whether the restaurant offers options for specific dietary needs (e.g., vegetarian, vegan, gluten-free) or if it has accessibility features.
                <span style={{color: "orange"}}> Customer Reviews & Ratings:</span> Include information on customer reviews and ratings, perhaps with a link to a platform like TripAdvisor, to provide insights into other travelers' experiences.
                <span style={{color: "orange"}}> Booking Information:</span> If possible, include information on how to book a reservation, such as a link to the restaurant's booking system or a reservation platform. 
                <span style={{color: "orange"}}> Restaurant photos:</span> Including enticing photos of the restaurant's interior, exterior, and dishes can help showcase the dining experience.
                <span style={{color: "orange"}}> Culinary Tours & Experiences:</span> If applicable, highlight any local culinary tours or cooking classes that the traveler might enjoy.
                <span style={{color: "orange"}}> Nearby Attractions:</span> Mention nearby attractions or activities that can be combined with a visit to the restaurant to enhance the overall travel experience. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill 
                    currentContent={restaurantInfoQuilContent}
                    setContent={setHTMDetails}
                    elem_id="new_package_hotel_info_form_details_field" 
                />
            </div>
        </div>
    </div>

}

export default NewPackageRestaurantForm;