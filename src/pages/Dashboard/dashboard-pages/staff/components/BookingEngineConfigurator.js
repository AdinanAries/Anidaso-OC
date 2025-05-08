import LOGO_PLACEHOLDER from "../../../../../LOGO_PLACEHOLDER.jpg";

const BookingEngineConfigurator = (props) => {

    const {
        userDetails,
    } = props;

    return <div>
        <div style={{marginBottom: 20,}}>
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-server"></i>
                Customize Your Engine
            </p>
            <div style={{display: "flex"}}>
                <div>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <div style={{backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, padding: "10.5px 30px"}}>
                            <div>
                                <img style={{width: 30}}
                                    src={LOGO_PLACEHOLDER}/>
                            </div>
                            <p style={{color: "skyblue", fontSize: 12, fontWeight: "bolder", marginLeft: 10}}>
                                Business Name
                            </p>
                        </div>
                    </div>
                    <div style={{padding: "0 10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Background:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#000" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Company:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#a9ddff" />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 10}}>
                        <div style={{backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 5, padding: "20px 10px"}}>
                            <div style={{display: "flex"}}>
                                <p style={{color: "orange", marginRight: 20, fontSize: 13, textDecoration: "underline", cursor: "pointer"}}>
                                    <i style={{marginRight: 5, color: "yellow"}}
                                        className="fa-solid fa-plane"></i>
                                    Flight
                                </p>
                                <p style={{color: "grey", marginRight: 20, fontSize: 13, textDecoration: "underline", cursor: "not-allowed"}}>
                                    <i style={{marginRight: 5, color: "rgba(255,255,255,0.5)"}}
                                        className="fa-solid fa-hotel"></i>
                                    Stays
                                </p>
                                <p style={{color: "grey", fontSize: 13, textDecoration: "underline", cursor: "not-allowed"}}>
                                    <i style={{marginRight: 5, color: "rgba(255,255,255,0.5)"}}
                                        className="fa-solid fa-car"></i>
                                    Cars
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{padding: "0 10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Icon:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#000" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Title:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#000" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Active Icon:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#a9ddff" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Active Title:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#a9ddff" />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <div style={{backgroundColor: "#941777", width: 55, height: 55, marginTop: -5, borderRadius: "100%", boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <i className="fa-solid fa-search" ariaHidden="true" style={{fontSize: 20, color: "rgba(255, 255, 255, 0.4)"}}></i>
                        </div>
                    </div>
                    <div style={{padding: "0 10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Background:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#941777" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Icon:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Border Radius:</label>
                            </span>
                            <input style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" id="favcolor" value="50" />
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <div style={{backgroundColor: "crimson", width: 55, height: 55, marginTop: -5, borderRadius: "100%", boxShadow: "0 0 5px rgba(0, 0, 0, 0.9)",
                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <i className="fa-solid fa-times" ariaHidden="true" style={{fontSize: 20, color: "white"}}></i>
                        </div>
                    </div>
                    <div style={{padding: "0 10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Background:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="#941777" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Icon:</label>
                            </span>
                            <input type="color" id="favcolor" name="favcolor" value="" />
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
                            <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                <label for="favcolor">Border Radius:</label>
                            </span>
                            <input style={{width: 50, background: "none", color: "white", border: "none", borderBottom: "1px solid lightgreen"}} type="number" id="favcolor" value="50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div style={{display: "flex"}}>
                <p style={{fontSize: 14, backgroundColor: "#175794", width: 170, textAlign: "center", padding: 10, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-eye"></i>
                    Save & Preview
                </p>
                <p style={{marginLeft: 10, fontSize: 14, backgroundColor: "green", width: 170, textAlign: "center", padding: 10, borderRadius: 50, marginBottom: 10, cursor: "pointer", color: "white"}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-refresh"></i>
                    Reset to Detault
                </p>
            </div>
            <iframe 
                src={("https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com/?ngn=1&ag="+userDetails?._id)}
                style={{width: "100%", border: "none", height: 1000}}
            />
        </div>
    </div>
}

export default BookingEngineConfigurator;