import { useEffect, useState } from "react";
import LOGO_PLACEHOLDER from "../../../../../LOGO_PLACEHOLDER.jpg";
import { 
    createNewCompany,
    fetchCompanyById
} from "../../../../../services/companyServices";
import { updateAccountInfo } from "../../../../../services/accountServices";

const AgentCompanyDetails = (props) => {

    const {
        userDetails
    } = props;

    const [ isLoading, setIsLoading ] = useState(false);
    const [formData, setFormData] = useState({
            business_name: "",
            logo_url: "",
            business_email: "",
            business_phone: "",
            business_facebook_link: "",
            business_twitter_link: "",
            business_instagram_link: "",
    });

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    useEffect(()=>{
        if(userDetails?.company_id){
            (async()=>{
                let __comp= await fetchCompanyById(userDetails?.company_id);
                if(__comp?._id){
                    setFormData(__comp);
                }
            })()
        }else{
            // User Doesn't have company information added
        }
    }, []);

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
    }

    const businessNameOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_name: e.target.value
        })
    };

    const logoUrlOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            logo_url: e.target.value
        })
    };

    const businessEmailOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_email: e.target.value
        })
    };

    const businessPhoneOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_phone: e.target.value
        })
    };

    const businessFacebookLinkOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_facebook_link: e.target.value
        })
    };

    const businessTwitterLinkOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_twitter_link: e.target.value
        })
    };

    const businessInstagramLinkOnInput = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            business_instagram_link: e.target.value
        })
    };

    const companyFormOnsubmit = async () => {
        setIsLoading(true);
        if(
            !formData.business_name ||
            !formData.business_email ||
            !formData.business_phone
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Business name, email, and phone are required fields",
            });
            setIsLoading(false);
            return
        }

        if(formData?._id){
            alert("supposed to update!")
            // update here
        } else {
            let __res = await createNewCompany(formData);
            if(__res?._id){
                const __usr={
                    _id: userDetails._id,
                    password: userDetails.password,
                    first_name: userDetails.first_name,
                    middle_name: userDetails.middle_name,
                    last_name: userDetails.last_name,
                    dob: userDetails.dob,
                    gender: userDetails.gender,
                    phone: userDetails.phone,
                    email: userDetails.email,
                    role_id: userDetails.role_id,
                    make_new_password: userDetails.make_new_password,
                    company_id: __res?._id,
                    website_url: (userDetails?.website_url || ""),
                }
                let __u_res = await updateAccountInfo(__usr);
                if(__u_res?._id){
                    alert("New Company Info Crated!");
                    setIsLoading(false);
                }else{
                    setFormValidation({
                        type: "error",
                        isError: true,
                        message: __res?.message,
                    });
                    setIsLoading(false);
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
    }

    return <div style={{paddingTop: 20}} className="main-seaction-containers">
        <div>
            {
                formValidation?.isError && <div style={{padding: 10, marginBottom: 20, backgroundColor: "rgba(255,0,0,0.1)", border: "1px solid red"}}>
                    <p style={{color: "white", fontSize: 13}}>
                        <i style={{marginRight: 10, color: "yellow"}}
                            className="fa-solid fa-exclamation-triangle"></i>
                            {formValidation?.message}
                    </p>
                </div>
            }
            {
                isLoading && <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                    fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                    <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                    Loading.. Please Wait
                </div>
            }
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 10px)"}}>
                    <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-building"></i>
                        Business Details
                    </p>
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
                    <div style={{marginTop: 15}}>
                        <div style={{marginBottom: 5}}>
                            <span style={{display: "inline-block", color: "orange", fontSize: 15, marginRight: 10, width: 140}}>
                                <i style={{marginRight: 10, opacity: 0.4, marginBottom: 8}} className="fa fa-briefcase"></i>
                                Business Name:
                            </span>
                            <input onInput={businessNameOnInput} value={formData?.business_name}
                                className="direct-edit-form-field" placeholder="Add Business Name"/>
                        </div>
                    </div>
                    <div>
                        <p style={{fontSize: 13, color: "white", marginTop: 20, marginLeft: 20}}>
                            <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                            Please remember to hit save button after making any changes.
                        </p>
                    </div>
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
                                <input onInput={businessEmailOnInput} value={formData?.business_email}
                                    className="direct-edit-form-field" placeholder="Add Business Email"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.4, marginBottom: 10}} className="fa fa-phone"></i>
                                    Phone
                                </span>
                                <input onInput={businessPhoneOnInput} value={formData?.business_phone} 
                                    className="direct-edit-form-field" placeholder="Add Business Phone"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-facebook"></i>
                                    facebook
                                 </span>
                                <input onInput={businessFacebookLinkOnInput} value={formData?.business_facebook_link}
                                    className="direct-edit-form-field" placeholder="Add Business Facebook Link"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-twitter"></i>
                                    Twitter
                                 </span>
                                <input onInput={businessTwitterLinkOnInput} value={formData?.business_twitter_link}
                                    className="direct-edit-form-field" placeholder="Add Business Twitter Link"/>
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 90}}>
                                    <i style={{marginRight: 10, opacity: 0.5, marginBottom: 5, fontSize: 19}} className="fa fa-instagram"></i>
                                    Instagram
                                 </span>
                                <input onInput={businessInstagramLinkOnInput} value={formData?.business_instagram_link}
                                    className="direct-edit-form-field" placeholder="Add Business Instagram Link"/>
                            </div>
                            <div onClick={companyFormOnsubmit} className="standard-action-button">
                                Save
                            </div>
                        </div>
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
    </div>
}

export default AgentCompanyDetails;