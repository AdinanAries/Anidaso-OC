import { useEffect, useState } from "react";
import LOGO_PLACEHOLDER from "../../../../../LOGO_PLACEHOLDER.jpg";
import { 
    createNewBookingEngine,
    fetchBookingEngineByAgentId,
} from "../../../../../services/bookingEngineServices";

const BookingEngineConfigurator = (props) => {

    const {
        userDetails,
    } = props;

    const getBookingEngineDefaultSettings = () => {
        return {
            oc_user_id: userDetails?._id,
            enableBookingEngine: true,
            showHeader: true,
            headerBg: "#000",
            headerCompanyTxtColor: "#a9ddff",
            showHeaderCompany: true,
            showHeaderMenu: true,
            headerMenuTxtColor: "#808080",
            headerMenuIconColor: "#FFFFFF80",
            headerMenuActiveTxtColor: "#FFA500",
            headerMenuActiveIconColor: "#FFFF00",
            actionButtonsBg: "#941777",
            actionButtonsTxtColor: "#FFFFFF",
            actionButtonsIconColor: "#ffffff80",
            closeButtonBgColor: "#DC143C",
            closeButtonIconColor: "#FFFFFF",
            showSearchFilters: true,
            searchFiltersTxtColor: "#175794",
            searchFiltersIconColor: "#c751b9",
            searchFiltersIndicatorColor: "#0000007f",
            headerLogoBorderRadius: 100,
            searchButtonBorderRadius: 100,
            actionButtonBorderRadius: 50,
            closeButtonBorderRadius: 100,
        }
    }

    const [BESettings, setBESettings] = useState(getBookingEngineDefaultSettings());

    useEffect(()=>{
        (async()=>{
            let __be_res = await fetchBookingEngineByAgentId(userDetails?._id);
            if(__be_res?._id){
                setBESettings(__be_res);
            }
        })()
    }, []);

    const setShowHeader = (e) => {
        setBESettings({
            ...BESettings,
            showHeader: !e.target.checked
        });
    }

    const setShowHeaderCompany = (e) => {
        setBESettings({
            ...BESettings,
            showHeaderCompany: !e.target.checked
        });
    }

    const setShowHeaderMenu = (e) => {
        setBESettings({
            ...BESettings,
            showHeaderMenu: !e.target.checked
        });
    }

    const setHeaderBg = (e) => {
        setBESettings({
            ...BESettings,
            headerBg: e.target.value
        });
    }

    const setHeaderCompanyTxtColor = (e) => {
        setBESettings({
            ...BESettings,
            headerCompanyTxtColor: e.target.value
        });
    }

    const setHeaderMenuTxtColor = (e) => {
        setBESettings({
            ...BESettings,
            headerMenuTxtColor: e.target.value
        });
    }

    const setHeaderMenuIconColor = (e) => {
        setBESettings({
            ...BESettings,
            headerMenuIconColor: e.target.value
        });
    }

    const setHeaderMenuActiveTxtColor = (e) => {
        setBESettings({
            ...BESettings,
            headerMenuActiveTxtColor: e.target.value
        });
    }

    const setHeaderMenuActiveIconColor = (e) => {
        setBESettings({
            ...BESettings,
            headerMenuActiveIconColor: e.target.value
        });
    }

    const setActionButtonsBg = (e) => {
        setBESettings({
            ...BESettings,
            actionButtonsBg: e.target.value
        });
    }

    const setActionButtonsTxtColor = (e) => {
        setBESettings({
            ...BESettings,
            actionButtonsTxtColor: e.target.value
        });
    }

    const setActionButtonsIconColor = (e) => {
        setBESettings({
            ...BESettings,
            actionButtonsIconColor: e.target.value
        });
    }

    const setCloseButtonBgColor = (e) => {
        setBESettings({
            ...BESettings,
            closeButtonBgColor: e.target.value
        });
    }

    const setCloseButtonIconColor = (e) => {
        setBESettings({
            ...BESettings,
            closeButtonIconColor: e.target.value
        });
    }

    const setShowSearchFilters = (e) => {
        setBESettings({
            ...BESettings,
            showSearchFilters: !e.target.checked
        });
    }

    const setSearchFiltersTxtColor = (e) => {
        setBESettings({
            ...BESettings,
            searchFiltersTxtColor: e.target.value
        });
    }

    const setSearchFiltersIconColor = (e) => {
        setBESettings({
            ...BESettings,
            searchFiltersIconColor: e.target.value
        });
    }

    const setSearchFiltersIndicatorColor = (e) => {
        setBESettings({
            ...BESettings,
            searchFiltersIndicatorColor: e.target.value
        });
    }

    const setHeaderLogoBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            headerLogoBorderRadius: parseInt(e.target.value)
        });
    }

    const setCloseBtnBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            closeButtonBorderRadius: parseInt(e.target.value)
        });
    }

    const setActionBtnBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            actionButtonBorderRadius: parseInt(e.target.value)
        });
    }

    const setSearchBtnBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            searchButtonBorderRadius: parseInt(e.target.value)
        });
    }

    const saveNewBookingEngineSettings = async () => {
        let __be_res = await createNewBookingEngine(BESettings);
        if(__be_res?._id){
            alert("Changes Saved!");
            let be_preview_window = document.getElementById("be_configurator_preview_url")
            be_preview_window.src = be_preview_window?.src;

        }else{
            alert("Error: changes not saved!");
        }
    }

    const resetBookingEngineSettings = () => {
        setBESettings(getBookingEngineDefaultSettings());
    }

    return <div>
        <div style={{marginBottom: 10}} className="main-seaction-containers">
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 10}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-server"></i>
                Customize Engine
            </p>
            <div style={{display: "flex"}}>
                <div>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10, textAlign: "center"}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11}}>
                            Header & Company</p>
                        <div style={{border: "1px dashed lightgreen", borderRight: "none", position: "relative",
                                backgroundColor: BESettings?.headerBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, padding: "9.7px 30px"}}>
                            {
                                BESettings?.showHeaderCompany ?
                                <>
                                    <div>
                                        <img style={{width: 30, borderRadius: `${BESettings?.headerLogoBorderRadius}%`}}
                                            src={LOGO_PLACEHOLDER}/>
                                    </div>
                                    <p style={{color: BESettings?.headerCompanyTxtColor, fontSize: 12, fontWeight: "bolder", marginLeft: 10}}>
                                        Business Name
                                    </p>
                                </> :
                                <div style={{height: 33.5, display: "flex", alignItems: "center"}}>
                                    <p style={{color: "red", fontSize: 11, background: "black"}}>
                                        Company will not be shown</p>
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
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                            Header Menu</p>
                        <div style={{border: "1px dashed lightgreen", borderLeft: "none", position: "relative",
                            backgroundColor: BESettings?.headerBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, padding: "19px 10px"}}>
                            {
                                BESettings?.showHeaderMenu ?
                                <div style={{display: "flex"}}>
                                    <p style={{color: BESettings?.headerMenuActiveTxtColor, marginRight: 20, fontSize: 13, textDecoration: "underline", cursor: "pointer"}}>
                                        <i style={{marginRight: 5, color: BESettings?.headerMenuActiveIconColor}}
                                            className="fa-solid fa-plane"></i>
                                        Flight
                                    </p>
                                    <p style={{color: BESettings?.headerMenuTxtColor, marginRight: 20, fontSize: 13, textDecoration: "underline", cursor: "not-allowed"}}>
                                        <i style={{marginRight: 5, color: BESettings?.headerMenuIconColor}}
                                            className="fa-solid fa-hotel"></i>
                                        Stays
                                    </p>
                                    <p style={{color: BESettings?.headerMenuTxtColor, fontSize: 13, textDecoration: "underline", cursor: "not-allowed"}}>
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
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                            Action Buttons</p>
                        <div style={{display: "flex", backgroundColor: "white", justifyContent: "center", marginBottom: 5, padding: 6.5}}>
                            <div style={{backgroundColor: BESettings?.actionButtonsBg, width: 40, height: 40, 
                                borderRadius: `${BESettings?.searchButtonBorderRadius}%`, boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <i className="fa-solid fa-search" ariaHidden="true" style={{fontSize: 20, 
                                    color: BESettings?.actionButtonsIconColor}}></i>
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
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label>
                                    Border Radius(%):</label>
                            </span>
                            <input onInput={setSearchBtnBorderRadius}
                                value={BESettings?.searchButtonBorderRadius}
                                style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" id="favcolor" />
                        </div>
                    </div>
                </div>
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                            Buttons Text</p>
                        <div style={{display: "flex", backgroundColor: "white", justifyContent: "center", marginBottom: 5, padding: 9.5}}>
                            <div style={{backgroundColor: BESettings?.actionButtonsBg, padding: "10px 20px", 
                                    color: BESettings?.actionButtonsTxtColor, fontSize: 12, 
                                    borderRadius: BESettings?.actionButtonBorderRadius, boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                select
                            </div>
                        </div>
                    </div>
                    <div style={{padding: "0 10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="be_settings_action_buttons_text_color_input">
                                    color:</label>
                            </span>
                            <input onInput={setActionButtonsTxtColor}
                                type="color" id="be_settings_action_buttons_text_color_input" name="favcolor" 
                                value={BESettings?.actionButtonsTxtColor} />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label>
                                    Border Radius(px):</label>
                            </span>
                            <input onInput={setActionBtnBorderRadius}
                                value={BESettings?.actionButtonBorderRadius}
                                style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number"/>
                        </div>
                    </div>
                </div>
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                            Close Button</p>
                        <div style={{display: "flex", justifyContent: "center", backgroundColor: "white", marginBottom: 5, padding: 6.5, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <div style={{backgroundColor: BESettings?.closeButtonBgColor, width: 40, height: 40, 
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
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <p style={{color: "orange", marginBottom: 10, marginLeft: 10, fontSize: 11, textAlign: "center"}}>
                            Filters</p>
                        {
                            BESettings?.showSearchFilters ?
                            <div style={{display: "flex", justifyContent: "center", backgroundColor: "white", marginBottom: 5, padding: 12.5, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
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
            <div style={{display: "flex", marginTop: 30}}>
                <p onClick={saveNewBookingEngineSettings}  style={{fontSize: 13, backgroundColor: "#175794", width: 170, textAlign: "center", padding: 15, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 13, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-eye"></i>
                    Save & Preview
                </p>
                <p onClick={resetBookingEngineSettings} style={{marginLeft: 10, fontSize: 13, backgroundColor: "crimson", width: 170, textAlign: "center", padding: 15, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 13, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-refresh"></i>
                    Reset to Detault
                </p>
            </div>
        </div>
        <div>
            <iframe id="be_configurator_preview_url" 
                src={("https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com/?ngn=1&ag="+userDetails?._id)}
                style={{width: "100%", border: "none", height: "calc(100vh - 84px)"}}
            />
        </div>
    </div>
}

export default BookingEngineConfigurator;