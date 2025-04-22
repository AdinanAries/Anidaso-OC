
import FormErrorCard from './FormErrorCard';
import { 
    createNewCustomerAppSettings, 
    fetchAllCustomerAppSettings,
    fetchCustomerAppSettingsByPropName,
} from '../services/settingsServices';
import { 
    createNewAgentInfo,
    fetchAgentInfoByAgentIdAndPropName
} from '../services/agentServices';
import {
    reload_business_settings_page_customer_app_preview_iframe
} from '../helpers/helper-functions';
import AirportsData from '../data/Airports';
import CONSTANTS from '../constants/Constants';

import { useEffect, useState } from 'react';

let SettingsContainer = (props) => {

    const {
        userDetails,
    } = props;

    const _appSettingsConstant=CONSTANTS.app_resource_constants.app_settings;
    const _appSettingsViewAction=CONSTANTS.app_resource_can_action_constants.view_app_settings;
    const _appSettingsUpdateAction=CONSTANTS.app_resource_can_action_constants.update_app_ettings;
    const has_access_to_app_settings=(
        userDetails?.resources_can_access_constants?.includes(_appSettingsConstant) &&
        userDetails?.resources_can_access_actions_constants?.includes(_appSettingsViewAction)
    );
    const can_update_app_settings=(userDetails?.resources_can_access_actions_constants?.includes(_appSettingsUpdateAction));

    const user_role_const = userDetails?.role_info?.constant;
    let isLoggedUserOwner = (user_role_const===CONSTANTS.app_role_constants.owner);
    let isLoggedUserAdmin = (user_role_const===CONSTANTS.app_role_constants.admin);
    let isLoggedUserAgent = (user_role_const===CONSTANTS.app_role_constants.agent);

    const SETTINGS_SVR = {
        customer_app_server: 0,
        oc_server: 1
    }

    const VALUE_FLD_TYPES = {
        number: "number",
        text: "text",
        select: "select"
    };

    const SETTINGS_PROPS_NAMES = [
        {
            name: "Price Markup (%)",
            value: "price_markup",
            server: SETTINGS_SVR.customer_app_server,
            value_fld_type: VALUE_FLD_TYPES.number,
        },
        {
            name: "Client Application Environment",
            value: "client_app_env",
            server: SETTINGS_SVR.customer_app_server,
            value_fld_type: VALUE_FLD_TYPES.select,
            options: [
                {
                    o_name: "Production",
                    o_value: "production"
                },
                {
                    o_name: "Test",
                    o_value: "test"
                }
            ]
        },
        {
            name: "Flights Data Provider",
            value: "flights_data_provider",
            server: SETTINGS_SVR.customer_app_server,
            value_fld_type: VALUE_FLD_TYPES.select,
            options: [
                {
                    o_name: "Duffel",
                    o_value: "duffel"
                },
                {
                    o_name: "OTA",
                    o_value: "ota"
                }
            ]
        }

        /* Others here */
    ];

    const [ formData, setFormData ] = useState({
        property: SETTINGS_PROPS_NAMES[0]?.value,
        value: ""
    });

    // Search Link State
    const [ searchLink, setSearchLink ] = useState({
        product: 0,
        type: "one-way",
        date: "",
        dpt_airport: "",
        dst_airport: "",
        cabin: "ECONOMY",
        adults: 1,
        children: 0,
        infants: 0
    });

    const [ searchLinkAirportsAutoCompleteShowing, setSearchLinkAirportsAutoCompleteShowing ] = useState(false);
    const [ searchLinkAirportsAutoCompleteAirportList, setSearchLinkAirportsAutoCompleteAirportList ] = useState([]);
    const [ appConfigs, setAppConfigs ] = useState([
        {
            name: "Client App Url",
            value: "https://welldugo-56d8210b9fe9.herokuapp.com",//"http://www.welldugo.com"
        },
        {
            name: "Agent Client App Url",
            value: "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com",
        },
        {
            name: "Client App Url",
            value: "http:www.welldugo.com"
        },
    ]);

    const [ agentPriceMarkup, setAgentPriceMarkup ] = useState({
        user_id: userDetails?._id,
        property: "price_markup",
        value: 15,
    });

    const search_link_client_app_url = isLoggedUserAgent ? 
    appConfigs[1].value : appConfigs[0].value;

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
        if(!res._id){
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            });
        }

        // 2. Data Provider
        //---Here for Data Provider--//

        alert(`Booking parameters modified!`);
        setTimeout(()=>{
            reload_business_settings_page_customer_app_preview_iframe();
        }, 300);

    }
    
    const slAirportsAutoCompleteOnInput = (evnt) => {
        let counter = 0;
        let airports = [];

        if(evnt.target.value){
            let elem_value = evnt.target.value;
            airports = AirportsData.filter(each => {
                return (
                each.city.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", "")) 
                || each.name.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || each.IATA.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || each.country.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.city + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.city + each.country + each.name + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.country + each.city + each.name + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.name + each.city + each.country + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.name + each.IATA + each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.IATA + each.name + each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.IATA + each.city + each.name + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.IATA + each.city + each.country + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                || (each.IATA + each.country + each.city + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
                )
            });

            airports = airports.map(elem => {
                    counter++;
                    let iata = elem?.IATA ? elem?.IATA : elem?.ICAO
                    return (counter < 6) && <li onClick={()=>searchLinkAirportsAutocompleteSelectAirport(iata)} style={{padding: 10, border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer"}}>
                    <div style={{display: "flex"}}>
                        <p style={{marginRight: 10}}>
                            <i className="fa-solid fa-plane" style={{color: "orange"}}></i>
                        </p>
                        <p>
                            {iata} - {elem.name.trim()}, {elem.city}, {elem.country}
                        </p>
                    </div>
                </li>
            });

            setSearchLinkAirportsAutoCompleteAirportList(airports);
        }
    }

    const toggleShowSearchLinkAirportsAutocomplete = (boolean_show, which) => {
        setSearchLinkAirportsAutoCompleteShowing(boolean_show);
        window.__searchLinkAirportsAutocompleteWhich=which || "";
    }
    window.__toggleShowSearchLinkAirportsAutocomplete = toggleShowSearchLinkAirportsAutocomplete;

    const searchLinkAirportsAutocompleteSelectAirport = (value) => {
        let sl_val_obj = {};
        if(window.__searchLinkAirportsAutocompleteWhich==="departure"){
            sl_val_obj.dpt_airport=value
        }
        if(window.__searchLinkAirportsAutocompleteWhich==="destination"){
            sl_val_obj.dst_airport=value
        }
       window.__toggleShowSearchLinkAirportsAutocomplete(false);
        setSearchLink({
            ...searchLink,
            ...sl_val_obj,
        });
    }

    const slProductOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            product: e.target.value,
        });
    }

    const slTypeOnChange = (e) => {
        let val = e.target.value;
        setSearchLink({
            ...searchLink,
            type: val,
            date: "",
        });
        let isSingleDatePicker = (val==="one-way")
        setTimeout(()=>{
            window.__initCreateSearchLinkDateInput(isSingleDatePicker);
        }, 100);
        
    }

    const slDateOnChange = (date_string) => {
        setSearchLink({
            ...searchLink,
            date: date_string,
        });
    }
    window.__slDateOnChange = slDateOnChange;

    const slDepartureOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            dpt_airport: e.target.value,
        });
    }

    const slDestinationOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            dst_airport: e.target.value,
        });
    }
    
    const slCabinOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            cabin: e.target.value,
        });
    }

    const slAdultsOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            adults: e.target.value,
        });
    }

    const slChildrenOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            children: e.target.value,
        });
    }

    const slInfantsOnChange = (e) => {
        setSearchLink({
            ...searchLink,
            infants: e.target.value,
        });
    }

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const [ valueFieldType, setValueFieldType ] = useState("");

    useEffect(()=>{
        setFieldType(SETTINGS_PROPS_NAMES[0]?.value);
        if(!isLoggedUserAgent)
            setCurrentFormData(SETTINGS_PROPS_NAMES[0]?.value);
        if(isLoggedUserAgent)
            setCurrentAgentInfo();
    }, []);

    const setCurrentFormData = async (settings_prop) => {
        const SVR = SETTINGS_PROPS_NAMES.filter(each => each.value===settings_prop)[0].server;
        let res = [];
        if (SVR===SETTINGS_SVR.customer_app_server){
            res = await fetchCustomerAppSettingsByPropName(settings_prop);
        } else {
            res = []// OC server Function Call Here;
        }
        if(res[0]?._id){
            setFormData({
                property: settings_prop,
                value: res[0]?.value,
            });
        }
    }

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

    const setFieldType = (settings_prop) => {
        const fld_type = SETTINGS_PROPS_NAMES.filter(each => each.value===settings_prop)[0]?.value_fld_type;
        setValueFieldType(fld_type);
    }

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
    }

    const onChangePropertyFld = (e) => {
        resetFormValidation();
        let val = e.target.value;
        setFormData({
            ...formData,
            property: val,
        });
        setFieldType(val);
        setCurrentFormData(val);
    }
    
    const onChangeValueFld = (e) => {
        resetFormValidation();
        let val = e.target.value;
        setFormData({
            ...formData,
            value: val,
        });
    }

    const addSettingsOnSubmit = async () => {

        if(!formData.property) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Settings property is required",
            });
            return
        }
        if(!formData.value) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "New settings value is required",
            });
            return
        }
        if(
            formData.property===SETTINGS_PROPS_NAMES[0].value
            && formData.value < 1
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Price markup percentage must be at least 1%",
            });
            return
        }

        const SVR = SETTINGS_PROPS_NAMES.filter(each => each.value===formData.property)[0].server;

        let res = {};
        if (SVR===SETTINGS_SVR.customer_app_server){
            res = await createNewCustomerAppSettings(formData);
        } else {
            res = {}// OC server Function Call Here;
        }
        if(res._id){
            alert(`Settings ${res.property} created/modified`);
            setTimeout(()=>{
                reload_business_settings_page_customer_app_preview_iframe();
            }, 300);
            
        }else{
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            });
            setTimeout(()=>{
                reload_business_settings_page_customer_app_preview_iframe();
            }, 300);
        }
    }

    {/*onChange={slDateOnChange}*/}

    return(
         <section id="settings-container" style={{display: "none"}}>
            <p style={{marginTop: 10, color: "red", fontSize: 13}}>
                <i style={{color: "yellow", marginRight: 10}} className={'fa-solid fa-'+(isLoggedUserAgent ? "toolbox" : "cogs")}></i>
                {isLoggedUserAgent ? "Booking Parameters" : "Application Settings"}</p>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    isLoggedUserAgent ? <div style={{width: "calc(50% - 4px)"}}>
                        <div style={{marginBottom: 5, marginTop: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-percent" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Price Markup (%)</p>
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
                                        <option style={{color: "black"}} value="">Duffel</option>
                                </select>
                            </div>
                        </div>
                        <div onClick={agentBookingParametersFormOnSubmit} 
                            style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                            Save
                        </div>
                    </div> :
                    has_access_to_app_settings && 
                    <div style={{width: "calc(50% - 4px)"}}>
                        <div style={{padding: "10px"}}>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-tools" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Please Select Settings Type</p>
                                <div style={{border: "none"}}>
                                    <select 
                                        onChange={onChangePropertyFld}
                                        value={formData.property}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        {
                                            SETTINGS_PROPS_NAMES.map(each =>
                                                <option style={{color: "black"}} value={each.value} >
                                                    {each.name}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa-solid fa-keyboard" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Value</p>
                                <div style={{border: "none"}}>
                                    {
                                        (valueFieldType===VALUE_FLD_TYPES.select) &&
                                        <select 
                                            onInput={onChangeValueFld}
                                            value={formData.value}
                                            style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                            {
                                                SETTINGS_PROPS_NAMES.filter(each => each.value===formData.property)[0]?.options?.map(each =>
                                                    <option style={{color: "black"}} value={each.o_value} >
                                                        {each.o_name}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    }
                                    {
                                        (valueFieldType!==VALUE_FLD_TYPES.select) &&
                                        <input 
                                            onInput={onChangeValueFld}
                                            value={formData.value}
                                            type={valueFieldType} placeholder="enter value here..."
                                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                                    }
                                </div>
                            </div>
                            {
                                formValidation.isError && <FormErrorCard 
                                    message={formValidation.message} 
                                    type={formValidation.type}
                                />
                            }
                            <div>
                                {
                                    can_update_app_settings ?
                                    <div onClick={addSettingsOnSubmit} style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                                        <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                                        Save
                                    </div> : <div style={{backgroundColor: "rgba(255,0,0,0.3)", padding: 20, color: "white", fontSize: 12, textAlign: "center"}}>
                                        <i style={{marginRight: 10, color: "orange"}} 
                                            className='fa-solid fa-exclamation-triangle'></i>
                                        Saving app settings is disabled on your user role.
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div style={{width: "calc(50% - 4px)", borderRadius: 8, padding: 10, backgroundColor: "rgb(49, 30, 53)", marginTop: 5}}>
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
                                                <i style={{color: "red", marginRight: 10, cursor: "pointer"}}
                                                    className='fa-solid fa-lock'></i>
                                                <span style={{color: "black"}}
                                                     className='tool-tip'>
                                                        Your privileges doesn't permit to change this configuration</span>
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
            <div>
                <div style={{marginTop: 10}}>
                    <p style={{color: "red", marginBottom: 10, fontSize: 13}}>
                        <i style={{color: "yellow", marginRight: 10}} className='fa-solid fa-link'></i>
                        Create Search Link:
                    </p>
                    <div style={{padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 5}}>
                        <p style={{fontSize: 12, color: "white"}}>
                            Product: <select onChange={slProductOnChange}
                                value={searchLink.product}
                                style={{background: "none", color: "lightgreen", border: "none", marginRight: 10, textAlign: "center", 
                                borderBottom: "2px solid " + (searchLink.type ? "lightgreen" : "red")}}>
                                <option style={{color: "black"}} value="0">Flights (0)</option>
                                <option style={{color: "black"}} value="1">Hotels (1)</option>
                                <option style={{color: "black"}} value="2">Cars (2)</option>
                            </select>
                            Type: <select onChange={slTypeOnChange} 
                                value={searchLink.type}
                                style={{background: "none", color: "lightgreen", border: "none", marginRight: 10, textAlign: "center", 
                                borderBottom: "2px solid " + (searchLink.type ? "lightgreen" : "red")}}>
                                <option style={{color: "black"}} value="one-way">One Way</option>
                                <option style={{color: "black"}} value="round-trip">Round Trip</option>
                            </select>
                            Dates: {(!searchLink.date ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input id="create_search_link_date_input"
                                value={searchLink.date}
                                placeholder="Select Date"
                                style={{background: "none", color: "lightgreen", border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.date ? "lightgreen" : "red")}} 
                                type="text"/>
                            <span style={{position: "relative"}}>
                                Departure: {(!searchLink.dpt_airport ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                    <input readOnly onClick={(e)=>toggleShowSearchLinkAirportsAutocomplete(true, "departure")} 
                                        onChange={slDepartureOnChange}
                                    value={searchLink.dpt_airport}
                                    style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                        borderBottom: "2px solid " + (searchLink.dpt_airport ? "lightgreen" : "red")}} 
                                    type="text"/>
                                Destination: {(!searchLink.dst_airport ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                    <input readOnly onClick={()=>toggleShowSearchLinkAirportsAutocomplete(true, "destination")}
                                        onChange={slDestinationOnChange}
                                    value={searchLink.dst_airport}
                                    style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                        borderBottom: "2px solid " + (searchLink.dst_airport ? "lightgreen" : "red")}} 
                                    type="text"/>
                                {
                                    searchLinkAirportsAutoCompleteShowing && <div style={{
                                            position: "absolute", background: "white", color: "black", width: "calc(100% + 100px)", left: -50, top: 0, borderRadius: 8, boxShadow: "0 0 20px yellow"}}>
                                        <div style={{padding: 10,}}>
                                            <p onClick={()=>toggleShowSearchLinkAirportsAutocomplete(false)} 
                                                style={{cursor: "pointer", color: "red", position: "absolute", padding: 10, right: 5, top: 0, fontSize: 15}}>
                                                <i className='fa-solid fa-times'></i> 
                                            </p>
                                            <p style={{marginBottom: 10, fontWeight: "bolder"}}>
                                                <i style={{color: "orange", marginRight: 10}}
                                                className="fa-solid fa-map-marker"></i>
                                                Search Airport</p>
                                            <input onInput={slAirportsAutoCompleteOnInput}
                                                style={{width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "none",
                                                        borderBottom: "2px solid orange"}} 
                                                type="text" placeholder="Enter Airport"/>
                                            <ul style={{marginTop: 10}}>
                                                {searchLinkAirportsAutoCompleteAirportList.map(each=>each)}
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </span>
                            Cabin: <select onChange={slCabinOnChange}
                                value={searchLink.cabin}
                                style={{background: "none", color: "lightgreen", border: "none", marginRight: 10, textAlign: "center", borderBottom: "2px solid lightgreen"}}>
                                <option style={{color: "black"}} value="ECONOMY">Economy</option>
                                <option style={{color: "black"}} value="PREMIUM">Premium</option>
                                <option style={{color: "black"}} value="BUSINESS">Business</option>
                                <option style={{color: "black"}} value="FIRST">First</option>
                            </select>
                            Adults: {(searchLink.adults==="" ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input onChange={slAdultsOnChange}
                                value={searchLink.adults}
                                style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.adults==="" ? "red" : "lightgreen")}} 
                                type="number"/>
                            Children: {(searchLink.children==="" ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input onChange={slChildrenOnChange}
                                value={searchLink.children}
                                style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.children==="" ? "red" : "lightgreen")}} 
                            type="number"/>
                            Infants: {(searchLink.infants==="" ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input onChange={slInfantsOnChange}
                                value={searchLink.infants}
                                style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.infants==="" ? "red" : "lightgreen")}} 
                                type="number" />
                        </p>
                    </div>
                    <div style={{display: "flex", borderRadius: 8, justifyContent: "space-between", width: "100%", overflow: "hidden", border: "1px solid red"}}>
                        <p id="searchLinkAddressTextToCopy" style={{padding: 10, width: "calc(100% - 40px)", fontSize: 13, width: "100%", color: "white"}}>
                            {search_link_client_app_url}/?product=<span style={{color: "lightgreen"}}>
                                {searchLink.product}</span>
                            &type=<span style={{color: "lightgreen"}}>
                                {searchLink.type}</span>
                            &date=<span style={{color: "lightgreen"}}>
                                {searchLink.date}</span>
                            &dpt_airport=<span style={{color: "lightgreen"}}>
                                {searchLink.dpt_airport}</span>
                            &dst_airport=<span style={{color: "lightgreen"}}>
                                {searchLink.dst_airport}</span>
                            &cabin=<span style={{color: "lightgreen"}}>
                                {searchLink.cabin}</span>
                            &adults=<span style={{color: "lightgreen"}}>
                                {searchLink.adults}</span>
                            &children=<span style={{color: "lightgreen"}}>
                                {searchLink.children}</span>
                            &infants=<span style={{color: "lightgreen"}}>
                                {searchLink.infants}</span>
                        </p>
                        <div onClick={()=>{

                                // Validation
                                if(
                                searchLink.product==="" ||
                                !searchLink.type ||
                                !searchLink.date ||
                                !searchLink.dpt_airport ||
                                !searchLink.dst_airport ||
                                !searchLink.cabin ||
                                searchLink.adults==="" ||
                                searchLink.children==="" ||
                                searchLink.infants===""){
                                    alert("Error! Link Not Copied. Some values are missing.");
                                    return;
                                }

                                let elem = document.getElementById("searchLinkAddressTextToCopy");
                                // Copy the text inside the text field
                                navigator.clipboard.writeText(elem.innerText);
                                // Alert the copied text
                                console.log("Copied the text: " + elem.innerText);
                                alert("Copied!");
                            }} 
                            style={{cursor: "pointer", display: "flex", alignItems: "center", width: 40, backgroundColor: "yellow", justifyContent: "center"}}>
                            <i className="fa-solid fa-copy"></i>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 20}}>
                    <p style={{color: "white", fontSize: 13, margin: 10}}>
                        Send Search Link</p>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "calc(50% - 4px)", borderRadius: 8, backgroundColor: "rgb(43, 52, 61)", padding: 10}}>
                            <p style={{backgroundColor: "rgba(0,0,0,0.2)", padding: 10, fontSize: 12}}>
                                <i style={{color: "lightgreen", marginRight: 10}}
                                    className='fa-solid fa-search'></i>
                                <input 
                                    style={{background: "none", color: "white", border: "none", width: "calc(100% - 40px)"}}
                                    placeholder="Search customer here"
                                />
                            </p>
                            <div style={{marginTop: 2, borderTop: "1px dashed rgba(0,0,0,0.5)"}}>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 5}}>
                                <div className='prev-next-btn inactive'>
                                    <i className='fa-solid fa-angle-left'></i></div>
                                <div>1</div>
                                <div className='prev-next-btn inactive'>
                                    <i className='fa-solid fa-angle-right'></i></div>
                            </div>
                        </div>
                        <div style={{width: "calc(50% - 4px)"}}>
                            <div style={{padding: 20, borderRadius: 8, backgroundColor: "rgba(0,255,0,0.1)", marginBottom: 10}}>
                                <p style={{color: "white", fontSize: 13, display: "flex"}}>
                                    <i style={{color: "lightgreen", marginRight: 10}} className='fa-solid fa-info-circle'></i>
                                    <span>
                                        To send the search link to a customer, you must select a customer on the left side or enter customer email below or create new customer
                                    </span>  
                                </p>
                                <p style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                                    <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                                    Create New Customer
                                </p>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Customer Email</p>
                                <div style={{border: "none"}}>
                                    <input
                                        type="email" placeholder="type here..."
                                        style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                                </div>
                            </div>
                            <div style={{cursor: "pointer", backgroundColor: "yellow", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                                <i style={{marginRight: 10, fontSize: 14}} className="fa fa-check-square-o"></i>
                                Send Link
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div>
                <p style={{color: "red", marginTop: 30, marginBottom: 10, fontSize: 13}}>
                    <i style={{color: "yellow", marginRight: 10}} className='fa-solid fa-eye'></i>
                    Preview - Customer App
                </p>
                <iframe id="business-settings-page-customer-app-preview-iframe" style={{width: "100%", height: 1000, border: "3px dashed red", borderRadius: 8}} 
                    src={
                        `${search_link_client_app_url}/?product=${searchLink.product}&type=${searchLink.type}&date=${searchLink.date}&dpt_airport=${searchLink.dpt_airport}&dst_airport=${searchLink.dst_airport}&cabin=${searchLink.cabin}&adults=${searchLink.adults}&children=${searchLink.children}&infants=${searchLink.infants}`
                    } title="description"></iframe>
             </div>
        </section>
    )
}

export default SettingsContainer;