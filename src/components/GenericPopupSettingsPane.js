import { useEffect, useState } from "react";
import { 
    fetchAgentInfoByAgentIdAndPropName,
    createNewAgentInfo,
} from "../services/agentServices";
import FormErrorCard from "./FormErrorCard";

const GenericPopupSettingsPane = (props) => {

    const {
        userDetails,
        name,
        closeFunc,
    } = props;

    const __SETTINGS_TYPES = {
        percentage: "price_markup",
        flat_rate: "flat_rate",
        data_provider: "data_provider",
        profit_type: "profit_type",
    };

    const [ isLoading, setIsLoading ] = useState(true);
    const [ postData, setPostData ] = useState({
        user_id: userDetails?._id,
        property: __SETTINGS_TYPES?.percentage,
        value: 0,
    });
    const [ profitType, setProfitType ] = useState({
        user_id: userDetails?._id,
        property: __SETTINGS_TYPES?.profit_type,
        value: "",
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

    useEffect(()=>{
        setCurrentSettingsValues();
    }, []);

    useEffect(()=>{
        if(profitType?.value)
            changePriceBoundProfitValue(profitType?.value)
    }, [profitType]);

    const setCurrentSettingsValues = async () => {
    
        setIsLoading(true);

        if(
            __SETTINGS_TYPES?.percentage===name ||
            __SETTINGS_TYPES?.flat_rate===name
        ){
            // Profit Type
            let pt_res = await fetchAgentInfoByAgentIdAndPropName(
                userDetails?._id, 
                __SETTINGS_TYPES?.profit_type
            );
            if(pt_res?._id){
                setProfitType(pt_res);
            }
        }
            
        if(__SETTINGS_TYPES?.percentage===name){
            // Price Markup Percentage
            let pmp_res = await fetchAgentInfoByAgentIdAndPropName(
                postData?.user_id, 
                __SETTINGS_TYPES?.percentage
            );
            if(pmp_res?._id){
                setPostData(pmp_res);
            }
        }

        if(__SETTINGS_TYPES?.flat_rate===name){
            // Flat Rate Profit
            let flp_res = await fetchAgentInfoByAgentIdAndPropName(
                postData?.user_id, 
                __SETTINGS_TYPES?.flat_rate
            );
            if(flp_res?._id){
                setPostData(flp_res);
            }
        }

        if(__SETTINGS_TYPES?.data_provider===name){
            // Data Provder
            let dp_res = await fetchAgentInfoByAgentIdAndPropName(
                postData?.user_id, 
                __SETTINGS_TYPES?.data_provider
            );
            if(dp_res?._id){
                setPostData(dp_res);
            }else{
                setPostData({
                    ...postData,
                    property: __SETTINGS_TYPES?.data_provider,
                    value: "duffel"
                });
            }
        }

        setIsLoading(false);
    }

    const changePriceBoundProfitValue = async (profit_type) => {
        setIsLoading(true);
        let _res = await fetchAgentInfoByAgentIdAndPropName(
            postData?.user_id, 
            profit_type
        );
        if(_res?._id){
            setPostData({
                ...postData,
                property: profit_type,
                value: _res?.value,
            });
        }
        setIsLoading(false);
    }

    const mainSettingsOnInput = (e) => {
        resetFormValidation();
        setPostData({
            ...postData,
            value: e.target.value,
        });
    }

    const profitTypeOnInput = (type) => {
        resetFormValidation();
        setProfitType({
            ...profitType,
            value: type
        });
    }

    const OnSubmitFunction = async () => {
        
        setIsLoading(true);

        if(
            !profitType.value && (
                postData?.property===__SETTINGS_TYPES?.percentage ||
                postData?.property===__SETTINGS_TYPES?.flat_rate
            )
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Profit type not selected",
            });
            setIsLoading(false);
            return
        }

        if(!postData?.property){
            setFormValidation({
                type: "error",
                isError: true,
                message: "Property fiield (i.e. settings type) is reqiured",
            });
            setIsLoading(false);
            return;
        }

        if(!postData?.value){
            setFormValidation({
                type: "error",
                isError: true,
                message: "Settings value is required",
            });
            setIsLoading(false);
            return;
        }

        if(
            postData?.property===__SETTINGS_TYPES?.percentage ||
            postData?.property===__SETTINGS_TYPES?.flat_rate
        ){
            // Profit Type
            let pt_res = await createNewAgentInfo(profitType);
        }

        // Main Settings
        let settings_res = await createNewAgentInfo(postData);

        alert(`Booking parameters modified!`);
        setIsLoading(false);
    }

    return <div style={{zIndex: 2, position: "absolute", background: "white", color: "black", width: 310, left: -150, top: 0, borderRadius: 8, boxShadow: "0 0 20px yellow"}}>
        {
            isLoading ? 
            <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                Loading.. Please Wait
            </div> :
            <div style={{padding: 20}}>
                <p style={{fontSize: 13, marginBottom: 10, fontWeight: "bolder"}}>
                    <i style={{marginRight: 10, color: "orange"}}
                        className="fa-solid fa-tools"></i>
                    {
                        (__SETTINGS_TYPES?.data_provider===name) &&
                        "Change Data Supplier:"
                    }
                    {
                        (__SETTINGS_TYPES?.percentage===name || __SETTINGS_TYPES?.flat_rate===name) &&
                        "Price-bound Profit:"
                    }
                </p>
                <p onClick={closeFunc} style={{cursor: "pointer", position: "absolute", top: 15, right: 20}}>
                    <i style={{color: "rgba(0,0,0,0.6"}} className="fa-solid fa-times"></i>
                </p>
                <div>
                    {
                        (__SETTINGS_TYPES?.data_provider===name) &&
                        <select onInput={mainSettingsOnInput}
                            value={postData?.value}
                            style={{width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "none", borderBottom: "2px solid orange"}}>
                            <option style={{color: "black"}} value="duffel">Duffel</option>
                            <option style={{color: "black"}} value="amadeus">Amadeus</option>
                            <option style={{color: "black"}} value="saber">Saber</option>
                            <option style={{color: "black"}} value="travelport">Travelport</option>
                        </select>
                    }
                    {
                        (__SETTINGS_TYPES?.percentage===name || __SETTINGS_TYPES?.flat_rate===name) &&
                        <div>
                            <div style={{marginBottom: 10}}>
                                <span style={{marginRight: 20}}>
                                    <input onChange={()=>profitTypeOnInput(__SETTINGS_TYPES?.percentage)}
                                        checked={profitType?.value===__SETTINGS_TYPES?.percentage}
                                        name="generic_popup_settings_page_profit_type"
                                        id="generic_popup_settings_page_profit_type_percentage_radio"
                                        type="radio" />
                                    <label htmlFor="generic_popup_settings_page_profit_type_percentage_radio">
                                        <span style={{marginLeft: 5, fontSize: 12}}>
                                            Percentage (%)
                                        </span>
                                    </label>
                                </span>
                                <span>
                                    <input onChange={()=>profitTypeOnInput(__SETTINGS_TYPES?.flat_rate)}
                                        checked={profitType?.value===__SETTINGS_TYPES?.flat_rate}
                                        name="generic_popup_settings_page_profit_type"
                                        id="generic_popup_settings_page_profit_type_flat_rate_radio"
                                        type="radio" />
                                    <label htmlFor="generic_popup_settings_page_profit_type_flat_rate_radio">
                                        <span style={{marginLeft: 5, fontSize: 12}}>
                                            Flat Rate ($)
                                        </span>
                                    </label>
                                </span>
                            </div>
                            <input onInput={mainSettingsOnInput}
                                value={postData?.value}
                                style={{width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "none", borderBottom: "2px solid orange"}} 
                                type="text" placeholder="type here..."/>
                        </div>
                    }
                </div>
                {
                    formValidation.isError && <FormErrorCard 
                        color={"black"}
                        message={formValidation.message} 
                        type={formValidation.type}
                    />
                }
                <div onClick={OnSubmitFunction} style={{textAlign: "center", fontSize: 13, padding: 10, borderRadius: 50, marginTop: 5, background: "orange"}}>
                    Save
                </div>
            </div>
        }
    </div>
}

export default GenericPopupSettingsPane;