import { useState } from "react";

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
        resetBookingEngineSettings,
    } = props;

    const __URL="/test-travel-agency-site/templatemo_591_villa_agency/index.html";
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

    return <div style={{marginBottom: 10}} className="main-seaction-containers">
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{width: "calc(50% - 5px)"}}>
                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 10}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-server"></i>
                    Customize Search Form
                </p>
                <div style={{display: "flex", marginBottom: 10}}>
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", width: "50%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
                            Input Fields</p>
                        <div style={{display: "flex", padding: 20, 
                                border: `1px solid ${BESettings?.homePageSearchInputBorderColor}`,
                                borderRadius: BESettings?.homePageSearchInputborderRadius, 
                                backgroundColor: BESettings?.homePageSearchInputBackground, margin: 10}}>
                            <i style={{marginRight: 20, color: BESettings?.homePageSearchInputIconColor}} className="fa-solid fa-plane-departure"></i>
                            <p style={{color: BESettings?.homePageSearchInputTextColor, fontSize: 13}}>
                                New York - John F Kennedy Intl  (JFK)</p>
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
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", width: "50%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
                            Search Button</p>
                        <div style={{display: "flex", padding: 20,
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
                </div>
                <div style={{display: "flex"}}>
                    <div onClick={saveNewBookingEngineSettings} style={{backgroundColor: "green", marginTop: 0, padding: 15, marginBottom: 10}} className="standard-action-button">
                        <i style={{marginRight: 10}} className="fa-solid fa-eye"></i>
                        Save and preview
                    </div>
                    <div style={{marginLeft: 10, backgroundColor: "crimson", marginTop: 0, padding: 15, marginBottom: 10}} className="standard-action-button">
                        <i style={{marginRight: 10}} className="fa-solid fa-rotate"></i>
                        Restore to defaults
                    </div>
                </div>
            </div>
            <div style={{width: "calc(50% - 5px", marginBottom: 10}}>
                <p style={{color: "white", fontSize: 13, marginTop: 10}}>
                    Integrate with two easy steps!</p>
                <div style={{marginTop: 20}}>
                    <p style={{color: "orange", fontSize: 13}}>
                        <span style={{color: "rgba(255,255,255,0.5)"}}>
                            Step 1:</span> Add a container item with
                            <span style={{color: "red"}}> id="welldugo_search_form" </span>
                            to your website where to display the form.
                    </p>
                    <div style={{marginTop: 10, border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "rgb(29, 29, 29)", padding: 20, color: "rgb(36, 85, 145)"}}>
                        <p style={{fontSize: 16, whiteSpace: "nowrap", overflow: "auto"}}>
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
                        <p style={{borderRadius: 50, fontSize: 13, cursor: "pointer", marginTop: 15, width: 100, backgroundColor: "green", padding: 5, textAlign: "center", color: "white"}}>
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
                        <p style={{fontSize: 16, whiteSpace: "nowrap", overflow: "auto"}}>
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
                        <p style={{borderRadius: 50, fontSize: 13, cursor: "pointer", marginTop: 15, width: 100, backgroundColor: "green", padding: 5, textAlign: "center", color: "white"}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className="fa-solid fa-copy"></i>
                            Copy
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div style={{display: "flex", padding: 5, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: "rgba(255,255,255,0.2)"}}>
                <div style={{width: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                    <i style={{color: "orange"}} className="fa-solid fa-rotate"></i>
                </div>
                <div style={{borderRadius: 50, backgroundColor: "rgba(0,0,0,0.3)", width: "calc(100% - 50px)"}}>
                    <input onInput={previewAddressBarOnInput} 
                        onKeyDown={addressBarHandleEnterKeyPress}
                        style={{width: "calc(100% - 20px)", color: "white", padding: 10, background: "none", border: "none"}} 
                        type="text" value={previewWebAddressOnInputValue} />
                </div>
                
            </div>
            <iframe id="be_configurator_preview_url_window"
                src={siteLink}
                style={{width: "100%", border: "none", height: "calc(100vh - 155px)"}}
            />
        </div>
    </div>
}

export default HomePageSearchFormConfigurator;