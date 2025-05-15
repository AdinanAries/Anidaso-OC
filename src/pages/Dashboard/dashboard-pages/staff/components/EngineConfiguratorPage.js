import { useState, useEffect } from "react";
import BookingEngineConfigurator from "./BookingEngineConfigurator";
import HomePageSearchFormConfigurator from "./HomePageSearchFormConfigurator";
import { 
    createNewBookingEngine,
    fetchBookingEngineByAgentId,
} from "../../../../../services/bookingEngineServices";

const EngineConfiguratorPage = (props) => {
    const {
        userDetails,
    } = props;

    const _PAGES = {
        home_page_config: 1,
        search_page_config: 2
    }

    const [currentPage, setCurrentPage] = useState(_PAGES?.home_page_config);

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
            greetingsCardBg: "#000",
            greetingsCardTextColor: "#FFFFFF",
            greetingsCardSecTextColor: "#c9c7c9", 
            greetingsCardIconColor: "#c9c7c9",
            greetingsCardTitleColor: "#c751b9",
            greetingsCardBorderRadius: 9,
            hideGreetingsCard: false,
            hideCompanyLogo: false,
            hideCompanyName: false,
            homePageSearchButtonTextColor: "#FFFFFF",
            homePageSearchButtonBgColor: "#175794",
            homePageSearchButtonIconColor: "#e0e0e0",
            homePageSearchButtonBorderRadius: 50,
            homePageSearchInputBackground: "#FFFFFF",
            homePageSearchInputIconColor: "black",
            homePageSearchInputBorderColor: "#e0e0e0",
            homePageSearchInputborderRadius: 9,
            homePageSearchInputTextColor: "black",
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
    
    const setGreetingsCardBg = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardBg: e.target.value
        });
    }
    
    const setGreetingsCardTextColor = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardTextColor: e.target.value
        });
    }
    
    const setGreetingsCardSecTextColor = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardSecTextColor: e.target.value
        });
    }
    
    const setGreetingsCardIconColor = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardIconColor: e.target.value
        });
    }
    
    const setGreetingsCardTitleColor = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardTitleColor: e.target.value
        });
    }
    
    const setGreetingsCardBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            greetingsCardBorderRadius: parseInt(e.target.value)
        });
    }
    
    const setHideGreetingsCard = (e) => {
        setBESettings({
            ...BESettings,
            hideGreetingsCard: !e.target.checked
        });
    }
    
    const setHideCompanyName = (e) => {
        setBESettings({
            ...BESettings,
            hideCompanyName: !e.target.checked
        });
    }
    
    const setHideCompanyLogo = (e) => {
        setBESettings({
            ...BESettings,
            hideCompanyLogo: !e.target.checked
        });
    }

    const setHomePageSearchButtonTextColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchButtonTextColor: e.target.value
        });
    }
    
    const setHomePageSearchButtonBgColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchButtonBgColor: e.target.value
        });
    }
    
    const setHomePageSearchButtonIconColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchButtonIconColor: e.target.value
        });
    }
    
    const setHomePageSearchInputBackground = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchInputBackground: e.target.value
        });
    }
    
    const setHomePageSearchInputIconColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchInputIconColor: e.target.value
        });
    }
    
    const setHomePageSearchInputBorderColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchInputBorderColor: e.target.value
        });
    }
    
    const setHomePageSearchInputTextColor = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchInputTextColor: e.target.value
        });
    }
    
    const setHomePageSearchButtonBorderRadius = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchButtonBorderRadius: parseInt(e.target.value)
        });
    }
    
    const setHomePageSearchInputborderRadius = (e) => {
        setBESettings({
            ...BESettings,
            homePageSearchInputborderRadius: parseInt(e.target.value)
        });
    }
    
    const saveNewBookingEngineSettings = async () => {
        let __be_res = await createNewBookingEngine(BESettings);
        if(__be_res?._id){
            alert("Changes Saved!");
            let be_preview_window = document.getElementById("be_configurator_preview_url_window")
            be_preview_window.src = be_preview_window?.src;

        }else{
            alert("Error: changes not saved!");
        }
    }
    
    const resetBookingEngineSettings = () => {
        setBESettings(getBookingEngineDefaultSettings());
    }


    return <div>
        <div style={{padding: 20, background: "rgba(0,0,0,0.2)"}}>
            <div style={{display: "flex"}}>
                <div onClick={()=>setCurrentPage(_PAGES?.home_page_config)}
                    style={{textDecoration: currentPage===_PAGES?.home_page_config ? "underline" : "none", cursor: "pointer", 
                    color: currentPage===_PAGES?.home_page_config ? "rgba(255, 255, 84, 0.8)" : "rgba(255,255,255,0.8)", fontSize: 13, marginRight: 30}}>
                    <i style={{marginRight: 10, 
                        color: currentPage===_PAGES?.home_page_config ? "yellow" : "rgba(255,255,255,0.8)"}}
                        className="fa-solid fa-home"></i>
                    Website Home Page
                </div>
                <div onClick={()=>setCurrentPage(_PAGES?.search_page_config)}
                    style={{textDecoration:  currentPage===_PAGES?.search_page_config ? "underline" : "none", cursor: "pointer", 
                    color: currentPage===_PAGES?.search_page_config ? "rgba(255, 255, 84, 0.8)" : "rgba(255,255,255,0.8)", fontSize: 13}}>
                    <i style={{marginRight: 10, 
                        color: currentPage===_PAGES?.search_page_config ? "yellow" : "rgba(255,255,255,0.8)"}}
                        className="fa-solid fa-search"></i>
                    Website Search Page
                </div>
            </div>
        </div>
        {
            currentPage===_PAGES?.home_page_config &&
            <HomePageSearchFormConfigurator
                userDetails={userDetails}
                BESettings={BESettings}
                setHomePageSearchButtonTextColor={setHomePageSearchButtonTextColor}
                setHomePageSearchButtonBgColor={setHomePageSearchButtonBgColor}
                setHomePageSearchButtonIconColor={setHomePageSearchButtonIconColor}
                setHomePageSearchInputBackground={setHomePageSearchInputBackground}
                setHomePageSearchInputIconColor={setHomePageSearchInputIconColor}
                setHomePageSearchInputBorderColor={setHomePageSearchInputBorderColor}
                setHomePageSearchInputTextColor={setHomePageSearchInputTextColor}
                setHomePageSearchButtonBorderRadius={setHomePageSearchButtonBorderRadius}
                setHomePageSearchInputborderRadius={setHomePageSearchInputborderRadius}
                saveNewBookingEngineSettings={saveNewBookingEngineSettings}
                resetBookingEngineSettings={resetBookingEngineSettings}
            />
        }
        {
            currentPage===_PAGES?.search_page_config &&
            <BookingEngineConfigurator
                userDetails={userDetails}
                BESettings={BESettings}
                setHeaderMenuTxtColor={setHeaderMenuTxtColor}
                setShowHeader={setShowHeader}
                setShowHeaderCompany={setShowHeaderCompany}
                setShowHeaderMenu={setShowHeaderMenu}
                setHeaderBg={setHeaderBg}
                setHeaderCompanyTxtColor={setHeaderCompanyTxtColor}
                setHeaderMenuIconColor={setHeaderMenuIconColor}
                setHeaderMenuActiveTxtColor={setHeaderMenuActiveTxtColor}
                setHeaderMenuActiveIconColor={setHeaderMenuActiveIconColor}
                setActionButtonsBg={setActionButtonsBg}
                setActionButtonsTxtColor={setActionButtonsTxtColor}
                setActionButtonsIconColor={setActionButtonsIconColor}
                setCloseButtonBgColor={setCloseButtonBgColor}
                setCloseButtonIconColor={setCloseButtonIconColor}
                setShowSearchFilters={setShowSearchFilters}
                setSearchFiltersTxtColor={setSearchFiltersTxtColor}
                setSearchFiltersIconColor={setSearchFiltersIconColor}
                setSearchFiltersIndicatorColor={setSearchFiltersIndicatorColor}
                setHeaderLogoBorderRadius={setHeaderLogoBorderRadius}
                setCloseBtnBorderRadius={setCloseBtnBorderRadius}
                setActionBtnBorderRadius={setActionBtnBorderRadius}
                setSearchBtnBorderRadius={setSearchBtnBorderRadius}
                setGreetingsCardBg={setGreetingsCardBg}
                setGreetingsCardTextColor={setGreetingsCardTextColor}
                setGreetingsCardSecTextColor={setGreetingsCardSecTextColor}
                setGreetingsCardIconColor={setGreetingsCardIconColor}
                setGreetingsCardTitleColor={setGreetingsCardTitleColor}
                setGreetingsCardBorderRadius={setGreetingsCardBorderRadius}
                setHideGreetingsCard={setHideGreetingsCard}
                setHideCompanyName={setHideCompanyName}
                setHideCompanyLogo={setHideCompanyLogo}
                saveNewBookingEngineSettings={saveNewBookingEngineSettings}
                resetBookingEngineSettings={resetBookingEngineSettings}
            />
        }
    </div>
}

export default EngineConfiguratorPage;