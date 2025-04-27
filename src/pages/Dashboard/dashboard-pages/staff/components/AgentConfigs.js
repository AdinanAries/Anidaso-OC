import { useState } from "react";

const AgentConfigs = (props) => {

    const [ appConfigs, setAppConfigs ] = useState([
            {
                msg: "",
                color: "skyblue",
                icon: "globe",
                name: "Client App",
                value: "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com"
            },
            {
                msg: "",
                color: "skyblue",
                icon: "wallet",
                name: "Wallet/Credits",
                value: "$2,000.00 - 5,042 actions",
            },
            {
                msg: "Your service plan",
                color: "skyblue",
                icon: "file-signature",
                name: "Service Plan",
                value: "Basic Tier"
            },
        ]);

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-tools"></i>
            Configurations
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    <div style={{width: "calc(50% - 4px)"}}>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-percent" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Price Markup (%)
                                <span style={{marginLeft: 20, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                                    Charge Flat Rate</span></p>
                            <div style={{border: "none"}}>
                                <input
                                    value=""
                                    type="number" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-share-alt" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Data Provider</p>
                            <div style={{border: "none"}}>
                                <select
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                        <option style={{color: "black"}} value="duffel">Duffel</option>
                                        <option style={{color: "black"}} value="amadeus">Amadeus</option>
                                        <option style={{color: "black"}} value="saber">Saber</option>
                                        <option style={{color: "black"}} value="travelport">Travelport</option>
                                </select>
                            </div>
                        </div>
                        <div
                            style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                            Save
                        </div>
                    </div>
                }
                <div style={{width: "calc(50% - 4px)", borderRadius: 8, padding: 10, backgroundColor: "rgb(49, 30, 53)"}}>
                    <p style={{color: "skyblue", fontSize: 12}}>
                        <i style={{color: "yellow", marginRight: 10}}
                            className='fa-solid fa-cogs'></i>
                        System Configurations
                    </p>
                    <div style={{marginTop: 10, borderTop: "1px dashed rgba(255,255,255,0.5)"}}>
                        <table className='app-standard-table two-columns'>
                            <tr>
                                <td>Name/Property</td>
                                <td>Value</td>
                            </tr>
                            {
                                appConfigs.map(each=>{
                                    return <tr>
                                        <td>
                                            <span className='tool-tip-parent'>
                                                {/**<i style={{color: "lightgreen", marginRight: 10, cursor: "pointer"}}
                                                    className='fa-solid fa-pencil'></i> */}
                                                <i style={{color: each?.color, marginRight: 10, cursor: "pointer"}}
                                                    className={'fa-solid fa-'+each?.icon}></i>
                                                {   each?.msg &&  
                                                    <span style={{color: "black"}}
                                                    className='tool-tip'>
                                                        {each?.msg}</span>
                                                }
                                            </span>
                                            {each?.name}:</td>
                                        <td>{each?.value}</td>
                                    </tr>
                                })
                            }
                        </table>
                        <div className='app-standard-paginator' style={{marginTop: 5}}>
                            <div className='prev-next-btn inactive'>
                                <i className='fa-solid fa-angle-left'></i></div>
                            <div>1</div>
                            <div className='prev-next-btn inactive'>
                                <i className='fa-solid fa-angle-right'></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgentConfigs;