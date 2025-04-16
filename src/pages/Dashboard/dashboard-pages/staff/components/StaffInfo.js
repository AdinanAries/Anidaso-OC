import { useState } from "react";
import { updateAccountInfo, fetchRoleByConstant } from "../../../../../services/accountServices";
import FormErrorCard from "../../../../../components/FormErrorCard";
import CONSTANTS from "../../../../../constants/Constants";

const StaffInfo = (props) => {

    const {
        unSelectStaff,
        selectedStaff,
        isLoggedUserAgent,
        isLoggedUserOwner,
        isLoggedUserAdmin
    } = props;

    const [ isLoading, setIsLoading ] = useState(false);
    const [formData, setFormData] = useState(selectedStaff);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    let isOwner = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (selectedStaff?.role_info?.constant===CONSTANTS.app_role_constants.agent);

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

    return <div className="main-seaction-containers">
        {
            (isLoggedUserOwner || isLoggedUserAdmin) &&
            <div onClick={unSelectStaff} className="standard-button"
                style={{background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)"}} >
                <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-arrow-left"></i>
                Back
            </div>
        }
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
                <div style={{width: "50%"}}>
                    <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-user"></i>
                        Staff Information
                    </p>{
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
                                <input onInput={emailOnInput}
                                    className="direct-edit-form-field" 
                                    value={formData?.email}
                                />
                            </div>
                            <div style={{marginBottom: 5}}>
                                <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                                    Phone:
                                </span>
                                <input onInput={phoneOnInput}
                                    className="direct-edit-form-field" 
                                    value={formData?.phone}
                                />
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
                                <select onChange={roleOnInput}
                                    className="direct-edit-form-field"
                                    value={formData?.role_info?.constant}
                                >
                                    {isLoggedUserOwner && <option style={{color: "black"}} value="1">Owner</option>}
                                    {(isLoggedUserAdmin || isLoggedUserOwner) && <option style={{color: "black"}} value="2">Administrator</option>}
                                    {(isLoggedUserAdmin || isLoggedUserOwner || isLoggedUserAgent) && <option style={{color: "black"}} value="3">Agent</option>}
                                </select>
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
                            className="fa fa-user"></i>
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
}

export default StaffInfo;