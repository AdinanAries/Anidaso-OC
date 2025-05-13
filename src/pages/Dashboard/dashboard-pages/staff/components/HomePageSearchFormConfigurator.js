import { useState } from "react";

const HomePageSearchFormConfigurator = (props) => {

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
                        <div style={{display: "flex", padding: 20, borderRadius: 9, backgroundColor: "white", margin: 10}}>
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
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <span style={{color: "white", marginRight: 10, fontSize: 13}}>
                                    <label for="">
                                        Border:</label>
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
                    <div style={{border: "1px solid rgba(255,255,255,0.1)", width: "50%"}}>
                        <p style={{color: "orange", fontSize: 12, marginBottom: 10, marginTop: 10, textAlign: "center"}}>
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
                <div style={{display: "flex"}}>
                    <div style={{backgroundColor: "green", marginTop: 0, padding: 15, marginBottom: 10}} className="standard-action-button">
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
                        <p style={{fontSize: 16}}>
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
                        <p style={{fontSize: 16}}>
                            <span style={{color: "rgba(255,255,255,0.3)"}}>{"<"}</span>
                            {"script "}
                            <span style={{color: "rgb(78, 152, 241)"}}>{'src'}</span>
                            <span style={{color: "rgb(190, 191, 191)"}}>=</span>
                            <span style={{color: "rgb(121, 85, 30)"}}>{'"../../home_page_search_form/searchform.js"'}</span>
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
            <iframe
                src={siteLink}
                style={{width: "100%", border: "none", height: "calc(100vh - 155px)"}}
            />
        </div>
    </div>
}

export default HomePageSearchFormConfigurator;