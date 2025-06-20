
import PageNA from '../../../../components/page-not-available';
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';

import FormErrorCard from '../../../../components/FormErrorCard';
import { 
    createNewCustomerAppSettings, 
    fetchAllCustomerAppSettings,
    fetchCustomerAppSettingsByPropName,
} from '../../../../services/settingsServices';
import {
    createNewBookingLink
} from "../../../../services/bookingLinkServices";
import { 
    createNewAgentInfo,
    fetchAgentInfoByAgentIdAndPropName
} from '../../../../services/agentServices';
import { 
    fetchCustomersByAgentId,
    fetchCustomersByAgentIdAndSearchQuery,
} from '../../../../services/customerServices';
import {
    reload_business_settings_page_customer_app_preview_iframe,
    toggle_show_main_sections
} from '../../../../helpers/helper-functions';
import AirportsData from '../../../../data/Airports';
import { 
    add_commas_to_number,
    calculateActionPoints,
} from '../../../../helpers/helper-functions';
import { useEffect, useState } from 'react';
import CustomerForm from '../../../../components/CustomerForm';
import NewsLetterEditor from '../../../../components/NewsLetterEditor';
import SelectCustomersList from '../../../../components/SelectCustomersList';
import SendEmail from "../../../../components/SendEmail";

let MarketingContainer = (props)=>{

    const {
        userDetails,
        currentDesign,
        setCurrentDesign,
        handleDragStart,
        removeElement,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleDragEnd,
        containerFocusEvent,
        textFocusEvent,
        textHighlightEvent,
        lastSelection,
        setLastSelection,
        lastRange, 
        setLastRange,
        lastFocusedElement, 
        setLastFocusedElement,
        newSettingsSpan, 
        setNewSettingsSpan,
        lastFocusedIcon, 
        setlastFocusedIcon,
        currentElemToolsState,
        setCurrentElemToolsState,
        bindNewsLetterElemEvents,
        applyNewsLetterChanges,
        servicePlanTiersList
    } = props;
    
    const _pageConstant=CONSTANTS.app_page_constants.marketing;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

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

    let current_service_plan = servicePlanTiersList.find(each=>each?.constant===1);
    let wallet_actions_per_unit = current_service_plan?.actions_per_unit;
    if(isLoggedUserAgent){
        let agent_info = userDetails?.agent_info;
        let sp_obj = agent_info?.find(each=>each.property==="service_plan");
        if(sp_obj?.value){
            current_service_plan = servicePlanTiersList.find(each=>each?.constant===parseInt(sp_obj?.value))
            wallet_actions_per_unit = current_service_plan?.actions_per_unit;
        }
    }

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

    const _PAGES = {
        campaign: 0,
        search_link: 1,
        booking_params: 2,
        send_link: 3
    }
    const AGENT_WEBSITE_URL = (userDetails?.website_url || "N/A");
    const WELLDUGO_MAIN_WEBSITE_URL = "https://welldugo-56d8210b9fe9.herokuapp.com";
    const AGENT_APP_URL = "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com";
    const PAGI_LIMIT = 10;
    const __PROFIT_TYPE_PROP_KEY="profit_type";
    const __PROFIT_TYPES = {
        percentage: "price_markup",
        flat_rate: "flat_rate",
    };
    const [ profitType, setProfitType ] = useState(__PROFIT_TYPES?.percentage);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [customersList, setCustomersList ] = useState([]);
    const [ mailingList, setMailingList ] = useState([]);
    const [ searchCustomerQuery, setSearchCustomerQuery ] = useState("");
    const [ isAddNewCustomer, setIsAddNewCustomer ] = useState(false);
    const [ formData, setFormData ] = useState({
        property: SETTINGS_PROPS_NAMES[0]?.value,
        value: ""
    });
    const [ agentFlatRate, setAgentFlatRate ] = useState({
        user_id: userDetails?._id,
        property: __PROFIT_TYPES?.flat_rate,
        value: 0,
    });
    const [ agentPriceMarkup, setAgentPriceMarkup ] = useState({
        user_id: userDetails?._id,
        property: __PROFIT_TYPES?.percentage,
        value: 15,
    });
    const [ currentSubPage, setCurrentSubPage ] = useState(_PAGES?.campaign);
    const [ searchLink, setSearchLink ] = useState({
        _id: "",
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
            msg: "",
            color: "skyblue",
            icon: "globe",
            name: "Website Url",
            value: ( isLoggedUserAgent ?
                AGENT_WEBSITE_URL : //"http://localhost:3001" :
                WELLDUGO_MAIN_WEBSITE_URL //"http://www.welldugo.com"
            ),
        },
        {
            msg: "",
            color: "skyblue",
            icon: "server",
            name: "Booking Engine",
            value: ( isLoggedUserAgent ?
                (AGENT_APP_URL+"/?ngn=1&ag="+userDetails?._id) : //"http://localhost:3001/?ngn=1&ag=" : 
                WELLDUGO_MAIN_WEBSITE_URL //"http://www.welldugo.com",
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
    const [ newsLetterSendObj, setNewsLetterSendObj ] = useState({
        title: "(No Subject)",
        from: "adinanaries@outlook.com",
    });
    const search_link_client_app_url = (isLoggedUserAgent ? 
        AGENT_APP_URL : 
        (WELLDUGO_MAIN_WEBSITE_URL+"/search")
    );
    const [ previewLink, setPreviewLink ] = useState(
        (search_link_client_app_url+(isLoggedUserAgent ? `/?ag=${userDetails?._id}&product=0` : ""))
    );

    const loadPreviewPage = async (isReload=false) => {
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
                alert("Please enter all values!.");
                return;
        }

        // Creating Link in DB
        let __res;
        if(!isReload){
            // Getting current price_percentage markup from db
            let pmp_res = await fetchAgentInfoByAgentIdAndPropName(
                agentPriceMarkup?.user_id, 
                agentPriceMarkup?.property
            );
            let post_obj = {
                oc_user_id: userDetails?._id,
                client_app_url: `${search_link_client_app_url}/`,
                product: searchLink.product,
                trip_type: searchLink.type,
                departure_airport: searchLink.dpt_airport,
                destination_airport: searchLink.dst_airport,
                travel_dates: searchLink.date,
                cabin: searchLink.cabin,
                num_of_adults: searchLink.adults,
                num_of_children: searchLink.children,
                num_of_infants: searchLink.infants,
                data_provider: "duffel",
                profit_type: "Percentage",
                profit_type_value: pmp_res?.value,
                visited: 0,
                booked: 0
            }
            __res = await createNewBookingLink(post_obj);
            console.log(__res);
            if(__res?._id){
                setSearchLink({
                    ...searchLink,
                    _id: __res?._id,
                });
            }
        }
        
        const __bl_id = (isReload) ? searchLink?._id : __res?._id;

        let _lnk = `${search_link_client_app_url}/?ag=${userDetails?._id}&bl=${__bl_id}&product=${searchLink.product}&type=${searchLink.type}&date=${searchLink.date}&dpt_airport=${searchLink.dpt_airport}&dst_airport=${searchLink.dst_airport}&cabin=${searchLink.cabin}&adults=${searchLink.adults}&children=${searchLink.children}&infants=${searchLink.infants}`;
        setPreviewLink(_lnk);
        // When reload button is clicked
        if(isReload){
            reload_business_settings_page_customer_app_preview_iframe();
        }
    }

    const loadCustomers = async () => {
        let __customers = await fetchCustomersByAgentId(userDetails?._id, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(__customers))
            setCustomersList(__customers);
    }

    const showCampaignPage = () => {
        setCurrentSubPage(_PAGES?.campaign)
    }

    const showSearchLinkForm = () => {
        setCurrentSubPage(_PAGES?.search_link);
        // Re-init Date Chooser Library
        const __dd = searchLink?.date;
        // Remove date to make initialization possible
        setSearchLink({
            ...searchLink,
            date: "",
        });
        let isSingleDatePicker = (searchLink?.type==="one-way")
        setTimeout(()=>{
            window.__initCreateSearchLinkDateInput(isSingleDatePicker);
        }, 100);   
        // Reset current date
        setTimeout(()=>{
            setSearchLink({
                ...searchLink,
                date: __dd,
            });
        }, 100);
    }

    const showSendLinkPage = () => {
        setCurrentSubPage(_PAGES?.send_link)
    }

    const agentFlatRateOnchange = (e) => {
        resetFormValidation();
        setAgentFlatRate({
            ...agentFlatRate,
            value: e.target.value
        })
    }

    const agentPriceMarkupOnchange = (e) => {
        setAgentPriceMarkup({
            ...agentPriceMarkup,
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

        // 1. Saving Current Profit Type
        let pt_res = await createNewAgentInfo({
            user_id: userDetails?._id,
            property: __PROFIT_TYPE_PROP_KEY,
            value: profitType,
        });
        if(!pt_res._id){
            setFormValidation({
                type: "error",
                isError: true,
                message: pt_res.message,
            });
        }

        // 2. Saving Current Price Markup
        let pmp_res = await createNewAgentInfo(agentPriceMarkup);
        if(!pmp_res._id){
            setFormValidation({
                type: "error",
                isError: true,
                message: pmp_res.message,
            });
        }

        // 3. Saving Current Flat Rate Profit
        let flp_res = await createNewAgentInfo(agentFlatRate);
        if(!flp_res._id){
            setFormValidation({
                type: "error",
                isError: true,
                message: flp_res.message,
            });
        }

        // 4. Data Provider
        //---Here for Data Provider--//

        if(pt_res._id && pmp_res._id && flp_res._id)
            alert(`Booking parameters modified!`);

        setTimeout(()=>{
            loadPreviewPage();
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
    const searchCustomerFieldOnInput = (e) => {
        if(!e.target.value){
            loadCustomers();
        }
        setSearchCustomerQuery(e.target.value);
    }

    const searchCustomerOnSubmit = async () => {
        if(!searchCustomerQuery){
            alert("Please enter customer name or email or phone");
            return;
        }
        let __customers = await fetchCustomersByAgentIdAndSearchQuery(userDetails?._id, searchCustomerQuery, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(__customers))
            setCustomersList(__customers);
    }

    return(
        <section id="marketing-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{display: "flex", margin: 10}}>
                            <div onClick={showCampaignPage}
                                style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.campaign) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                                <i style={{color: (currentSubPage===_PAGES?.campaign) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-link"></i>
                                Campaign
                                <div style={{border: (currentSubPage===_PAGES?.campaign) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                            </div>
                            <div onClick={()=>{
                                    if((currentSubPage===_PAGES?.campaign))
                                        applyNewsLetterChanges();
                                    showSearchLinkForm();
                                }}
                                style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.search_link) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                                <i style={{color: (currentSubPage===_PAGES?.search_link) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-link"></i>
                                Search Link
                                <div style={{border: (currentSubPage===_PAGES?.search_link) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                            </div>
                            <div onClick={()=>{
                                    if((currentSubPage===_PAGES?.campaign))
                                        applyNewsLetterChanges();
                                    setCurrentSubPage(_PAGES?.booking_params);
                                }}
                                style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.booking_params) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                                <i style={{color:  (currentSubPage===_PAGES?.booking_params) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-cogs"></i>
                                Booking Parameters
                                <div style={{border: (currentSubPage===_PAGES?.booking_params) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                            </div>
                            <div  onClick={()=>{
                                    if((currentSubPage===_PAGES?.campaign))
                                        applyNewsLetterChanges();
                                    showSendLinkPage();
                                }}
                                style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.send_link) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                                <i style={{color:  (currentSubPage===_PAGES?.send_link) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-envelope"></i>
                                Send Email
                                <div style={{border: (currentSubPage===_PAGES?.send_link) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                            </div>
                        </div>
                        {
                            (isLoggedUserAgent && userDetails?.wallet_info) ?
                            <div onClick={()=>{
                                    toggle_show_main_sections("staff");
                                    window.__viewStaffInfo(userDetails?._id);
                                    window.__showWalletPage();
                                }} 
                                style={{padding: 10, borderRadius: 5, cursor: "pointer"}}>
                                <div style={{color: "white", display: "flex", alignItems: "center"}}>
                                    <i style={{marginRight: 10, fontSize: 14, color: "lightgreen"}} className="fa fa-wallet"></i>
                                    <div>
                                        <p style={{fontSize: 14, color: "yellow", textDecoration: "underline"}}>
                                            ${add_commas_to_number((userDetails?.wallet_info?.current_balance).toFixed(2))}
                                        </p>
                                    </div>
                                </div>
                                <p style={{textAlign: "right", marginTop: 5, color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                                    {add_commas_to_number(calculateActionPoints((userDetails?.wallet_info?.current_balance).toFixed(2), wallet_actions_per_unit))} actions
                                </p>
                            </div> :
                            (!isLoggedUserOwner && !isLoggedUserAdmin) &&
                                <div style={{color: "white", fontSize: 12, background: "rgba(255,0,0,0.2)", padding: 10, border: "1px solid rgba(255,255,255,0.1)"}}>
                                    <i style={{marginRight: 5, color: "yellow"}}
                                        className="fa-solid fa-exclamation-triangle"></i>
                                        Wallet Not Found
                                </div>
                        }
                    </div>
                    <div>
                        <div style={{marginTop: 10}}>
                            {
                                (currentSubPage===_PAGES?.campaign) && <div>
                                    <div style={{marginBottom: 10}}>
                                        <NewsLetterEditor 
                                            userDetails={userDetails}
                                            isEditMode={true}
                                            currentDesign={currentDesign}
                                            setCurrentDesign={setCurrentDesign}
                                            handleDragStart={handleDragStart}
                                            removeElement={removeElement}
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            handleDragLeave={handleDragLeave}
                                            handleDragEnd={handleDragEnd}
                                            containerFocusEvent={containerFocusEvent}
                                            textFocusEvent={textFocusEvent}
                                            textHighlightEvent={textHighlightEvent}
                                            lastSelection={lastSelection}
                                            setLastSelection={setLastSelection}
                                            lastRange={lastRange} 
                                            setLastRange={setLastRange}
                                            lastFocusedElement={lastFocusedElement} 
                                            setLastFocusedElement={setLastFocusedElement}
                                            newSettingsSpan={newSettingsSpan} 
                                            setNewSettingsSpan={setNewSettingsSpan}
                                            lastFocusedIcon={lastFocusedIcon} 
                                            setlastFocusedIcon={setlastFocusedIcon}
                                            currentElemToolsState={currentElemToolsState} 
                                            setCurrentElemToolsState={setCurrentElemToolsState}
                                            bindNewsLetterElemEvents={bindNewsLetterElemEvents}
                                            applyNewsLetterChanges={applyNewsLetterChanges}
                                            showCampaignPage={showCampaignPage}
                                            newsLetterSendObj={newsLetterSendObj}
                                            setNewsLetterSendObj={setNewsLetterSendObj}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                (currentSubPage===_PAGES?.search_link) &&
                                <div style={{display: "flex", justifyContent: "space-between", padding: "10px 20px", borderRadius: 8, background: "rgba(255, 255, 255, 0.1)", marginBottom: 20}}>
                                    <p style={{fontSize: 12, color: "white", padding: "10px 0"}}>
                                        <select onChange={slProductOnChange}
                                            value={searchLink.product}
                                            style={{background: "none", color: "orange", border: "none", marginRight: 10, textAlign: "center", 
                                            borderBottom: (searchLink.type ? "none" : "2px solid red")}}>
                                            <option style={{color: "black"}} value="0">Flights</option>
                                            <option style={{color: "black"}} value="1">Hotels</option>
                                            <option style={{color: "black"}} value="2">Cars</option>
                                        </select>
                                        <select onChange={slTypeOnChange} 
                                            value={searchLink.type}
                                            style={{background: "none", color: "orange", border: "none", marginRight: 10, textAlign: "center", 
                                            borderBottom: (searchLink.type ? "none" : "2px solid red")}}>
                                            <option style={{color: "black"}} value="one-way">One Way</option>
                                            <option style={{color: "black"}} value="round-trip">Round Trip</option>
                                        </select>
                                        Dates: {(!searchLink.date ? <i style={{color: "red", marginRight: 5}} className='fa-solid fa-exclamation-triangle'></i> : "")}
                                            <input id="create_search_link_date_input"
                                            value={searchLink.date}
                                            placeholder="Select Date" readOnly
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
                                    <div  onClick={()=>loadPreviewPage()} className='tool-tip-parent'
                                        style={{color: "yellow", cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 50, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <i className="fa-solid fa-turn-down"></i>
                                        <span style={{left: -50, fontSize: 12, color: "black", minWidth: 90, textAlign: "center"}} className='tool-tip'>
                                            Add Link
                                        </span>
                                    </div>
                                </div>
                            }
                            {
                                (currentSubPage===_PAGES?.booking_params) &&
                                <div style={{marginBottom: 10}}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        {
                                            isLoggedUserAgent ? 
                                            <div style={{width: "calc(50% - 4px)"}}>
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
                                                {
                                                    profitType===__PROFIT_TYPES?.percentage &&
                                                    <div>
                                                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                                                <i className="fa fa-percent" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                                                Price Markup (%)
                                                                <span onClick={()=>setProfitType(__PROFIT_TYPES?.flat_rate)} style={{marginLeft: 20, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                                                                    Charge Flat Rate</span>
                                                            </p>
                                                            <div style={{border: "none"}}>
                                                                <input onInput={agentPriceMarkupOnchange}
                                                                    value={agentPriceMarkup?.value}
                                                                    type="number" placeholder="type here..."
                                                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
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
                            }
                            {
                                (currentSubPage===_PAGES?.send_link) &&
                                <div style={{marginBottom: 10}}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <div style={{width: "calc(50% - 4px)", borderRadius: 8, backgroundColor: "rgb(43, 52, 61)", padding: 10}}>
                                            <SelectCustomersList
                                                setMailingList={setMailingList}
                                                mailingList={mailingList}
                                                userDetails={userDetails}
                                                totalItems={totalItems}
                                                PAGI_LIMIT={PAGI_LIMIT}
                                                setpagiCurrentPage={setpagiCurrentPage}
                                                pagiCurrentPage={pagiCurrentPage}
                                                customersList={customersList}
                                                loadCustomers={loadCustomers}
                                                isAddNewCustomer={isAddNewCustomer}
                                                setIsAddNewCustomer={setIsAddNewCustomer}
                                                searchCustomerFieldOnInput={searchCustomerFieldOnInput}
                                                searchCustomerOnSubmit={searchCustomerOnSubmit}
                                                searchCustomerQuery={searchCustomerQuery}
                                            />
                                        </div>
                                        <div style={{width: "calc(50% - 4px)"}}>
                                            {
                                                isAddNewCustomer ?
                                                <>
                                                    <p onClick={()=>setIsAddNewCustomer(false)}
                                                        style={{color: "orange", cursor: "pointer", textDecoration: "underline", marginBottom: 20, marginLeft: 20, fontSize: 13}}>
                                                        <i style={{color: "yellow", marginRight: 10}} className='fa-solid fa-arrow-left'></i>
                                                        Back To Send Link Form
                                                    </p>
                                                    <CustomerForm 
                                                        userDetails={userDetails} 
                                                        successCallBack={loadCustomers}
                                                    />
                                                </> :
                                                <SendEmail
                                                    userDetails={userDetails}
                                                    mailingList={mailingList}
                                                    setMailingList={setMailingList}
                                                    setIsAddNewCustomer={setIsAddNewCustomer}
                                                    newsLetterSendObj={newsLetterSendObj}
                                                    setNewsLetterSendObj={setNewsLetterSendObj}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div style={{marginTop: 10}}>
                                        <NewsLetterEditor 
                                            userDetails={userDetails}
                                            isEditMode={false}
                                            currentDesign={currentDesign}
                                            setCurrentDesign={setCurrentDesign}
                                            handleDragStart={handleDragStart}
                                            removeElement={removeElement}
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            handleDragLeave={handleDragLeave}
                                            handleDragEnd={handleDragEnd}
                                            containerFocusEvent={containerFocusEvent}
                                            textFocusEvent={textFocusEvent}
                                            textHighlightEvent={textHighlightEvent}
                                            lastSelection={lastSelection}
                                            setLastSelection={setLastSelection}
                                            lastRange={lastRange} 
                                            setLastRange={setLastRange}
                                            lastFocusedElement={lastFocusedElement} 
                                            setLastFocusedElement={setLastFocusedElement}
                                            newSettingsSpan={newSettingsSpan} 
                                            setNewSettingsSpan={setNewSettingsSpan}
                                            lastFocusedIcon={lastFocusedIcon} 
                                            setlastFocusedIcon={setlastFocusedIcon}
                                            currentElemToolsState={currentElemToolsState} 
                                            setCurrentElemToolsState={setCurrentElemToolsState}
                                            bindNewsLetterElemEvents={bindNewsLetterElemEvents}
                                            applyNewsLetterChanges={applyNewsLetterChanges}
                                            showCampaignPage={showCampaignPage}
                                            newsLetterSendObj={newsLetterSendObj} 
                                            setNewsLetterSendObj={setNewsLetterSendObj}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                (currentSubPage!==_PAGES?.campaign) &&
                                <div style={{display: "flex", borderRadius: 50, justifyContent: "space-between", padding: "0 10px", width: "100%", backgroundColor: "black", border: "1px solid pink"}}>
                                    <p id="searchLinkAddressTextToCopy" style={{whiteSpace: "nowrap", overflow: "hidden", padding: 10, width: "calc(100% - 70px)", fontSize: 13, color: "white"}}>
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
                                        &ag={userDetails?._id}
                                        &bl={searchLink?._id}
                                    </p>
                                    <>
                                        <div onClick={()=>loadPreviewPage(true)} className='tool-tip-parent'
                                            style={{color: "pink", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <i className="fa-solid fa-arrow-rotate-right"></i>
                                            <span style={{left: -50, fontSize: 12, color: "black", minWidth: 90, textAlign: "center"}} className='tool-tip'>
                                                Reload Page
                                            </span>
                                        </div>
                                        <div className='tool-tip-parent' onClick={()=>{

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
                                            style={{cursor: "pointer", display: "flex", alignItems: "center", marginRight: 10, color: "pink", justifyContent: "center"}}>
                                            <i className="fa-solid fa-copy"></i>
                                            <span style={{left: -50, fontSize: 12, color: "black", minWidth: 90, textAlign: "center"}} className='tool-tip'>
                                                Copy Link
                                            </span>
                                        </div>
                                    </>
                                </div>
                            }
                        </div>
                    </div>
                    {
                    (currentSubPage!==_PAGES?.campaign) &&
                    <div style={{marginTop: 5}}>
                        {false && <p style={{color: "red", marginBottom: 10, fontSize: 13}}>
                            <i style={{color: "yellow", marginRight: 10}} className='fa-solid fa-eye'></i>
                            Preview - Customer App
                        </p>}
                        <iframe id="business-settings-page-customer-app-preview-iframe" 
                            style={{width: "100%", height: "calc(100vh - 130px)", border: "none", borderRadius: 8}} 
                            src={previewLink} title="description"></iframe>
                    </div>
                    }
                </>
            }
        </section>
    )
}

export default MarketingContainer;