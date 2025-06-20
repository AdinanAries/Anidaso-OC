import { useEffect, useState } from "react";
import LOGO_PLACEHOLDER from "../../../../../LOGO_PLACEHOLDER.jpg";

const BookingEngineConfigurator = (props) => {

    const {
        userDetails,
        BESettings,
        setHeaderMenuTxtColor, 
        setShowHeader, 
        setShowHeaderCompany, 
        setShowHeaderMenu, 
        setHeaderBg, 
        setHeaderCompanyTxtColor,
        setHeaderMenuIconColor, 
        setHeaderMenuActiveTxtColor,
        setHeaderMenuActiveIconColor,
        setActionButtonsBg,
        setActionButtonsTxtColor, 
        setActionButtonsIconColor,
        setCloseButtonBgColor, 
        setCloseButtonIconColor,
        setShowSearchFilters, 
        setSearchFiltersTxtColor,
        setSearchFiltersIconColor, 
        setSearchFiltersIndicatorColor,
        setHeaderLogoBorderRadius, 
        setCloseBtnBorderRadius,
        setActionBtnBorderRadius, 
        setSearchBtnBorderRadius,
        setGreetingsCardBg, 
        setGreetingsCardTextColor,
        setGreetingsCardSecTextColor, 
        setGreetingsCardIconColor,
        setGreetingsCardTitleColor, 
        setGreetingsCardBorderRadius,
        setHideGreetingsCard, 
        setHideCompanyName,
        setHideCompanyLogo,
        saveNewBookingEngineSettings,
        resetBookingEngineSearchPageSettings,
    } = props;

    const {
        business_name,
        logo_url,
        business_email,
        business_phone,
        business_facebook_link,
        business_twitter_link,
        business_instagram_link,
    } = userDetails.company_info;

    return <div>
        <div style={{marginBottom: 10}} className="main-seaction-containers">
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 10}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-server"></i>
                Customize Engine
            </p>
            <div style={{display: "flex", borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                <div style={{width: "18%", borderLeft: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{height: 230}}>
                        <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10, textAlign: "center"}}>
                            <p style={{color: "orange", marginBottom: 10, marginLeft: 10, marginTop: 10, fontSize: 11}}>
                                Header & Company</p>
                            <div style={{border: "1px dashed lightgreen", borderRight: "none", position: "relative",
                                    backgroundColor: BESettings?.headerBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, 
                                    padding: (BESettings?.hideCompanyLogo && BESettings?.showHeaderCompany) ? "19.7px 30px" : "9.7px 30px"}}>
                                {
                                    BESettings?.showHeaderCompany ?
                                    <>
                                        {
                                            BESettings?.hideCompanyLogo ? <></> :
                                            <div>
                                                <img style={{width: 30, borderRadius: `${BESettings?.headerLogoBorderRadius}%`}}
                                                    src={LOGO_PLACEHOLDER}/>
                                            </div>
                                        }
                                        {
                                            BESettings?.hideCompanyName ? <></> :
                                            <p style={{whiteSpace: "nowrap", color: BESettings?.headerCompanyTxtColor, fontSize: 12, fontWeight: "bolder", marginLeft: 10}}>
                                                {business_name || "Business Name"}
                                            </p>
                                        }
                                    </> :
                                    <div style={{height: 33.5, display: "flex", alignItems: "center"}}>
                                        <p style={{color: "red", fontSize: 11, background: "black"}}>
                                            Company will not be shown</p>
                                    </div>
                                }
                                {
                                    (BESettings?.hideCompanyLogo && BESettings?.hideCompanyName && BESettings?.showHeaderCompany) &&
                                    <div style={{height: 13.5, display: "flex", alignItems: "center"}}>
                                        <p style={{color: "red", fontSize: 11, background: "black"}}>
                                            Logo and Name will not be shown</p>
                                    </div>
                                }
                                {
                                    !BESettings?.showHeader &&
                                    <div style={{position: "absolute", backgroundColor: "rgba(255,255,255,0.5)", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <p style={{fontSize: 11, fontWeight: "bolder", backgroundColor: "white"}}>
                                            Header will not show on the site</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div style={{padding: "0 10px"}}>
                            {
                                BESettings?.showHeader &&
                                <>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label for="favcolor">Background:</label>
                                        </span>
                                        <input onInput={setHeaderBg}
                                            type="color" id="favcolor" name="favcolor" value={BESettings?.headerBg} />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label for="favcolor">Company:</label>
                                        </span>
                                        <input onInput={setHeaderCompanyTxtColor} 
                                            type="color" id="favcolor" name="favcolor" value={BESettings?.headerCompanyTxtColor} />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label>
                                                Logo Radius(%):</label>
                                        </span>
                                        <input onInput={setHeaderLogoBorderRadius}
                                            value={BESettings?.headerLogoBorderRadius}
                                            style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" id="favcolor" />
                                    </div>
                                </>
                            }
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                <p>
                                    <span style={{color: "white", fontSize: 13}}>
                                        <label htmlFor="be_settings_show_header_check_box">
                                            Show Header
                                        </label>
                                    </span>
                                </p>
                                <p>
                                <input id="be_settings_show_header_check_box" onInput={setShowHeader} type="checkbox" 
                                        className="cm-toggle" checked={BESettings?.showHeader}
                                    />
                                </p>
                            </div>
                            {
                                BESettings?.showHeader &&
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                    <p>
                                        <span style={{color: "white", fontSize: 13}}>
                                            <label htmlFor="">
                                                Show Company
                                            </label>
                                        </span>
                                    </p>
                                    <p>
                                    <input onInput={setShowHeaderCompany} type="checkbox" 
                                            className="cm-toggle"
                                            checked={BESettings?.showHeaderCompany}
                                        />
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 20, paddingTop: 10, paddingBottom: 20}}>
                        <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                            <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                                Close Button</p>
                            <div style={{display: "flex", justifyContent: "center", backgroundColor: "white", marginBottom: 5, padding: 6.5, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                <div style={{backgroundColor: BESettings?.closeButtonBgColor, width: 39, height: 39, 
                                    borderRadius: `${BESettings?.closeButtonBorderRadius}%`, boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    <i className="fa-solid fa-times" ariaHidden="true" style={{fontSize: 20, 
                                        color: BESettings?.closeButtonIconColor}}></i>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: "0 10px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_close_button_bg_color_input">
                                        Background:</label>
                                </span>
                                <input onInput={setCloseButtonBgColor}
                                    type="color" id="be_settings_close_button_bg_color_input" name="favcolor" 
                                    value={BESettings?.closeButtonBgColor} />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_close_button_icon_color_input">
                                        Icon:</label>
                                </span>
                                <input onInput={setCloseButtonIconColor} 
                                    type="color" id="be_settings_close_button_icon_color_input" name="favcolor" 
                                    value={BESettings?.closeButtonIconColor} />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Border Radius(%):</label>
                                </span>
                                <input onInput={setCloseBtnBorderRadius} 
                                    value={BESettings?.closeButtonBorderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "18%", borderLeft: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{height: 230}}>
                        <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                            <p style={{color: "orange", marginBottom: 10, marginLeft: 10, marginTop: 10, fontSize: 11, textAlign: "center"}}>
                                Header Menu</p>
                            <div style={{border: "1px dashed lightgreen", borderLeft: "none", position: "relative",
                                backgroundColor: BESettings?.headerBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, padding: "19px 10px"}}>
                                {
                                    BESettings?.showHeaderMenu ?
                                    <div style={{display: "flex"}}>
                                        <p style={{whiteSpace: "nowrap", color: BESettings?.headerMenuActiveTxtColor, marginRight: 20, fontSize: 13, fontWeight: "bolder", textDecoration: "underline", cursor: "pointer"}}>
                                            <i style={{marginRight: 5, color: BESettings?.headerMenuActiveIconColor}}
                                                className="fa-solid fa-plane"></i>
                                            Flight
                                        </p>
                                        <p style={{whiteSpace: "nowrap", color: BESettings?.headerMenuTxtColor, marginRight: 20, fontSize: 13, fontWeight: "bolder", textDecoration: "underline", cursor: "not-allowed"}}>
                                            <i style={{marginRight: 5, color: BESettings?.headerMenuIconColor}}
                                                className="fa-solid fa-hotel"></i>
                                            Stays
                                        </p>
                                        <p style={{whiteSpace: "nowrap", color: BESettings?.headerMenuTxtColor, fontSize: 13, fontWeight: "bolder", textDecoration: "underline", cursor: "not-allowed"}}>
                                            <i style={{marginRight: 5, color: BESettings?.headerMenuIconColor}}
                                                className="fa-solid fa-car"></i>
                                            Cars
                                        </p>
                                    </div> :
                                    <div style={{height: 15, display: "flex", alignItems: "center"}}>
                                        <p style={{color: "red", fontSize: 11, background: "black"}}>
                                            Menu will not be shown</p>
                                    </div>
                                }
                                {
                                    !BESettings?.showHeader &&
                                    <div style={{position: "absolute", backgroundColor: "rgba(255,255,255,0.5)", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <p style={{fontSize: 11, fontWeight: "bolder", backgroundColor: "white"}}>
                                            Header will not show on the site</p>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            BESettings?.showHeader &&
                            <div style={{padding: "0 10px"}}>
                                {
                                    BESettings?.showHeaderMenu &&
                                    <>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                                <label for="be_settings_header_menu_icon_color_input">
                                                    Icon:</label>
                                            </span>
                                            <input onInput={setHeaderMenuIconColor}
                                                type="color" id="be_settings_header_menu_icon_color_input" name="favcolor" 
                                                value={BESettings?.headerMenuIconColor} />
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                                <label for="be_settings_menu_txt_color_input">
                                                    Title:</label>
                                            </span>
                                            <input onInput={setHeaderMenuTxtColor}
                                                type="color" id="be_settings_menu_txt_color_input" name="favcolor" 
                                                value={BESettings?.headerMenuTxtColor} />
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                                <label for="be_settings_header_menu_active_icon_color_input">
                                                    Active Icon:</label>
                                            </span>
                                            <input onInput={setHeaderMenuActiveIconColor}
                                                type="color" id="be_settings_header_menu_active_icon_color_input" name="favcolor" 
                                                value={BESettings?.headerMenuActiveIconColor} />
                                        </div>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                                <label for="be_settings_menu_active_txt_color_input">
                                                    Active Title:</label>
                                            </span>
                                            <input onInput={setHeaderMenuActiveTxtColor} 
                                                type="color"  id="be_settings_menu_active_txt_color_input" name="favcolor" 
                                                value={BESettings?.headerMenuActiveTxtColor} />
                                        </div>
                                    </>
                                }
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                    <p>
                                        <span style={{color: "white", fontSize: 13}}>
                                            <label htmlFor="be_settings_show_header_menu_check">
                                                Show Menu
                                            </label>
                                        </span>
                                    </p>
                                    <p>
                                        <input onInput={setShowHeaderMenu} checked={BESettings?.showHeaderMenu} type="checkbox" 
                                            id="be_settings_show_header_menu_check"
                                            className="cm-toggle"
                                        />
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 20, paddingTop: 10, paddingBottom: 20}}>
                        <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                            <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                                Filters</p>
                            {
                                BESettings?.showSearchFilters ?
                                <div style={{display: "flex", justifyContent: "center", backgroundColor: "white", marginBottom: 5, padding: 11.5, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                    <div style={{cursor: "pointer", padding: "7px 13px", borderRadius: 8, display: "flex", alignItems: "center"}}>
                                        <i className="fa-solid fa-business-time" style={{marginRight: 10, 
                                            color: BESettings?.searchFiltersIconColor, fontSize: 13.5}}></i>
                                        <p style={{color: BESettings?.searchFiltersTxtColor, fontSize: 13, fontWeight: "bolder", fontFamily: "Prompt, sans-serif"}}>
                                            Time
                                        </p>
                                        <i className="fa-solid fa-angle-down" style={{marginLeft: 15, 
                                            color: BESettings?.searchFiltersIndicatorColor, fontSize: 13}}></i>
                                    </div>
                                </div> :
                                <div style={{height: 54, padding: 10, display: "flex", alignItems: "center", backgroundColor: "white"}}>
                                    <p style={{color: "red", fontSize: 11, background: "black"}}>
                                        Filters will not be shown</p>
                                </div>
                            }
                        </div>
                        <div style={{padding: "0 10px"}}>
                            {
                                BESettings?.showSearchFilters &&
                                <>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label for="be_settings_search_filters_txt_color_input">
                                                Title:</label>
                                        </span>
                                        <input onInput={setSearchFiltersTxtColor}
                                            type="color" id="be_settings_search_filters_txt_color_input" name="favcolor" 
                                            value={BESettings?.searchFiltersTxtColor} />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label for="be_settings_search_filters_icon_color_input">
                                                Icon:</label>
                                        </span>
                                        <input onInput={setSearchFiltersIconColor} 
                                            type="color" id="be_settings_search_filters_icon_color_input" name="favcolor" 
                                            value={BESettings?.searchFiltersIconColor} />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                            <label for="be_settings_search_filters_indicator_color_input">
                                                Indicator:</label>
                                        </span>
                                        <input onInput={setSearchFiltersIndicatorColor}
                                            type="color" id="be_settings_search_filters_indicator_color_input" name="favcolor" 
                                            value={BESettings?.searchFiltersIndicatorColor} />
                                    </div>
                                </>
                            }
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                <p>
                                    <span style={{color: "white", fontSize: 13}}>
                                        <label htmlFor="">
                                            Show Filters
                                        </label>
                                    </span>
                                </p>
                                <p>
                                    <input onInput={setShowSearchFilters}
                                        checked={BESettings?.showSearchFilters}
                                        type="checkbox" 
                                        className="cm-toggle"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "18%", borderLeft: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{height: 230}}>
                        <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                            <p style={{color: "orange", marginBottom: 10, marginLeft: 10, marginTop: 10, fontSize: 11, textAlign: "center"}}>
                                Action Buttons</p>
                            <div style={{display: "flex", backgroundColor: "white", justifyContent: "center", marginBottom: 5, padding: 7.5}}>
                                <div style={{backgroundColor: BESettings?.actionButtonsBg, width: 40, height: 40, 
                                    borderRadius: `${BESettings?.searchButtonBorderRadius}%`, boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    <i className="fa-solid fa-search" ariaHidden="true" style={{fontSize: 20, 
                                        color: BESettings?.actionButtonsIconColor}}></i>
                                </div>
                                <div style={{backgroundColor: BESettings?.actionButtonsBg, padding: "10px 20px", 
                                        color: BESettings?.actionButtonsTxtColor, fontSize: 12, marginLeft: 20,
                                        borderRadius: BESettings?.actionButtonBorderRadius, boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    select
                                </div>
                            </div>
                        </div>
                        <div style={{padding: "0 10px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_setings_action_buttons_bg_color_input">
                                        Background:</label>
                                </span>
                                <input onInput={setActionButtonsBg}
                                    type="color" id="be_setings_action_buttons_bg_color_input" name="favcolor" 
                                    value={BESettings?.actionButtonsBg} />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_action_buttons_icon_color_input">Icon:</label>
                                </span>
                                <input onInput={setActionButtonsIconColor}
                                    type="color" id="be_settings_action_buttons_icon_color_input" name="favcolor" 
                                    value={BESettings?.actionButtonsIconColor} />
                            </div>
                            
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="be_settings_action_buttons_text_color_input">
                                        Text:</label>
                                </span>
                                <input onInput={setActionButtonsTxtColor}
                                    type="color" id="be_settings_action_buttons_text_color_input" name="favcolor" 
                                    value={BESettings?.actionButtonsTxtColor} />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Search Radius(%):</label>
                                </span>
                                <input onInput={setSearchBtnBorderRadius}
                                    value={BESettings?.searchButtonBorderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" id="favcolor" />
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label>
                                        Select Radius(px):</label>
                                </span>
                                <input onInput={setActionBtnBorderRadius}
                                    value={BESettings?.actionButtonBorderRadius}
                                    style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number"/>
                            </div>
                        </div>
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,0,0,0.1)", height: "calc(100% - 260px)", marginTop: 20, paddingTop: 10}}>
                        <div style={{marginBottom: 10}}>
                            <p style={{color: "orange", marginBottom: 20, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                                Other Settings</p>
                        </div>
                        <div style={{padding: "0 10px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                <p>
                                    <span style={{color: "white", fontSize: 13}}>
                                        <label htmlFor="be_settings_hide_company_name_check">
                                            Hide Company Name
                                        </label>
                                    </span>
                                </p>
                                <p>
                                    <input onInput={setHideCompanyName} type="checkbox" 
                                        checked={BESettings?.hideCompanyName}
                                        id="be_settings_hide_company_name_check"
                                        className="cm-toggle"
                                    />
                                </p>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                <p>
                                    <span style={{color: "white", fontSize: 13}}>
                                        <label htmlFor="be_settings_hide_company_logo_check">
                                            Hide Company Logo
                                        </label>
                                    </span>
                                </p>
                                <p>
                                    <input onInput={setHideCompanyLogo} type="checkbox" 
                                        id="be_settings_hide_company_logo_check"
                                        checked={BESettings?.hideCompanyLogo}
                                        className="cm-toggle"
                                    />
                                </p>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                <p>
                                    <span style={{color: "white", fontSize: 13}}>
                                        <label htmlFor="be_settings_hide_greetings_card_checkbox">
                                            Hide Greeting Card
                                        </label>
                                    </span>
                                </p>
                                <p>
                                    <input onInput={setHideGreetingsCard} type="checkbox" 
                                        checked={BESettings?.hideGreetingsCard}
                                        id="be_settings_hide_greetings_card_checkbox"
                                        className="cm-toggle"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: "46%", border: "1px solid rgba(255,255,255,0.1)", borderTop: "none"}}>
                    <p style={{color: "orange", marginBottom: 10, marginLeft: 10, marginTop: 10, fontSize: 11, textAlign: "center"}}>
                        Greeting Card</p>
                    {
                        (BESettings?.hideGreetingsCard) ? 
                        <div style={{width: "100%", height: "calc(100% - 33px)", background: "white", marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div>
                                <p style={{}}>
                                    <i style={{marginRight: 10, color: "red"}}
                                        className="fa-solid fa-exclamation-triangle"></i>
                                    Your greetings card will not be shown on site
                                </p>
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                                    <p>
                                        <span style={{color: "green", fontSize: 13}}>
                                            <label htmlFor="be_settings_hide_greetings_card_checkbox_2">
                                                Click here to enable greetings card on your site
                                            </label>
                                        </span>
                                    </p>
                                    <p>
                                        <input onInput={setHideGreetingsCard} type="checkbox" 
                                            checked={BESettings?.hideGreetingsCard}
                                            id="be_settings_hide_greetings_card_checkbox_2"
                                            className="cm-toggle"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div> :
                        <div style={{padding: 10, paddingTop: 0, borderTop: "none"}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: "calc(100% - 80px)"}}>
                                    <div style={{padding: "30px 20px", 
                                            backgroundColor: BESettings?.greetingsCardBg, 
                                            borderRadius: BESettings?.greetingsCardBorderRadius}}>
                                        <p style={{border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 30, padding: 20, display: "flex", justifyContent: "center", 
                                                color: BESettings?.greetingsCardTextColor}}>
                                            <i style={{marginRight: 10, color: "red"}}
                                                className="fa-solid fa-exclamation-triangle"></i>
                                            Please complete the search form to begin search...
                                        </p>
                                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                                            {
                                                BESettings?.hideCompanyLogo ? <></> :
                                                <div>
                                                    <img style={{width: 60, borderRadius: `${BESettings?.headerLogoBorderRadius}%`}}
                                                        src={LOGO_PLACEHOLDER}/>
                                                </div>
                                            }
                                            <div style={{marginTop: 5}}>
                                                {
                                                    BESettings?.hideCompanyName ? <></> :
                                                    <h1 style={{color: BESettings?.greetingsCardTextColor, fontSize: 20, textAlign: "center"}}>
                                                    {business_name || "Business Name"}</h1>
                                                }
                                                <p style={{fontWeight: "bolder", fontSize: 12, color: BESettings?.greetingsCardTitleColor, textAlign: "center", marginBottom: 15, marginTop: 20, letterSpacing: 0.5}}>
                                                        - Agent Details -</p>
                                                <p style={{ display: "flex", justifyContent: "center", 
                                                        color: BESettings?.greetingsCardTextColor, marginTop: 10}}>
                                                    <i style={{marginRight: 10, color: BESettings?.greetingsCardIconColor}}
                                                        className="fa-solid fa-user-tie"></i>
                                                    {userDetails?.first_name} {userDetails?.last_name}
                                                </p>
                                                <p style={{color: BESettings?.greetingsCardSecTextColor, fontSize: 13, textAlign: "center", marginTop: 5}}>
                                                    {userDetails?.phone}, {userDetails?.email}</p>
                                                <div className="footer_section_each_flex_section_container" style={{marginTop: 20}}>
                                                    <p style={{fontWeight: "bolder", color: BESettings?.greetingsCardTitleColor, fontSize: 12, textAlign: "center", marginBottom: 15, letterSpacing: 0.5}}>
                                                        - Contact Us -</p>
                                                    <div style={{marginTop: 10}}>
                                                        <p style={{color: BESettings?.greetingsCardTextColor, textAlign: "center"}}>
                                                            <i style={{marginRight: 10, color: BESettings?.greetingsCardIconColor, marginBottom: 8}} className="fa fa-envelope"></i>
                                                            {business_email || "business@email.com"}
                                                        </p>
                                                        <p style={{color: BESettings?.greetingsCardTextColor, textAlign: "center"}}>
                                                            <i style={{marginRight: 10, color: BESettings?.greetingsCardIconColor, marginBottom: 10}} className="fa fa-phone"></i>
                                                            {business_phone || "+1 123-123-123"}
                                                        </p>
                                                        <p style={{color: BESettings?.greetingsCardIconColor, textAlign: "center"}}>
                                                            <span style={{padding: "5px", marginRight: 10, borderRadius: 4, cursor: "pointer"}}>
                                                                <i style={{marginBottom: 5, fontSize: 19}} className="fa fa-facebook"></i>
                                                            </span>
                                                            <span style={{padding: "5px", marginRight: 10, borderRadius: 4, cursor: "pointer"}}>
                                                                <i style={{marginBottom: 5, fontSize: 19}} className="fa fa-twitter"></i>
                                                            </span>
                                                            <span style={{padding: "5px", marginRight: 10, borderRadius: 4, cursor: "pointer"}}>
                                                                <i style={{marginBottom: 5, fontSize: 19}} className="fa fa-instagram"></i>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginLeft: 10, marginTop: 10}}>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Background:</label>
                                        </p>
                                        <input onInput={setGreetingsCardBg}
                                            type="color" name="favcolor" 
                                            value={BESettings?.greetingsCardBg} />
                                    </div>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Main Text:</label>
                                        </p>
                                        <input onInput={setGreetingsCardTextColor}
                                            type="color" name="favcolor" 
                                            value={BESettings?.greetingsCardTextColor} />
                                    </div>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Sub Text:</label>
                                        </p>
                                        <input onInput={setGreetingsCardSecTextColor}
                                            type="color" name="favcolor" 
                                            value={BESettings?.greetingsCardSecTextColor} />
                                    </div>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Icons:</label>
                                        </p>
                                        <input onInput={setGreetingsCardIconColor}
                                            type="color" name="favcolor" 
                                            value={BESettings?.greetingsCardIconColor} />
                                    </div>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Titles:</label>
                                        </p>
                                        <input onInput={setGreetingsCardTitleColor}
                                            type="color" name="favcolor" 
                                            value={BESettings?.greetingsCardTitleColor} />
                                    </div>
                                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10, marginBottom: 10}}>
                                        <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                            <label>
                                                Radius (px):</label>
                                        </p>
                                        <input onInput={setGreetingsCardBorderRadius}
                                            value={BESettings?.greetingsCardBorderRadius}
                                            style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div style={{display: "flex", marginTop: 30}}>
                <p onClick={saveNewBookingEngineSettings}  style={{fontSize: 13, backgroundColor: "#175794", width: 170, textAlign: "center", padding: 15, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 13, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-eye"></i>
                    Save & Preview
                </p>
                <p onClick={resetBookingEngineSearchPageSettings} style={{marginLeft: 10, fontSize: 13, backgroundColor: "crimson", width: 170, textAlign: "center", padding: 15, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 13, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-refresh"></i>
                    Reset to Detault
                </p>
            </div>
        </div>
        <div>
            <iframe id="be_configurator_preview_url_window" 
                src={("https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com/?ngn=1&ag="+userDetails?._id)}
                style={{width: "100%", border: "none", height: "calc(100vh - 84px)"}}
            />
        </div>
    </div>
}

export default BookingEngineConfigurator;