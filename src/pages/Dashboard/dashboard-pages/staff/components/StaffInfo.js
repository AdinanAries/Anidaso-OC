import { useEffect, useState } from "react";
import { 
    updateAccountInfo, 
    fetchRoleByConstant,
    fetchAppRoles,
 } from "../../../../../services/accountServices";
 import { 
    add_commas_to_number,
    calculateActionPoints,
    toggle_show_main_sections
  } from "../../../../../helpers/helper-functions";
import FormErrorCard from "../../../../../components/FormErrorCard";
import AgentLinks from "./AgentLinks";
import CONSTANTS from "../../../../../constants/Constants";
import AgentCustomers from "./AgentCustomers";
import AgentConfigs from "./AgentConfigs";
import AgentWallet from "./AgentWallet";
import AgentDetailsCard from "../../../../../components/AgentDetailsCard";
import AgentCompanyDetails from "./AgentCompanyDetails";
import EngineConfiguratorPage from "./EngineConfiguratorPage";

const StaffInfo = (props) => {

    const {
        unSelectStaff,
        selectedStaff,
        setSelectedStaff,
        loggedInUserDetails,
        setUserDetails,
        isLoggedUserAgent,
        isLoggedUserOwner,
        isLoggedUserAdmin
    } = props;

    const _PAGES = {
        info: 1,
        links: 2,
        customers: 3,
        configs: 4,
        wallet: 5,
        booking_engine_configurator: 6,
    }

    const [ currentSubPage, setcurrentSubPage ] = useState(_PAGES.info);
    const [ isLoading, setIsLoading ] = useState(false);
    const [formData, setFormData] = useState(selectedStaff);
    const [appRoleState, setAppRoleState] = useState([]);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    useEffect(()=>{
        if(!isAdmin && !isOwner){
            let sales_chart_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let sales_chart_values = [2233, 2241, 543, 1564, 2300, 0, 0, 0, 0, 0, 0, 0];
            render_agent_sales_stats_chart(sales_chart_labels, sales_chart_values);
        }

        (async()=>{
            let _roles = await fetchAppRoles();
            setAppRoleState(_roles);
        })()
    }, []);

    let isYou = (selectedStaff?._id === loggedInUserDetails?._id);
    let isOwner = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    const render_agent_sales_stats_chart = (labels, values) => {
        const ctx = document.getElementById('salesStatsChart');
        new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Sales ($)',
                    data: values,
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },
            ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    /*title: {
                      display: true,
                      text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
                    }*/
                  }
            }
        });
    }

    const firstNameOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            first_name: e.target.value
        });
    }

    const lastNameOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            last_name: e.target.value
        });
    }

    const emailOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            email: e.target.value
        });
    }

    const phoneOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            phone: e.target.value
        });
    }

    const roleOnInput = async (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        // New role info here
        let rr = await fetchRoleByConstant(e.target.value);
        let rid = rr?._id;
        setFormData({
            ...formData,
            role_id: rid,
            role_info: rr,
        });
    }

    const dobOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            dob: e.target.value
        });
    } 

    const genderOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            gender: e.target.value
        });
    } 

    const onSubmit = async () => {
        setIsLoading(true);
        if(!formData.first_name){
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter first name",
            });
            setIsLoading(false);
            return;
        }
        if(!formData.last_name){
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter last name",
            });
            setIsLoading(false);
            return;
        }
        if(!formData.email){
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter email",
            });
            setIsLoading(false);
            return;
        }
        if(!formData.phone){
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter phone",
            });
            setIsLoading(false);
            return;
        }

        if(!formData.gender){
            setFormValidation({
                type: "error",
                isError: true,
                message: "please select gender",
            });
            setIsLoading(false);
            return;
        }

        let _res = await updateAccountInfo(formData);
        if(_res?._id)
            window.__viewStaffInfo(_res?._id);
        else{
            setFormValidation({
                type: "error",
                isError: true,
                message: _res?.message,
            });
        }
        setIsLoading(false);
    } 

    const showInfoPage = () => {
        setcurrentSubPage(_PAGES?.info);
        setTimeout(()=>{
            let sales_chart_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let sales_chart_values = [2233, 2241, 543, 1564, 2300, 0, 0, 0, 0, 0, 0, 0];
            render_agent_sales_stats_chart(sales_chart_labels, sales_chart_values);
        }, 200);
    }

    const showWalletPage = () => {
        setcurrentSubPage(_PAGES?.wallet);
    }
    window.__showWalletPage = showWalletPage;

    const showBookingEnginePage = () => {
        setcurrentSubPage(_PAGES?.booking_engine_configurator);
    }
    window.__showBookingEnginePage = showBookingEnginePage;

    return <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex", margin: 10}}>
                {
                    (isLoggedUserOwner || isLoggedUserAdmin) &&
                    <div onClick={unSelectStaff}
                        style={{padding: 20, color: "orange", textDecoration: "underline", cursor: "pointer", fontSize: 13}} >
                        <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-angle-left"></i>
                        Users List
                    </div>
                }
                <div onClick={showInfoPage}
                    style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.info) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                    <i style={{color: (currentSubPage===_PAGES?.info) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-user"></i>
                    Info
                    <div style={{border: (currentSubPage===_PAGES?.info) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                </div>
                {
                    (!isAdmin && !isOwner) &&
                    <>
                        <div  onClick={()=>setcurrentSubPage(_PAGES?.links)}
                            style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.links) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                            <i style={{color: (currentSubPage===_PAGES?.links) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-link"></i>
                            Links
                            <div style={{border: (currentSubPage===_PAGES?.links) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                        </div>
                        <div  onClick={()=>setcurrentSubPage(_PAGES?.customers)}
                            style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.customers) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                            <i style={{color: (currentSubPage===_PAGES?.customers) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-users"></i>
                            customers
                            <div style={{border: (currentSubPage===_PAGES?.customers) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                        </div>
                        <div  onClick={()=>setcurrentSubPage(_PAGES?.configs)}
                            style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.configs) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                            <i style={{color: (currentSubPage===_PAGES?.configs) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-cogs"></i>
                            configs
                            <div style={{border: (currentSubPage===_PAGES?.configs) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                        </div>
                        <div onClick={showWalletPage}
                            style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.wallet) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                            <i style={{color: (currentSubPage===_PAGES?.wallet) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-wallet"></i>
                            wallet
                            <div style={{border: (currentSubPage===_PAGES?.wallet) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                        </div>
                        <div  onClick={()=>setcurrentSubPage(_PAGES?.booking_engine_configurator)}
                            style={{padding: "20px 15px", paddingBottom: 10, color: (currentSubPage===_PAGES?.booking_engine_configurator) ? "white" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, }} >
                            <i style={{color: (currentSubPage===_PAGES?.booking_engine_configurator) ? "yellow" : "rgba(255,255,255,0.5)", marginRight: 10}} className="fa fa-server"></i>
                            Engine
                            <div style={{border: (currentSubPage===_PAGES?.booking_engine_configurator) ? "2px solid yellow" : "none", marginTop: 10, borderRadius: 100}}></div>
                        </div>
                    </>
                }
            </div>
            {
                (isAgent && selectedStaff?.wallet_info) ?
                <div onClick={showWalletPage} 
                    style={{padding: 10, borderRadius: 5, cursor: "pointer"}}>
                    <div style={{color: "white", display: "flex", alignItems: "center"}}>
                        <i style={{marginRight: 10, fontSize: 14, color: "lightgreen"}} className="fa fa-wallet"></i>
                        <div>
                            <p style={{fontSize: 14, color: "yellow", textDecoration: "underline"}}>
                                ${add_commas_to_number((selectedStaff?.wallet_info?.current_balance)?.toFixed(2))}
                            </p>
                        </div>
                    </div>
                    <p style={{textAlign: "right", marginTop: 5, color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                        {add_commas_to_number(calculateActionPoints((selectedStaff?.wallet_info?.current_balance)?.toFixed(2)))} actions
                    </p>
                </div> :
                (!isAdmin && !isOwner) &&
                    <div style={{color: "white", fontSize: 12, background: "rgba(255,0,0,0.2)", padding: 10, border: "1px solid rgba(255,255,255,0.1)"}}>
                        <i style={{marginRight: 5, color: "yellow"}}
                            className="fa-solid fa-exclamation-triangle"></i>
                            Wallet Not Found
                    </div>
                
            }
        </div>
        {
            (currentSubPage===_PAGES?.info) &&
            <>
                {
                    (!isAdmin && !isOwner) &&
                    <>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: 5}}>
                            <div style={{width: "calc(50% - 2px)"}}>
                                <AgentDetailsCard
                                    hideSeeDetailsLink={true}
                                    userDetails={selectedStaff}
                                />
                            </div>
                            <div style={{width: "calc(50% - 2px)"}}>
                                <div style={{padding: 10}}>
                                    <div>
                                        <p style={{fontSize: 13, marginBottom: 10, color: "orange"}}>
                                            Current Total Sales:</p>
                                        <h1 style={{color: "skyblue"}}>
                                            $3,000.23
                                            <span style={{fontWeight: "initial", color: "lightgreen", fontSize: 13, marginLeft: 25, textDecoration: "underline", cursor: "pointer"}}>
                                                <i style={{marginRight: 10, color: "rgba(255, 255, 255, 0.5)"}}
                                                    className="fa-solid fa-money-check-dollar"></i>
                                                Request Payout
                                            </span>
                                        </h1>
                                    </div>
                                    <div style={{background: "white", height: 180, marginTop: 10, padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <canvas id="salesStatsChart" ></canvas>
                                        <div style={{padding: 10}}>
                                            <p style={{fontSize: 12}}>
                                                <i style={{marginRight: 10, color: "green"}}
                                                    className="fa-solid fa-info-circle"></i>
                                                Your recent payout of $4,500 was on March 3, 2025. That payout was based on 45 days of sales.
                                            </p>

                                            <p onClick={()=>toggle_show_main_sections("sales")}
                                                style={{marginTop: 10, textDecoration: "underline", cursor: "pointer", textAlign: "center"}}>
                                                See All Sales
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AgentCompanyDetails
                            userDetails={selectedStaff}
                         />
                    </>
                }
                <div className="main-seaction-containers">
                    {
                        (isOwner) && <div style={{backgroundColor: "rgba(0,0,0,0.5)", padding: 20, fontSize: 14}}>
                            <p style={{color: "yellow"}}>
                                <i style={{marginRight: 10, color: "lightgreen"}}
                                    className="fa-solid fa-building-user"></i>
                                Owner User
                                {
                                    isYou &&
                                    <span style={{color: "rgba(255,255,255,0.7)", marginLeft: 10, fontSize: 11}}>
                                        - Your Account</span>
                                }
                            </p>
                        </div>
                    }
                    {
                        (isAdmin) && <div style={{backgroundColor: "rgba(0,0,0,0.5)", padding: 20, fontSize: 14}}>
                        <p style={{color: "yellow"}}>
                            <i style={{marginRight: 10, color: "lightgreen"}}
                                className="fa-solid fa-hammer"></i>
                            Admin User
                        </p>
                    </div>
                    }
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: 10}}>
                            <div style={{width: "50%"}}>
                                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                                        className="fa fa-pencil"></i>
                                    Personal Details
                                </p>
                                {
                                    isLoading ? <div>
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <i style={{color: "orange", marginRight: 10}} className="fa fa-spinner"></i>
                                            <p style={{color: "white", fontSize: 14,}}>Updating user details... Please wait...</p>
                                        </div>
                                    </div> :
                                    <>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                First Name:
                                            </span>
                                            <input onInput={firstNameOnInput}
                                                className="direct-edit-form-field" 
                                                value={formData?.first_name}
                                            />
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Last Name:
                                            </span>
                                            <input onInput={lastNameOnInput}
                                                className="direct-edit-form-field" 
                                                value={formData?.last_name}
                                            />
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Email:
                                            </span>
                                            {
                                                (isLoggedUserAdmin || isLoggedUserOwner) ?
                                                <input onInput={emailOnInput}
                                                    className="direct-edit-form-field" 
                                                    value={formData?.email}
                                                /> :
                                                <span className="tool-tip-parent" style={{color: "grey", fontSize: 13, cursor: "not-allowed"}}>
                                                    <i style={{color: "red", marginRight: 10}}
                                                        className="fa-solid fa-lock"></i>
                                                    {formData?.email}
                                                    <span className="tool-tip" style={{color: "black"}}>
                                                        Please contact support to change this field!
                                                    </span>
                                                </span>
                                            }
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Phone:
                                            </span>
                                            {
                                                (isLoggedUserAdmin || isLoggedUserOwner) ?
                                                <input onInput={phoneOnInput}
                                                    className="direct-edit-form-field" 
                                                    value={formData?.phone}
                                                /> :
                                                <span className="tool-tip-parent" style={{color: "grey", fontSize: 13, cursor: "not-allowed"}}>
                                                    <i style={{color: "red", marginRight: 10}}
                                                        className="fa-solid fa-lock"></i>
                                                    {formData?.phone}
                                                    <span className="tool-tip" style={{color: "black"}}>
                                                        Please contact support to change this field!
                                                    </span>
                                                </span>
                                            }
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Date of Birth:
                                            </span>
                                            <input onInput={dobOnInput}
                                                className="direct-edit-form-field" 
                                                value={formData?.dob}
                                            />
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Gender:
                                            </span>
                                            <select onChange={genderOnInput}
                                                className="direct-edit-form-field"
                                                value={formData?.gender}
                                            >
                                                <option style={{color: "black"}} value="">Choose Gender</option>
                                                <option style={{color: "black"}} value="male">Male</option>
                                                <option style={{color: "black"}} value="female">Female</option>
                                                <option style={{color: "black"}} value="other">Other</option>
                                            </select>
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                                Role:
                                            </span>
                                            {
                                                (isLoggedUserAdmin || isLoggedUserOwner) ?
                                                <select onChange={roleOnInput}
                                                    className="direct-edit-form-field"
                                                    value={formData?.role_info?.constant}
                                                    >
                                                    <option style={{color: "black"}} value="">Choose Role</option>
                                                    {
                                                        appRoleState?.map(each=>{
                                                            return <option style={{color: "black"}} value={each?.constant}>
                                                                {each?.title}
                                                            </option>
                                                        })
                                                    }
                                                </select> :
                                                <span className="tool-tip-parent" style={{color: "grey", fontSize: 13, cursor: "not-allowed"}}>
                                                    <i style={{color: "red", marginRight: 10}}
                                                        className="fa-solid fa-lock"></i>
                                                    {formData?.role_info?.title}
                                                    <span className="tool-tip" style={{color: "black"}}>
                                                        Please contact support to change this field!
                                                    </span>
                                                </span>
                                            }
                                        </div>
                                    </>
                                }
                                {
                                    formValidation.isError && <div style={{marginTop: 20}}>
                                        <FormErrorCard 
                                            message={formValidation.message} 
                                            type={formValidation.type}
                                        />
                                    </div>
                                }
                                {
                                    !isLoading &&
                                    <div onClick={onSubmit} className="standard-action-button">
                                        Save
                                    </div>
                                }
                            </div>
                            <div style={{width: "calc(50% - 10px)"}}>
                                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                                        className="fa fa-rectangle-list"></i>
                                    Activity Log
                                </p>
                                <div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                    <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                                className="fa fa-history"></i>
                                            New Flight Booking Booking
                                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                                03-04-2024 @ 14:12:34
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
        {
            (currentSubPage===_PAGES?.links) &&
            <AgentLinks 
                userDetails={selectedStaff}
            />
        }
        {
            (currentSubPage===_PAGES?.customers) &&
            <AgentCustomers
                userDetails={selectedStaff}
            />
        }
        {
            (currentSubPage===_PAGES?.configs) &&
            <AgentConfigs 
                userDetails={selectedStaff}
                loggedInUserDetails={loggedInUserDetails}
                setUserDetails={setUserDetails}
                setSelectedStaff={setSelectedStaff}
            />
        }
        {
            (currentSubPage===_PAGES?.wallet) &&
            <AgentWallet 
                userDetails={selectedStaff}
                loggedInUserDetails={loggedInUserDetails}
                setUserDetails={setUserDetails}
                setSelectedStaff={setSelectedStaff}
            />
        }
        {
            (currentSubPage===_PAGES?.booking_engine_configurator) &&
            <EngineConfiguratorPage
                userDetails={selectedStaff}
            />
        }
    </div>
}

export default StaffInfo;