import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";

const NewPackageRestaurantForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
    } = props;
    
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
                Location Address</p>
            <div style={{border: "none"}}>
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Rating</p>
            <div style={{border: "none"}}>
                <select 
                    value={5}
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
                <input 
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Price Range & Value</p>
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
                <RichTextEditorQuill elem_id="new_package_hotel_info_form_details_field" />
            </div>
        </div>
    </div>

}

export default NewPackageRestaurantForm;