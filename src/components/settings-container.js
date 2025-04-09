
import PageNA from './page-not-available';
import FormErrorCard from './FormErrorCard';
import { 
    createNewCustomerAppSettings, 
    fetchAllCustomerAppSettings,
    fetchCustomerAppSettingsByPropName,
} from '../services/settingsServices';

import { useEffect, useState } from 'react';

let SettingsContainer = ()=>{

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
        dpt_airport: "LGA",
        dst_airport: "LHR",
        cabin: "ECONOMY",
        adults: 1,
        children: 0,
        infants: 0
    });
    
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
        setCurrentFormData(SETTINGS_PROPS_NAMES[0]?.value);
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
            alert(`New Settings ${res.property} has been created`);
        }else{
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            })
        }
    }

    {/*onChange={slDateOnChange}*/}

    return(
         <section id="settings-container" style={{display: "none"}}>
            <div>
                <div style={{padding: "10px",}}>
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
                        <div onClick={addSettingsOnSubmit} style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                            Save
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
                            Departure: {(!searchLink.dpt_airport ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input onChange={slDepartureOnChange}
                                value={searchLink.dpt_airport}
                                style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.dpt_airport ? "lightgreen" : "red")}} 
                                type="text"/>
                            Destination: {(!searchLink.dst_airport ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                <input onChange={slDestinationOnChange}
                                value={searchLink.dst_airport}
                                style={{background: "none", color: "lightgreen", width: 40, border: "none", marginRight: 10, textAlign: "center", 
                                    borderBottom: "2px solid " + (searchLink.dst_airport ? "lightgreen" : "red")}} 
                                type="text"/>
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
                            http://www.welldugo.com/?product=<span style={{color: "lightgreen"}}>
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
                                let elem = document.getElementById("searchLinkAddressTextToCopy");
                                // Copy the text inside the text field
                                navigator.clipboard.writeText(elem.innerText);
                                // Alert the copied text
                                console.log("Copied the text: " + elem.innerText);
                                alert("Link Copied");
                            }} 
                            style={{cursor: "pointer", display: "flex", alignItems: "center", width: 40, backgroundColor: "yellow", justifyContent: "center"}}>
                            <i className="fa-solid fa-copy"></i>
                        </div>
                    </div>
                </div>
            </div>
             {/*<PageNA />*/}
        </section>
    )
}

export default SettingsContainer;