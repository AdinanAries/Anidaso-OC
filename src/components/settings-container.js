
import FormErrorCard from './FormErrorCard';
import { 
    createNewCustomerAppSettings, 
    fetchAllCustomerAppSettings,
    fetchCustomerAppSettingsByPropName,
} from '../services/settingsServices';
import {
    createNewBookingLink
} from "../services/bookingLinkServices";
import { 
    createNewAgentInfo,
    fetchAgentInfoByAgentIdAndPropName
} from '../services/agentServices';
import { 
    fetchCustomersByAgentId,
    fetchCustomersByAgentIdAndSearchQuery,
} from '../services/customerServices';
import {
    reload_business_settings_page_customer_app_preview_iframe,
    toggle_show_main_sections
} from '../helpers/helper-functions';
import AirportsData from '../data/Airports';
import CONSTANTS from '../constants/Constants';
import { 
    add_commas_to_number,
    calculateActionPoints,
} from '../helpers/helper-functions';
import { useEffect, useState } from 'react';
import CustomerForm from './CustomerForm';
import NewsLetterEditor from './NewsLetterEditor';
import SelectCustomersList from './SelectCustomersList';

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
    const _PAGES = {
        campaign: 0,
        search_link: 1,
        booking_params: 2,
        send_link: 3
    }

    const PAGI_LIMIT = 10;
    
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [customersList, setCustomersList ] = useState([]);
    const [ searchCustomerQuery, setSearchCustomerQuery ] = useState("");
    const [ isAddNewCustomer, setIsAddNewCustomer ] = useState(false);
    const [ formData, setFormData ] = useState({
        property: SETTINGS_PROPS_NAMES[0]?.value,
        value: ""
    });
    const [ agentPriceMarkup, setAgentPriceMarkup ] = useState({
        user_id: userDetails?._id,
        property: "price_markup",
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
    const search_link_client_app_url = appConfigs[0].value;
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
         <section id="settings-container" style={{display: "none"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", margin: 10}}>
                    <div onClick={()=>setCurrentSubPage(_PAGES?.campaign)}
                        style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.campaign) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                        <i style={{color: (currentSubPage===_PAGES?.campaign) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-link"></i>
                        Campaign
                        <div style={{border: (currentSubPage===_PAGES?.campaign) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                    </div>
                    <div onClick={showSearchLinkForm}
                        style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.search_link) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                        <i style={{color: (currentSubPage===_PAGES?.search_link) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-link"></i>
                        Search Link
                        <div style={{border: (currentSubPage===_PAGES?.search_link) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                    </div>
                    <div  onClick={()=>setCurrentSubPage(_PAGES?.booking_params)}
                        style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.booking_params) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                        <i style={{color:  (currentSubPage===_PAGES?.booking_params) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-cogs"></i>
                        Booking Parameters
                        <div style={{border: (currentSubPage===_PAGES?.booking_params) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                    </div>
                    <div  onClick={showSendLinkPage}
                        style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.send_link) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                        <i style={{color:  (currentSubPage===_PAGES?.send_link) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-envelope"></i>
                        Send Email
                        <div style={{border: (currentSubPage===_PAGES?.send_link) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                    </div>
                </div>
                {
                    isLoggedUserAgent &&   
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
                            {add_commas_to_number(calculateActionPoints((userDetails?.wallet_info?.current_balance).toFixed(2)))} actions
                        </p>
                    </div>
                }
            </div>
            <div>
                <div style={{marginTop: 10}}>
                    {
                        (currentSubPage===_PAGES?.campaign) && <div>
                            <div style={{marginBottom: 10}}>
                                <NewsLetterEditor 
                                    isEditMode={true}
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
                                    isLoggedUserAgent ? <div style={{width: "calc(50% - 4px)"}}>
                                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                                <i className="fa fa-percent" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                                Price Markup (%)
                                                <span style={{marginLeft: 20, textDecoration: "underline", color: "orange", cursor: "pointer"}}>
                                                    Charge Flat Rate</span>
                                            </p>
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
                                        <>
                                        <div style={{padding: 10, backgroundColor: "white", marginBottom: 10}}>
                                                <h3 contentEditable={true} style={{padding: 10}}>
                                                    (No Subject)
                                                </h3>
                                                <div style={{marginTop: 5, marginBottom: 10, display: "flex"}}>
                                                    <p style={{fontSize: 13, marginRight: 5, color: "rgba(0,0,0,0.6)"}}>
                                                        to:
                                                    </p>
                                                    <div style={{display: "flex", flexWrap: "wrap"}}>
                                                        <p className='tool-tip-parent' style={{fontSize: 12}}>
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {"<"}</span>
                                                            k.joseph@gmail.com
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {">"}</span>
                                                            <span style={{textAlign: "center", top: 10}} className='tool-tip'>
                                                                Keyana Joseph
                                                                <i style={{color: "red", fontSize: 15, marginLeft: 10}}
                                                                    className='fa-solid fa-trash-can'></i>
                                                            </span>
                                                        </p>
                                                        <p className='tool-tip-parent' style={{fontSize: 12}}>
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {"<"}</span>
                                                            molina.g@gmail.com
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {">"}</span>
                                                            <span style={{textAlign: "center", top: 10}} className='tool-tip'>
                                                                Molina Gomez
                                                                <i style={{color: "red", fontSize: 15, marginLeft: 10}}
                                                                    className='fa-solid fa-trash-can'></i>
                                                            </span>
                                                        </p>
                                                        <p className='tool-tip-parent' style={{fontSize: 12}}>
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {"<"}</span>
                                                            d.carolina@yahoo.com
                                                            <span style={{color: "rgba(0,0,0,0.4)"}}>
                                                                {">"}</span>
                                                            <span style={{textAlign: "center", top: 10}} className='tool-tip'>
                                                                Donte Carolina
                                                                <i style={{color: "red", fontSize: 15, marginLeft: 10}}
                                                                    className='fa-solid fa-trash-can'></i>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p style={{border: "3px dashed rgba(0,0,0,0.1)", fontSize: 12, marginBottom: 10, borderRadius: 9, color: "rgba(0,0,0,0.5)",
                                                            padding: 20, background: "rgba(0,0,0,0.1)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                        <i style={{marginRight: 10}} className='fa-solid fa-paperclip'></i>
                                                        drop files here
                                                    </p>
                                                    <p>
                                                        <span className='tool-tip-parent'>
                                                            <i style={{color: "rgba(0,0,0,0.7)", fontSize: 15, marginLeft: 10}}
                                                                className='fa-solid fa-paperclip'></i>
                                                            <span style={{textAlign: "center", top: 10, fontSize: 13}} className='tool-tip'>
                                                                Attach A file
                                                            </span>
                                                        </span>
                                                        <span className='tool-tip-parent'>
                                                            <i style={{color: "rgba(0,0,0,0.7)", fontSize: 15, marginLeft: 15}}
                                                                className='fa-solid fa-images'></i>
                                                            <span style={{textAlign: "center", top: 10, fontSize: 13}} className='tool-tip'>
                                                                Add Images
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{padding: 20, borderRadius: 8, backgroundColor: "rgba(0,255,0,0.1)", marginBottom: 10}}>
                                                <p style={{color: "white", fontSize: 13, display: "flex"}}>
                                                    <i style={{color: "lightgreen", marginRight: 10}} className='fa-solid fa-info-circle'></i>
                                                    <span>
                                                        To send the search link to a customer, you must select a customer on the left side or enter customer email below or create new customer
                                                    </span>  
                                                </p>
                                                <p onClick={()=>setIsAddNewCustomer(true)}
                                                    style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                                                    <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                                                    Create New Customer
                                                </p>
                                            </div>
                                            <div>
                                                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                                        <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                                        Customer Email</p>
                                                    <div style={{border: "none", display: "flex"}}>
                                                        <input
                                                            type="email" placeholder="type here..."
                                                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                                                        <input style={{border: "none", padding: "10px 20px", backgroundColor: "lightgreen", cursor: "pointer", borderRadius: 50,}}
                                                            type="button" value="Add to list" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{cursor: "pointer", backgroundColor: "yellow", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                                                <i style={{marginRight: 10, fontSize: 14}} className="fa fa-check-square-o"></i>
                                                Send Email
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div style={{marginTop: 10}}>
                                <NewsLetterEditor 
                                    isEditMode={false}
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
        </section>
    )
}

export default SettingsContainer;