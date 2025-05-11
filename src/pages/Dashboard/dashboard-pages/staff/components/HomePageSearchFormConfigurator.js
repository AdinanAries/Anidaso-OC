import { useState } from "react";

const HomePageSearchFormConfigurator = (props) => {

    const [ siteLink, setSiteLink ] = useState("/test-travel-agency-site/templatemo_591_villa_agency/index.html")

    return <div style={{marginBottom: 10}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 10}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
            className="fa fa-server"></i>
            Customize Search Form
        </p>
        <div>

        </div>
        <div>
            <iframe
                src={siteLink}
                style={{width: "100%", border: "none", height: "calc(100vh - 84px)"}}
            />
        </div>
    </div>
}

export default HomePageSearchFormConfigurator;