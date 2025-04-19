import { useEffect, useState } from "react";
import FormErrorCard from "./FormErrorCard";
//import FullPageLoader from "../../../components/FullPageLoader";
import {
    registerPost,
    fetchAppRoles,
 } from "../services/accountServices";

function NewUserForm(props){

    const [ isLoading, setIsLoading ] = useState(false);
    const [appRoleState, setAppRoleState] = useState([]);

    const [ formData, setFormData ] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirm_password: "",
        user_role: "",
    });

    const resetFormDate = () => {
        setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            dob: "",
            email: "",
            phone: "",
            gender: "",
            password: "",
            confirm_password: "",
            user_role: "",
        });
    }

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
        (async()=>{
            let _roles = await fetchAppRoles();
            setAppRoleState(_roles);
        })()
    }, []);

    const setFirstName = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            first_name: e.target.value
        });
    }

    const setLastName = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            last_name: e.target.value
        })
    }

    const setEmail = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            email: e.target.value
        })
    }

    const setPhone = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            phone: e.target.value
        })
    }

    const setPassword = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            password: e.target.value
        });
    }

    const setConfirmPassword = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            confirm_password: e.target.value
        });
    }

    const setUserRole = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            user_role: e.target.value
        });
    }

    const setDob = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            dob: e.target.value
        })
    }

    const setGender = (e) => {
        resetFormValidation();
        setFormData({
            ...formData,
            gender: e.target.value
        })
    }

    const signup_onclick = async () => {
        setIsLoading(true);
        if(
            !formData.email ||
            !formData.first_name ||
            !formData.last_name ||
            !formData.password ||
            !formData.phone ||
            !formData.user_role ||
            !formData.dob ||
            !formData.gender
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Please provide all form fields",
            });
            setIsLoading(false);
            return
        }
        if(formData.password !== formData.confirm_password) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Password and confirm password values are not the same",
            });
            setIsLoading(false)
            return
        }
        let res = await registerPost(formData);
        if(res._id){
            alert("new user created successfully");
            resetFormDate();
        }else{
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            })
        }
        setIsLoading(false);
        
    }

    return (
        <div id="main_signup_form">
            {/*
                isLoading && <FullPageLoader />
            */}
            <div className="login_page_form_container" 
                style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden"}}>
                <p className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
                    <i className="fa fa-user-plus" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                    Please complete the form below to add new staff</p>
                <div style={{padding: "10px",}}>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            First Name</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setFirstName}
                                value={formData.first_name}
                                type="text" placeholder="type here..."  
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Last Name</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setLastName}
                                value={formData.last_name}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Email</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setEmail}
                                value={formData.email}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-phone" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Phone</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setPhone}
                                value={formData.phone}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Date of Birth</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setDob}
                                value={formData.dob}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-person-half-dress" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Gender</p>
                        <div style={{border: "none"}}>
                            <select 
                                onInput={setGender}
                                value={formData.gender}
                                type="text" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                    <option style={{color: "black"}} value="">Choose Gender</option>
                                    <option style={{color: "black"}} value="male">Male</option>
                                    <option style={{color: "black"}} value="female">Female</option>
                                    <option style={{color: "black"}} value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-key" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Password</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setPassword}
                                value={formData.password}
                                type="password" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-key" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Confirm Password</p>
                        <div style={{border: "none"}}>
                            <input 
                                onInput={setConfirmPassword}
                                value={formData.confirm_password}
                                type="password" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 20, marginTop: 10}}>
                        <p style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 10}}>
                            Select User Role:
                        </p>
                        <select onInput={setUserRole}
                            value={formData.user_role}
                            className="direct-edit-form-field" style={{width: "100%", borderRadius: 8}}
                        >
                            <option style={{color: "black"}} value="">Choose Role</option>
                            {
                                appRoleState?.map(each=>{
                                    return <option style={{color: "black"}} value={each?.constant}>
                                        {each?.title}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    {
                        formValidation.isError && <FormErrorCard 
                            message={formValidation.message} 
                            type={formValidation.type}
                        />
                    }
                    <div>
                        <div onClick={signup_onclick} style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                            Create User
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewUserForm;