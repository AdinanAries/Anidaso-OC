import { useEffect, useState } from "react";
import LOGO_PLACEHOLDER from "../../../../../LOGO_PLACEHOLDER.jpg";
import { 
    fetchAgentInfoByAgentIdAndPropName,
    createNewAgentInfo,
} from "../../../../../services/agentServices";
import FormErrorCard from "../../../../../components/FormErrorCard";

const AgentCompanyDetails = (props) => {

    const {
        userDetails
    } = props;

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    return <div style={{paddingTop: 20}} className="main-seaction-containers">
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 10px)"}}>
                    <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-building"></i>
                        Business Details
                    </p>
                    <h3 style={{color: "skyblue", marginBottom: 10}}>
                        Business Name
                        <span style={{marginLeft: 20, fontSize: 14, cursor: "pointer", color: "lightgreen"}}>
                            <i className="fa-solid fa-pencil"></i>
                        </span>
                    </h3>
                    <div style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <img style={{width: 140}}
                                src={LOGO_PLACEHOLDER}/>
                        </div>
                        <div style={{marginLeft: 10}}>
                            <p style={{marginBottom: 10, color: "orange", fontSize: 12}}>
                                Change Logo Below:</p>
                            <input style={{ backgroundColor: "rgba(255,255,255,0.1)", cursor: "pointer",
                                    padding: "25px 10px", color: "white", border: "1px dashed rgba(255,255,255,0.1)"}} type="file" />
                            <div style={{backgroundColor: "blue", color: "white", textAlign: "center", cursor: "pointer", padding: 10}}>
                                Upload
                            </div>
                        </div>
                    </div>
                    <p style={{padding: 20, marginTop: 10, display: "flex", background: "rgba(0,255,0, 0.2)", color: "white", border: "1px dashed lightgreen", fontSize: 13}}>
                        <i style={{marginRight: 10, color: "lightgreen"}}
                            className="fa-solid fa-info-circle"></i>
                        <span>
                            Business details added will be shown on your booking engine site for your customer to view.
                            It is important to add enough business details to allow your cutomers to trust your brand and book their travel products/services with you.
                        </span>
                    </p> 
                </div>
                <div style={{width: "calc(50% - 5px)"}}>
                    <div>
                        <p style={{color: "skyblue", fontSize: 13, fontWeight: "bolder"}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-address-card"></i>
                            Business Contact</p>
                        <div style={{marginTop: 10}}>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.4, marginBottom: 8}} className="fa fa-envelope"></i>
                                    Email
                                </span>
                                <input className="direct-edit-form-field" placeholder="Add Business Email"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.4, marginBottom: 10}} className="fa fa-phone"></i>
                                    Phone
                                </span>
                                <input className="direct-edit-form-field" placeholder="Add Business Phone"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-facebook"></i>
                                    facebook
                                 </span>
                                <input className="direct-edit-form-field" placeholder="Add Business Facebook Link"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-twitter"></i>
                                    Twitter
                                 </span>
                                <input className="direct-edit-form-field" placeholder="Add Business Twitter Link"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-instagram"></i>
                                    Instagram
                                 </span>
                                <input className="direct-edit-form-field" placeholder="Add Business Instagram Link"/>
                            </div>
                            <div className="standard-action-button">
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgentCompanyDetails;