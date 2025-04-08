
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
                    <textarea style={{padding: 10, borderRadius: 8, border: "1px solid red", background: "none",
                        width: "100%", color: "white"}}>
                        http://www.welldugo.com/?product=0&type=one-way&date=2024-12-05&dpt_airport=LGA&dst_airport=LHR&cabin=ECONOMY&adults=1&children=0&infants=0
                    </textarea>
                </div>
            </div>
             {/*<PageNA />*/}
        </section>
    )
}

export default SettingsContainer;