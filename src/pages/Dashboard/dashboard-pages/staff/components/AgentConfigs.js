import { useEffect, useState } from "react";
import { 
    fetchAgentInfoByAgentIdAndPropName,
    createNewAgentInfo,
} from "../../../../../services/agentServices";
import FormErrorCard from "../../../../../components/FormErrorCard";
import AgentServiceFees from "./AgentServiceFees";
import AgentServiceContract from "./AgentServiceContract";

const AgentConfigs = (props) => {

    const {
        userDetails,
        servicePlanTiersList
    } = props;

    const isLoggedUserAgent = true; // Assuming only Agents have Info on this page

    let current_service_plan = servicePlanTiersList.find(each=>each?.constant===1);
    if(isLoggedUserAgent){
        let agent_info = userDetails?.agent_info;
        let sp_obj = agent_info?.find(each=>each.property==="service_plan");
        if(sp_obj?.value){
            current_service_plan = servicePlanTiersList.find(each=>each?.constant===parseInt(sp_obj?.value));
        }
    }

    const __PROFIT_TYPE_PROP_KEY="profit_type";
    const __PROFIT_TYPES = {
        percentage: "price_markup",
        flat_rate: "flat_rate",
        data_provider: "data_provider",
    };
    const AGENT_WEBSITE_URL = (userDetails?.website_url || "N/A");
    const [ profitType, setProfitType ] = useState(__PROFIT_TYPES?.percentage);
    const [ agentPriceMarkup, setAgentPriceMarkup ] = useState({
        user_id: userDetails?._id,
        property: __PROFIT_TYPES?.percentage,
        value: 15,
    });
    const [ agentFlatRate, setAgentFlatRate ] = useState({
        user_id: userDetails?._id,
        property: __PROFIT_TYPES?.flat_rate,
        value: 0,
    });
    const [ agentDataProvider, setAgentDataProvider ] = useState({
        user_id: userDetails?._id,
        property: __PROFIT_TYPES?.data_provider,
        value: 'duffel',
    });
    const [ appConfigs, setAppConfigs ] = useState([
        {
            msg: "",
            color: "skyblue",
            icon: "globe",
            name: "Website Url",
            value: ( isLoggedUserAgent ?
                AGENT_WEBSITE_URL ://"http://localhost:3001" : 
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
            value: current_service_plan?.name,
        },
    ]);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
    }

    useEffect(()=>{
        setCurrentAgentInfo();
    }, []);

    const setCurrentAgentInfo = async () => {

        // 1. Agent's Profit Type
        let pt_res = await fetchAgentInfoByAgentIdAndPropName(
            userDetails?._id, 
            __PROFIT_TYPE_PROP_KEY
        );
        if(pt_res?._id){
            setProfitType(pt_res?.value);
        }
        
        // 2. Agent's Price Markup Percentage
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

        // 3. Agent's Flat Rate Profit
        let flp_res = await fetchAgentInfoByAgentIdAndPropName(
            agentFlatRate?.user_id, 
            agentFlatRate?.property
        );
        if(flp_res?._id){
            setAgentFlatRate({
                ...agentFlatRate,
                value: flp_res?.value,
            });
        }

        // 4. Agents Set Data Provder
        let dp_res = await fetchAgentInfoByAgentIdAndPropName(
            agentDataProvider?.user_id, 
            agentDataProvider?.property
        );
        if(dp_res?._id){
            setAgentDataProvider({
                ...agentDataProvider,
                value: dp_res?.value,
            });
        }
    }

    const agentPriceMarkupOnchange = (e) => {
        resetFormValidation();
        setAgentPriceMarkup({
            ...agentPriceMarkup,
            value: e.target.value
        })
    }

    const agentFlatRateOnchange = (e) => {
        resetFormValidation();
        setAgentFlatRate({
            ...agentFlatRate,
            value: e.target.value
        })
    }

    const agentDataProviderOnchange = (e) => {
        resetFormValidation();
        setAgentDataProvider({
            ...agentDataProvider,
            value: e.target.value
        })
    }

    const agentBookingParametersFormOnSubmit = async () => {
        
        if(!agentPriceMarkup.value && profitType===__PROFIT_TYPES?.percentage) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Percentage must be provided and above 0",
            });
            return
        }

        if(!agentFlatRate.value && profitType===__PROFIT_TYPES?.flat_rate) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Flat rate value must be provided and above 0",
            });
            return
        }

        if(!agentDataProvider?.value){
            setFormValidation({
                type: "error",
                isError: true,
                message: "Data provider must field is required",
            });
            return;
        }

        // 1. Saving Current Profit Type
        let pt_res = await createNewAgentInfo({
            user_id: userDetails?._id,
            property: __PROFIT_TYPE_PROP_KEY,
            value: profitType,
        });

        // 2. Saving Current Price Markup
        let pmp_res = await createNewAgentInfo(agentPriceMarkup);

        // 3. Saving Current Flat Rate Profit
        let flp_res = await createNewAgentInfo(agentFlatRate);

        // 4. Data Provider
        let dp_res = await createNewAgentInfo(agentDataProvider);

        alert(`Booking parameters modified!`);

    }

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-tools"></i>
            General Settings
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 4px)"}}>
                    <p style={{color: "yellow", fontSize: 13, marginBottom: 10, marginLeft: 20}}>
                        Price bound profit:</p>
                    {
                        profitType===__PROFIT_TYPES?.percentage &&
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-percent" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Enter Price Markup (%)
                                <span onClick={()=>setProfitType(__PROFIT_TYPES?.flat_rate)} style={{marginLeft: 20, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                                    Change To Flat Rate</span></p>
                            <div style={{border: "none"}}>
                                <input onInput={agentPriceMarkupOnchange}
                                        value={agentPriceMarkup?.value}
                                    type="number" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                    }
                    {
                        profitType===__PROFIT_TYPES?.flat_rate &&
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-file-invoice-dollar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Enter Flat Rate Charge ($)
                                <span onClick={()=>setProfitType(__PROFIT_TYPES?.percentage)} style={{marginLeft: 20, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                                    Change To Percentage (%)</span></p>
                            <div style={{border: "none"}}>
                                <input onInput={agentFlatRateOnchange}
                                        value={agentFlatRate?.value}
                                    type="number" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                    }
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-share-alt" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Data Supplier</p>
                        <div style={{border: "none"}}>
                            <select onInput={agentDataProviderOnchange}
                                value={agentDataProvider?.value}
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
        <AgentServiceContract 
            userDetails={userDetails}
        />
        <AgentServiceFees
            userDetails={userDetails}
        />
    </div>
}

export default AgentConfigs;