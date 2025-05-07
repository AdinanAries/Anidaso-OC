import { useEffect, useState } from "react";
import { 
    fetchAgentInfoByAgentIdAndPropName,
    createNewAgentInfo,
} from "../../../../../services/agentServices";
import FormErrorCard from "../../../../../components/FormErrorCard";

const AgentConfigs = (props) => {

    const {
        userDetails
    } = props;

    const isLoggedUserAgent = true;

    const [ agentPriceMarkup, setAgentPriceMarkup ] = useState({
        user_id: userDetails?._id,
        property: "price_markup",
        value: 15,
    });
    const [ appConfigs, setAppConfigs ] = useState([
        {
            msg: "",
            color: "skyblue",
            icon: "globe",
            name: "Client App",
            value: ( isLoggedUserAgent ?
                "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com" ://"http://localhost:3001" : 
                "https://welldugo-56d8210b9fe9.herokuapp.com" //"http://www.welldugo.com"
            ),
        },
        {
            msg: "",
            color: "skyblue",
            icon: "server",
            name: "Booking Engine",
            value: ( isLoggedUserAgent ?
                ("https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com/?ngn=1&ag="+userDetails?._id) ://"http://localhost:3001/?ngn=1&ag=" : 
                "https://welldugo-56d8210b9fe9.herokuapp.com" //"http://www.welldugo.com",
            ),
        },
        {
            msg: "Your service plan",
            color: "skyblue",
            icon: "file-signature",
            name: "Service Plan",
            value: "Basic Tier"
        },
    ]);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    useEffect(()=>{
        setCurrentAgentInfo();
    }, []);

    const setCurrentAgentInfo = async () => {
        
        // 1. Agent's Price Markup Percentage
        let pmp_res = await fetchAgentInfoByAgentIdAndPropName(
            agentPriceMarkup?.user_id, 
            agentPriceMarkup?.property
        );
        if(pmp_res?._id){
            setAgentPriceMarkup({
                ...agentPriceMarkup,
                value: pmp_res?.value,
            });
        }

        // 2. Agents Set Data Provder
    }

    const agentPriceMarkupOnchange = (e) => {
        setAgentPriceMarkup({
            ...agentPriceMarkup,
            value: e.target.value
        })
    }

    const agentBookingParametersFormOnSubmit = async () => {
        // 1. Price Markup
        if(!agentPriceMarkup.value) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Please add price markup percentage value",
            });
            return
        }
        let res = await createNewAgentInfo(agentPriceMarkup);
        /*if(!res._id){
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            });
        }*/

        // 2. Data Provider
        //---Here for Data Provider--//

        alert(`Booking parameters modified!`);

    }

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
                                <input onInput={agentPriceMarkupOnchange}
                                        value={agentPriceMarkup?.value}
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
                        {
                            formValidation.isError && <FormErrorCard 
                                message={formValidation.message} 
                                type={formValidation.type}
                            />
                        }
                        <div onClick={agentBookingParametersFormOnSubmit}
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
                                            {each?.name}:
                                        </td>
                                        {
                                            each?.name==="Booking Engine" ?
                                            <td className='tool-tip-parent' style={{textDecoration: "underline", color: "orange"}}>
                                                <p onClick={()=>{
                                                        // Copy the text inside the text field
                                                        navigator.clipboard.writeText(each?.value);
                                                        // Alert the copied text
                                                        console.log("Booking Engine Link Copied: " + each?.value);
                                                        alert("Copied!");
                                                    }}>
                                                    Copy Booking Engine Link
                                                </p>
                                                <div className='tool-tip' style={{color: "black"}}>
                                                    You can share your booking engine or put it on your business website to allow your customers to search on their own.
                                                </div>
                                            </td> :
                                            <td>{each?.value}</td>
                                        }
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
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa-solid fa-file-signature"></i>
            Change Welldugo Contract
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{border: "2px solid lightgreen", backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: "lightgreen"}} className="fa-solid fa-check"></i>
                        Free Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            No Charge</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    400 Customers
                                </span>
                                <span>
                                    You can add up to 400 customers with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    10 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 10 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    1 Data Provider
                                </span>
                                <span>
                                    You can choose only one Data Provider (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: "red"}} className="fa-solid fa-circle-dot"></i>
                        Basic Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            $25/Month</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    5,000 Customers
                                </span>
                                <span>
                                    You can add up to 5,000 customers with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    10 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 10 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    1 Data Provider
                                </span>
                                <span>
                                    You can choose only one Data Provider (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{backgroundColor: "indigo", padding: 20, borderRadius: 10, boxShadow: "1px 2px 3px rgba(0,0,0,0.6)", maxWidth: "33%"}}>
                    <h4 style={{color: "orange"}}>
                        <i style={{marginRight: 20, color: "red"}} className="fa-solid fa-circle-dot"></i>
                        Advanced Tier - <span style={{fontWeight: "initial", fontSize: 13, color: "white"}}>
                            $50/Month</span></h4>
                    <div style={{marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                        <ul style={{paddingLeft: 20}}>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-users"></i>
                                    Unlimited Customers
                                </span>
                                <span>
                                    You can add up to as many customers as possible with this plan
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-gauge-high"></i>
                                    20 Actions Per $1.00
                                </span>
                                <span>
                                    For each dollar amount in your wallet, you get 20 actions (link visits, customer flight/hotel/car searches, etc.)
                                </span>
                            </li>
                            <li style={{fontSize: 13, color: "white", marginBottom: 20, display: "flex"}}>
                                <span style={{whiteSpace: "nowrap", color: "skyblue", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-share-alt"></i>
                                    All Data Providers
                                </span>
                                <span>
                                    You can switch in-between Data Providers (Amadeus, Saber, Travelport, Duffel, etc.) for your booking engine whenever you want and be able to compare prices from different data providers
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 30}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa-solid fa-sliders"></i>
            Service Fees
        </p>
        <div style={{marginBottom: 10}}>
            <p style={{padding: 20, display: "flex", background: "rgba(0,255,0, 0.2)", color: "white", border: "1px dashed lightgreen", fontSize: 13}}>
                <i style={{marginRight: 10, color: "lightgreen"}}
                    className="fa-solid fa-info-circle"></i>
                <span>
                    Services fees allow you to charge customers extra charges at checkout.
                    Please note that extra charges added here should be related to your business operations in order to gain your customer's trust. 
                    You can create, activate, or deactivate your sevice fees using this section.
                </span>
            </p> 
            <div style={{marginTop: 20, display: "flex"}}>
                <div style={{width: "calc(50% - 5px)"}}>
                    <div style={{marginBottom: 10}}>
                        <p style={{color: "orange", fontSize: 13}}>
                            Add New Service</p>
                        <div style={{padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "33%"}}>
                                <p className="regular-font-color-dark-bg" 
                                    style={{fontSize: 13, marginBottom: 5}}>
                                        Product</p>
                                <select style={{padding: "10px 20px", width: "100%", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                                    <option style={{color: "black"}}>
                                        All
                                    </option>
                                    <option style={{color: "black"}}>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{width: "33%"}}>
                                <div style={{display: "flex"}}>
                                    <p className="regular-font-color-dark-bg" 
                                        style={{fontSize: 13, marginBottom: 5}}>
                                        Service Name</p>
                                </div>
                                <input placeholder="enter airport here..."
                                    style={{padding: "10px 20px", width: "100%", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                            </div>
                            <div style={{width: "33%"}}>
                                <div style={{display: "flex"}}>
                                    <p className="regular-font-color-dark-bg" 
                                        style={{fontSize: 13, marginBottom: 5}}>
                                        Price</p>
                                </div>
                                <input readOnly="true" 
                                    placeholder="select dates here..."
                                    style={{padding: "10px 20px", width: "100%", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                            </div>
                        </div>
                        <div className="standard-action-button"
                            style={{fontSize: 14, width: "100%", marginTop: 0, cursor: "pointer"}}>
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-refresh"></i>
                            Save
                        </div>
                    </div>
                    <div style={{paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                        {/**Service Fees List Here */}
                        <div>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)", display: "flex", justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.2)", padding: 20, marginBottom: 10}}>
                                    <p>
                                        <input type="checkbox" 
                                            className="cm-toggle"
                                        />
                                        <span style={{marginLeft: 10, color: "white", fontSize: 13}}>
                                            <label htmlFor="">
                                                Service fee name here
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "yellow", fontSize: 13}}>
                                        $20.00
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)", display: "flex", justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.2)", padding: 20, marginBottom: 10}}>
                                    <p>
                                        <input type="checkbox" 
                                            className="cm-toggle"
                                        />
                                        <span style={{marginLeft: 10, color: "white", fontSize: 13}}>
                                            <label htmlFor="">
                                                Service fee name here
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "yellow", fontSize: 13}}>
                                        $20.00
                                    </p>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>    
        </div>
    </div>
}

export default AgentConfigs;