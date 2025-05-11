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
            <div style={{display: "flex", marginBottom: 20}}>
                <div>
                    <p style={{color: "orange", fontSize: 12, marginBottom: 10, textAlign: "center"}}>
                        Input Fields</p>
                    <div style={{display: "flex", padding: 20, borderRadius: 9, backgroundColor: "white", width: 300, margin: 10}}>
                        <i style={{marginRight: 20}} className="fa-solid fa-plane-departure"></i>
                        <p style={{color: "rgba(0,0,0,0.8)", fontSize: 13}}>
                            New York - John F Kennedy Intl  (JFK)</p>
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Background:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Icon:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Text:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label>
                                    Border Radius(px):</label>
                            </span>
                            <input
                                value="9"
                                style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                        </div>
                    </div>
                </div>
                <div style={{borderLeft: "1px solid rgba(255,255,255,0.1)"}}>
                    <p style={{color: "orange", fontSize: 12, marginBottom: 10, textAlign: "center"}}>
                        Search Button</p>
                    <div style={{display: "flex", padding: 20, borderRadius: 50, backgroundColor: "rgb(23, 87, 148)", margin: 10, justifyContent: "center"}}>
                        <i style={{marginRight: 20, color: "rgba(255,255,255,0.6)"}} className="fa-solid fa-search"></i>
                        <p style={{color: "rgba(0,0,0,0.8)", fontSize: 13, color: "white"}}>
                            Search</p>
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Background:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Icon:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="">
                                    Text:</label>
                            </span>
                            <input 
                                id="" type="color" name="favcolor" 
                                value=""
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label>
                                    Border Radius(px):</label>
                            </span>
                            <input
                                value="50"
                                style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", padding: 5, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: "rgba(255,255,255,0.2)"}}>
                <div style={{width: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                    <i style={{color: "orange"}} className="fa-solid fa-rotate"></i>
                </div>
                <div style={{borderRadius: 50, backgroundColor: "rgba(0,0,0,0.3)", width: "calc(100% - 50px)"}}>
                    <input style={{width: "calc(100% - 20px)", color: "white", padding: 10, background: "none", border: "none"}} 
                        type="text" value={siteLink} />
                </div>
                
            </div>
        </div>
        <div>
            <iframe
                src={siteLink}
                style={{width: "100%", border: "none", height: "calc(100vh - 155px)"}}
            />
        </div>
    </div>
}

export default HomePageSearchFormConfigurator;