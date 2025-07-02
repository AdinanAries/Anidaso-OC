import { useState } from "react";
import { toggle_show_main_sections } from "../helpers/helper-functions";

const RequiredActions = (props) => {

    const {
        userDetails,
    } = props;

    const [ isMinimizedWindow, setIsMinimizedWindow ] = useState(false);

    return <div style={{padding: 20, backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{width: "calc(100% - 50px)"}}>
                <h4>
                    <i style={{marginRight: 10, color: "crimson"}}
                        className="fa-solid fa-exclamation-triangle"></i>
                    Action(s) Required! <span onClick={()=>setIsMinimizedWindow(!isMinimizedWindow)}
                        style={{color: "green", fontWeight: "initial", cursor: "pointer", marginLeft: 30, fontSize: 13, textDecoration: "underline"}}>
                        {
                            isMinimizedWindow ? "See Details" : "Minimize Window"
                        }
                        <span>
                            <i style={{color: "rgba(0,0,0,0.5)", marginLeft: 10}}
                                className={"fa-solid fa-angle-" + (isMinimizedWindow ? "down" : "up")}></i>
                        </span>
                    </span>
                </h4>
                {
                    !isMinimizedWindow &&
                    <div style={{marginTop: 10}}>
                        <div style={{display: "flex"}}>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-file-contract"></i>
                                    Business Compliance</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    It is important to complete the business compliance form, and to submit required verifications documents in order for us to verify your personal, business, and agency credentials to establish trust in order to start using this platform.
                                </p>
                                <p onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showLegalCompliancePage();
                                    }}
                                    style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                                    Take Action
                                    <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                                </p>
                            </div>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-wallet"></i>
                                    Balance Wallet</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    This website uses paid, metered, third party API's to give you access to the various data and services required for your business operations, therefore wallet balance is needed to get you access to these API's and services.
                                </p>
                                <p  onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showWalletPage();
                                    }}
                                    style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                                    Take Action
                                    <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                                </p>
                            </div>
                            <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                                <p style={{fontSize: 13, fontWeight: "bolder"}}>
                                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-server"></i>
                                    Booking Engine</p>
                                <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                                    As an Independent Travel Agent using this platform, you have your own booking engine with exact prices directly from suppliers. You can integrate the engine in your exsiting business website and customize it based on your needs.
                                </p>
                                <p onClick={()=>{
                                        toggle_show_main_sections("staff");
                                        window.__viewStaffInfo(userDetails?._id);
                                        window.__showBookingEnginePage();
                                    }}
                                    style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                                    Take Action
                                    <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="tool-tip-parent">
                <div style={{width: 40, height: 40, borderRadius: "100%", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <i style={{color: "green"}} className="fa-solid fa-angle-right"></i>
                </div>
                <div style={{left: -15, minWidth: 80, textAlign: "center", fontSize: 13}}
                    className="tool-tip">
                    see all..
                </div>
            </div>
        </div>
    </div>
}

export default RequiredActions;