import { useState } from "react";
import BookingEngineConfigurator from "./BookingEngineConfigurator";
import HomePageSearchFormConfigurator from "./HomePageSearchFormConfigurator";

const EngineConfiguratorPage = (props) => {
    const {
        userDetails,
    } = props;

    const _PAGES = {
        home_page_config: 1,
        search_page_config: 2
    }

    const [currentPage, setCurrentPage] = useState(_PAGES?.home_page_config);

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
            />
        }
        {
            currentPage===_PAGES?.search_page_config &&
            <BookingEngineConfigurator
                userDetails={userDetails}
            />
        }
    </div>
}

export default EngineConfiguratorPage;