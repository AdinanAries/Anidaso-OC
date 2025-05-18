import { useState } from "react";
import { updateAccountInfo } from "../../../../../services/accountServices";

const HomePageSearchFormConfigurator = (props) => {

    const {
        userDetails,
        BESettings,
        setHomePageSearchButtonTextColor,
        setHomePageSearchButtonBgColor,
        setHomePageSearchButtonIconColor,
        setHomePageSearchInputBackground,
        setHomePageSearchInputIconColor,
        setHomePageSearchInputBorderColor,
        setHomePageSearchInputTextColor,
        setHomePageSearchButtonBorderRadius,
        setHomePageSearchInputborderRadius,
        saveNewBookingEngineSettings,
        setHomePageSearchFormProductTypeSelectorActiveBackground,
        setHomePageSearchFormProductTypeSelectorBackground,
        setHomePageSearchFormProductTypeSelectorActiveTextColor,
        setHomePageSearchFormProductTypeSelectorTextColor,
        setHomePageSearchFormProductTypeSelectorActiveIcon,
        setHomePageSearchFormProductTypeSelectorIcon,
        setHomePageSearchFormProducttypeSelectorBorderRadius,
        resetBookingEngineHomePageSettings,
    } = props;

    const __URL=(userDetails?.website_url || "");
    //"/test-travel-agency-site/templatemo_591_villa_agency/index.html";
    const [ siteLink, setSiteLink ] = useState(__URL);
    const [ previewWebAddressOnInputValue, setPreviewWebAddressOnInputValue] = useState(__URL);

    const previewAddressBarOnInput = (e) => {
        setPreviewWebAddressOnInputValue(e?.target?.value);
    }

    const addressBarHandleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSiteLink(previewWebAddressOnInputValue);
        }
    };

    const previewWindowRefreshOnClick = () => {
        try{
            document.getElementById("be_configurator_preview_url_window").src
                =document.getElementById("be_configurator_preview_url_window").contentWindow.location.href;
        }catch(e){
            alert("window cannot be refreshed due to security reasons on your website")
        }
    }

    const previewHomePageOnClick = () => {
        setSiteLink(__URL);
        setPreviewWebAddressOnInputValue(__URL);
        document.getElementById("be_configurator_preview_url_window").src
                =document.getElementById("be_configurator_preview_url_window").src;
    }

    const saveWebsiteUrlOnClick = async () => {
        const __usr={
            _id: userDetails._id,
            password: userDetails.password,
            first_name: userDetails.first_name,
            middle_name: userDetails.middle_name,
            last_name: userDetails.last_name,
            dob: userDetails.dob,
            gender: userDetails.gender,
            phone: userDetails.phone,
            email: userDetails.email,
            role_id: userDetails.role_id,
            make_new_password: userDetails.make_new_password,
            company_id: (userDetails?.company_id || ""),
            website_url: siteLink,
        }
        if(!siteLink){
            alert("Preview not loaded! Please type your site url in the address bar if you haven't already done so and press enter to preview if you have, before saving...");
            return;
        }
        let __res = await updateAccountInfo(__usr);
        if(__res?._id){
            alert("Website url has been saved!");
        }        
    }

    return <div style={{marginBottom: 10}} className="main-seaction-containers">
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{width: "calc(50% - 5px)"}}>
                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 10}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-server"></i>
                    Customize Search Form
                </p>
                <div style={{display: "flex", marginBottom: 10}}>
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", width: "40%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
                            Input Fields</p>
                        <div style={{display: "flex", padding: 20, 
                                border: `1px solid ${BESettings?.homePageSearchInputBorderColor}`,
                                borderRadius: BESettings?.homePageSearchInputborderRadius, 
                                backgroundColor: BESettings?.homePageSearchInputBackground, margin: 10}}>
                            <i style={{marginRight: 20, color: BESettings?.homePageSearchInputIconColor}} className="fa-solid fa-plane-departure"></i>
                            <p style={{color: BESettings?.homePageSearchInputTextColor, fontSize: 13}}>
                                New York - Jo..  (JFK)</p>
                        </div>
                        <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_search_input_background_input">
                                        Background:</label>
                                </span>
                                <input onInput={setHomePageSearchInputBackground}
                                    id="be_settings_home_page_search_input_background_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchInputBackground}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_search_input_icon_text_color_input">
                                        Icon:</label>
                                </span>
                                <input onInput={setHomePageSearchInputIconColor}
                                    id="be_settings_home_page_search_input_icon_text_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchInputIconColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_search_input_text_color_input">
                                        Text:</label>
                                </span>
                                <input onInput={setHomePageSearchInputTextColor}
                                    id="be_settings_home_page_search_input_text_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchInputTextColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_search_input_border_color_input">
                                        Border:</label>
                                </span>
                                <input onInput={setHomePageSearchInputBorderColor}
                                    id="be_settings_home_page_search_input_border_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchInputBorderColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Border Radius(px):</label>
                                </span>
                                <input onInput={setHomePageSearchInputborderRadius}
                                    value={BESettings?.homePageSearchInputborderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                            </div>
                        </div>
                    </div>
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", width: "25%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
                            Search Button</p>
                        <div style={{display: "flex", padding: 21,
                            borderRadius: BESettings?.homePageSearchButtonBorderRadius, 
                            backgroundColor: BESettings?.homePageSearchButtonBgColor, margin: 10, justifyContent: "center"}}>
                            <i style={{marginRight: 20, color: BESettings?.homePageSearchButtonIconColor}} className="fa-solid fa-search"></i>
                            <p style={{fontSize: 13, color: BESettings?.homePageSearchButtonTextColor}}>
                                Search</p>
                        </div>
                        <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_search_button_background_color_input">
                                        Background:</label>
                                </span>
                                <input onInput={setHomePageSearchButtonBgColor}
                                    id="be_settings_home_page_search_button_background_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchButtonBgColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_button_icon_color_input">
                                        Icon:</label>
                                </span>
                                <input onInput={setHomePageSearchButtonIconColor}
                                    id="be_settings_home_page_button_icon_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchButtonIconColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_button_text_color_input">
                                        Text:</label>
                                </span>
                                <input onInput={setHomePageSearchButtonTextColor}
                                    id="be_settings_home_page_button_text_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchButtonTextColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Border Radius(px):</label>
                                </span>
                                <input onInput={setHomePageSearchButtonBorderRadius}
                                    value={BESettings?.homePageSearchButtonBorderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                            </div>
                        </div>
                    </div>
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", width: "35%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
                            Search Type</p>
                        <div style={{display: "flex", justifyContent: "center", paddingBottom: 12.5}}>
                            <div style={{cursor: "pointer", fontSize: 13, marginRight: 5, 
                                    color: BESettings?.homePageSearchFormProductTypeSelectorActiveTextColor, 
                                    background: BESettings?.homePageSearchFormProductTypeSelectorActiveBackground, 
                                    borderRadius: BESettings?.homePageSearchFormProducttypeSelectorBorderRadius, 
                                    padding: 20
                                }}>
                                <i className="fa-solid fa-plane" ariaHidden="true" style={{
                                        color: BESettings?.homePageSearchFormProductTypeSelectorActiveIcon, marginRight: 10}}></i>
                                <span>Flights</span>
                            </div>
                            <div style={{cursor: "pointer", fontSize: 13, 
                                    color: BESettings?.homePageSearchFormProductTypeSelectorTextColor, 
                                    background: BESettings?.homePageSearchFormProductTypeSelectorBackground, 
                                    borderRadius: BESettings?.homePageSearchFormProducttypeSelectorBorderRadius, 
                                    padding: 20
                                }}>
                                <i className="fa-solid fa-building" ariaHidden="true" style={{
                                    color: BESettings?.homePageSearchFormProductTypeSelectorIcon, marginRight: 10}}></i>
                                <span>Stays</span>
                            </div>
                        </div>
                        <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                            <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                <p style={{color: "orange", fontSize: 12}}>
                                    Active</p>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                        <label for="be_settings_home_page_product_type_select_active_background_input">
                                            Background:</label>
                                    </span>
                                    <input onInput={setHomePageSearchFormProductTypeSelectorActiveBackground}
                                        id="be_settings_home_page_product_type_select_active_background_input" type="color" name="favcolor" 
                                        value={BESettings?.homePageSearchFormProductTypeSelectorActiveBackground}
                                    />
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                        <label for="be_settings_home_page_product_type_select_active_icon_color_input">
                                            Icon:</label>
                                    </span>
                                    <input onInput={setHomePageSearchFormProductTypeSelectorActiveIcon}
                                        id="be_settings_home_page_product_type_select_active_icon_color_input" type="color" name="favcolor" 
                                        value={BESettings?.homePageSearchFormProductTypeSelectorActiveIcon}
                                    />
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_product_type_select_active_text_color_input">
                                        Text:</label>
                                </span>
                                <input onInput={setHomePageSearchFormProductTypeSelectorActiveTextColor}
                                    id="be_settings_home_page_product_type_select_active_text_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchFormProductTypeSelectorActiveTextColor}
                                />
                            </div>
                            </div>
                            <p style={{color: "orange", fontSize: 12}}>
                                Regular</p>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_product_type_select_background_input">
                                        Background:</label>
                                </span>
                                <input onInput={setHomePageSearchFormProductTypeSelectorBackground}
                                    id="be_settings_home_page_product_type_select_background_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchFormProductTypeSelectorBackground}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_product_type_select_icon_color_input">
                                        Icon:</label>
                                </span>
                                <input onInput={setHomePageSearchFormProductTypeSelectorIcon}
                                    id="be_settings_home_page_product_type_select_icon_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchFormProductTypeSelectorIcon}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_home_page_product_type_select_text_color_input">
                                        Text:</label>
                                </span>
                                <input onInput={setHomePageSearchFormProductTypeSelectorTextColor}
                                    id="be_settings_home_page_product_type_select_text_color_input" type="color" name="favcolor" 
                                    value={BESettings?.homePageSearchFormProductTypeSelectorTextColor}
                                />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Border Radius(px):</label>
                                </span>
                                <input onInput={setHomePageSearchFormProducttypeSelectorBorderRadius}
                                    value={BESettings?.homePageSearchFormProducttypeSelectorBorderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <div onClick={saveNewBookingEngineSettings} style={{backgroundColor: "green", marginTop: 0, padding: 15, marginBottom: 10}} className="standard-action-button">
                        <i style={{marginRight: 10}} className="fa-solid fa-eye"></i>
                        Save and preview
                    </div>
                    <div onClick={resetBookingEngineHomePageSettings} style={{marginLeft: 10, backgroundColor: "crimson", marginTop: 0, padding: 15, marginBottom: 10}} className="standard-action-button">
                        <i style={{marginRight: 10}} className="fa-solid fa-rotate"></i>
                        Restore to defaults
                    </div>
                </div>
            </div>
            <div style={{width: "calc(50% - 5px", marginBottom: 10}}>
                <p style={{color: "white", fontSize: 14, marginTop: 10}}>
                    Integrate in two easy steps!</p>
                <p style={{fontSize: 13, backgroundColor: "white", padding: 10, marginTop: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.8)"}}>
                    By adding the following two lines of code into your website, your booking engine search form will be added on the website.
                    Afterwards, you may edit the design of your search form with the tools on this page.
                </p>
                <div style={{marginTop: 20}}>
                    <p style={{color: "orange", fontSize: 13}}>
                        <span style={{color: "rgba(255,255,255,0.5)"}}>
                            Step 1:</span> Add a container item with
                            <span style={{color: "red"}}> id="welldugo_search_form" </span>
                            to your website where to display the form.
                    </p>
                    <div style={{marginTop: 10, border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "rgb(29, 29, 29)", padding: 20, color: "rgb(36, 85, 145)"}}>
                        <p id="booking_engine_home_page_search_form_container_integration_snip" style={{fontSize: 16, whiteSpace: "nowrap", overflow: "auto"}}>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{"<"}</span>
                            {"div "}
                            <span style={{color: "rgb(78, 152, 241)"}}>{'id'}</span>
                            <span style={{color: "rgb(190, 191, 191)"}}>=</span>
                            <span style={{color: "rgb(121, 85, 30)"}}>{'"welldugo_search_form"'}</span>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{" >"}</span>
                            <span style={{color: "green"}}>{" <!--Form Will be Inserted Here--> "}</span>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{"</"}</span>
                            {"div"}
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{">"}</span>
                        </p>
                        <p onClick={()=>{
                            let elem = document.getElementById("booking_engine_home_page_search_form_container_integration_snip");
                            // Copy the text inside the text field
                            navigator.clipboard.writeText(elem.innerText);
                            alert("Copied!");
                        }} style={{borderRadius: 50, fontSize: 13, cursor: "pointer", marginTop: 15, width: 100, backgroundColor: "green", padding: 5, textAlign: "center", color: "white"}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className="fa-solid fa-copy"></i>
                            Copy
                        </p>
                    </div>
                </div>
                <div style={{marginTop: 20}}>
                    <p style={{color: "orange", fontSize: 13}}>
                        <span style={{color: "rgba(255,255,255,0.5)"}}>
                            Step 2:</span> Add the following script tag at the bottom of the page.
                    </p>
                    <div style={{marginTop: 10, border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "rgb(29, 29, 29)", padding: 20, color: "rgb(36, 85, 145)"}}>
                        <p id="booking_engine_home_page_search_form_script_tag_integration_snip" style={{fontSize: 16, whiteSpace: "nowrap", overflow: "auto"}}>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{"<"}</span>
                            {"script "}
                            <span style={{color: "rgb(78, 152, 241)"}}>{'src'}</span>
                            <span style={{color: "rgb(190, 191, 191)"}}>=</span>
                            <span style={{color: "rgb(121, 85, 30)"}}>{'"../../home_page_search_form/searchform.js"'}</span>
                            <span style={{color: "rgb(78, 152, 241)"}}>{' welldugo_ag'}</span>
                            <span style={{color: "rgb(190, 191, 191)"}}>=</span>
                            <span style={{color: "rgb(121, 85, 30)"}}>"{userDetails?._id}"</span>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{" >"}</span>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{"</"}</span>
                            {"script"}
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{">"}</span>
                        </p>
                        <p onClick={()=>{
                            let elem = document.getElementById("booking_engine_home_page_search_form_script_tag_integration_snip");
                            // Copy the text inside the text field
                            navigator.clipboard.writeText(elem.innerText);
                            alert("Copied!");
                        }} style={{borderRadius: 50, fontSize: 13, cursor: "pointer", marginTop: 15, width: 100, backgroundColor: "green", padding: 5, textAlign: "center", color: "white"}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className="fa-solid fa-copy"></i>
                            Copy
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div style={{display: "flex", padding: 5, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: "rgba(255,255,255,0.2)"}}>
                <div onClick={previewWindowRefreshOnClick} style={{width: 35, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                    <i style={{color: "orange"}} className="fa-solid fa-rotate"></i>
                </div>
                <div onClick={previewHomePageOnClick} style={{width: 35, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                    <i style={{color: "orange"}} className="fa-solid fa-home"></i>
                </div>
                <div onClick={saveWebsiteUrlOnClick} style={{width: 35, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                    <i style={{color: "orange"}} className="fa-solid fa-floppy-disk"></i>
                </div>
                <div style={{borderRadius: 50, backgroundColor: "rgba(0,0,0,0.3)", width: "calc(100% - 110px)"}}>
                    <input onInput={previewAddressBarOnInput} 
                        onKeyDown={addressBarHandleEnterKeyPress}
                        style={{width: "calc(100% - 20px)", color: "white", padding: 10, background: "none", border: "none"}} 
                        type="text" value={previewWebAddressOnInputValue} />
                </div>
            </div>
            {
                siteLink ?
                <iframe id="be_configurator_preview_url_window"
                    src={siteLink}
                    style={{width: "100%", border: "none", height: "calc(100vh - 155px)", background: "white"}}
                /> :
                <div id="be_configurator_preview_url_window"
                    src={siteLink}
                    style={{width: "100%", border: "none", height: "calc(100vh - 155px)", background: "white"}}
                >
                    <div style={{padding: 20}}>
                        <div style={{border: "1px solid red", padding: 20, background: "rgba(255,0,0,0.1)"}}>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "red", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                Please enter your website url</p>
                        </div>
                        <div style={{border: "1px solid green", padding: 20, marginTop: 20, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,255,0,0.1)"}}>
                            <div style={{backgroundColor: "rgb(82, 91, 107)", padding: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                                <i style={{color: "orange"}} className="fa-solid fa-floppy-disk"></i>
                            </div>
                            <p style={{fontSize: 14, marginLeft: 10}}>
                                <span style={{fontWeight: "bolder", color: "green", textDecoration: "underline"}}>
                                    The Save button will allow you to save your website url.</span>
                                <br/>
                                <br/>Doing so will allow your customers to go back to the
                                <br/>website home page from the search page when they click 
                                <br/>on the logo and company name shown on the search page header
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default HomePageSearchFormConfigurator;