
import PageNA from './page-not-available';
import FormErrorCard from './FormErrorCard';
import { createNewCustomerAppSettings } from '../services/settingsServices';

import { useState } from 'react';

let SettingsContainer = ()=>{
    const [formData, setFormData] = useState({
        property: "price_markup",
        value: ""
    });

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

    const onChangePropertyFld = (e) => {
        resetFormValidation();
        let val = e.target.value;
        setFormData({
            ...formData,
            property: val,
        });
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
        let res = await createNewCustomerAppSettings(formData);
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
                                <option value="price_markup" >
                                    Price Markup
                                </option>
                            </select>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa-solid fa-keyboard" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Value</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={onChangeValueFld}
                                value={formData.value}
                                type="number" placeholder="enter value here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
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
                            Create User
                        </div>
                    </div>
                </div>
            </div>
             {/*<PageNA />*/}
        </section>
    )
}

export default SettingsContainer;