import { useState } from "react";
import { createNewCustomer } from "../services/customerServices";
import FormErrorCard from "./FormErrorCard";

const CustomerForm = (props) => {

    const {
        showFull,
        userDetails,
        successCallBack,
        currentCustomer,
        onCancelButtonFunc,
    } = props;

    const [ isLoading, setIsLoading ] = useState(false);
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

    let __INIT_CUST_OBJ={
        oc_user_id: userDetails?._id,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
    };

    if(currentCustomer){
        __INIT_CUST_OBJ=currentCustomer;
    }

    const [ isExtendedForm, setIsExtendedForm ] = useState(showFull);
    const [ formData, setformData ] = useState(__INIT_CUST_OBJ);

    const firstNameOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            first_name: e.target.value
        });
    }

    const lastNameOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            last_name: e.target.value
        });
    }

    const emailOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            email: e.target.value
        });
    }

    const phoneOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            phone: e.target.value
        });
    }
    
    const dobOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            dob: e.target.value
        });
    }
    
    const genderOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            gender: e.target.value
        });
    }

    const addressOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            address: e.target.value
        });
    }

    const cityOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            city: e.target.value
        });
    }

    const stateOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            state: e.target.value
        });
    }

    const countryOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            country: e.target.value
        });
    }

    const zipCodeOnInput = (e) => {
        resetFormValidation();
        setformData({
            ...formData,
            zip_code: e.target.value
        });
    }

    const formOnSubmit = async () => {
        setIsLoading(true);
        if(
            !formData.email ||
            !formData.first_name ||
            !formData.last_name
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "First and last name and email fields are required",
            });
            setIsLoading(false);
            return
        }

        let __res = await createNewCustomer(formData);
        if(__res?._id){
            successCallBack();
            setIsLoading(false);
            if(currentCustomer?._id){
                onCancelButtonFunc({});
            }else{
                setformData(__INIT_CUST_OBJ);
            }
            
        }else{
            setFormValidation({
                type: "error",
                isError: true,
                message: __res?.message,
            });
            setIsLoading(false);
        }
    }

    return <div>
        {
            currentCustomer?._id ? 
            <p className="title-font-color-default" style={{color: "orange", fontSize: 12, marginBottom: 10}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-pencil"></i>
                Edit Customer
            </p> :
            <p className="title-font-color-default" style={{color: "orange", fontSize: 12, marginBottom: 10}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa fa-user-plus"></i>
                Create Customer
            </p>
        }
        {
            isLoading ?
            <div style={{padding: "40px 20px", backgroundColor: "rgba(0,255,255,0.1)", marginTop: 20, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <i style={{color: "orange", marginRight: 10}} className="fa fa-spinner"></i>
                <p style={{color: "white", fontSize: 14,}}>Logging in... Please wait...</p>
            </div> :
            <>
                {
                    !isExtendedForm &&
                    <div style={{padding: 20, borderRadius: 8, backgroundColor: "rgba(0,255,0,0.1)", marginBottom: 10}}>
                        <p style={{color: "white", fontSize: 13, display: "flex"}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className='fa-solid fa-info-circle'></i>
                            <span>
                                You may create a customer with extended form in order to collect more information about your customer
                            </span>  
                        </p>
                        <p onClick={()=>setIsExtendedForm(true)}
                            style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                            <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-address-card'></i>
                            Open Extended Form
                        </p>
                    </div>
                }
                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                        <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                        First Name</p>
                    <div style={{border: "none"}}>
                        <input onInput={firstNameOnInput}
                            value={formData?.first_name}
                            type="text" placeholder="type here..."
                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                    </div>
                </div>
                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                        <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                        Last Name</p>
                    <div style={{border: "none"}}>
                        <input onInput={lastNameOnInput}
                            value={formData?.last_name}
                            type="text" placeholder="type here..."
                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                    </div>
                </div>
                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                        <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                        Email</p>
                    <div style={{border: "none"}}>
                        <input onInput={emailOnInput}
                            value={formData?.email}
                            type="email" placeholder="type here..."
                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                    </div>
                </div>
                {
                    isExtendedForm &&
                    <>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-mobile" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Phone</p>
                            <div style={{border: "none"}}>
                                <input onInput={phoneOnInput}
                                    value={formData?.phone}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                DOB</p>
                            <div style={{border: "none"}}>
                                <input onInput={dobOnInput}
                                    value={formData?.dob}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-person-half-dress" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Gender</p>
                            <select 
                                onInput={genderOnInput}
                                value={formData?.gender}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                    <option style={{color: "black"}} value="">Choose Gender</option>
                                    <option style={{color: "black"}} value="male">Male</option>
                                    <option style={{color: "black"}} value="female">Female</option>
                                    <option style={{color: "black"}} value="other">Other</option>
                            </select>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Address</p>
                            <div style={{border: "none"}}>
                                <input onInput={addressOnInput}
                                    value={formData?.address}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-city" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                City</p>
                            <div style={{border: "none"}}>
                                <input onInput={cityOnInput}
                                    value={formData?.city}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-city" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                State</p>
                            <div style={{border: "none"}}>
                                <input onInput={stateOnInput}
                                    value={formData?.state}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-globe" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Country</p>
                            <div style={{border: "none"}}>
                                <input onInput={countryOnInput}
                                    value={formData?.country}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-city" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Zip Code</p>
                            <div style={{border: "none"}}>
                                <input onInput={zipCodeOnInput}
                                    value={formData?.zip_code}
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                    </>
                }
                {
                    formValidation.isError && <FormErrorCard 
                        message={formValidation.message} 
                        type={formValidation.type}
                    />
                }
                <div style={{display: currentCustomer?._id ? "flex" : "block", justifyContent: "space-between", }}>
                    <div onClick={formOnSubmit} 
                        className="standard-action-button" style={{marginTop: 10}}>
                        <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-floppy-disk"></i>
                        Save
                    </div>
                    {
                        currentCustomer?._id &&
                        <div onClick={()=>onCancelButtonFunc({})} 
                            className="standard-action-button" style={{marginTop: 10, backgroundColor: "crimson"}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-times"></i>
                            Cancel
                        </div>
                    }
                </div>
            </>
        }
    </div>
}

export default CustomerForm;