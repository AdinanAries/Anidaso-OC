import { useState } from "react";
import wellgo_logo from "../WillgoLogo.png";
import {
    updateAccountPassword
} from "../services/accountServices";

import FormErrorCard from "../components/FormErrorCard";

const CreateNewPasswordPage = (props) => {

    const {
        userDetails,
        setUserDetails,
    } = props;

    const [ isLoading, setIsLoading ] = useState(false);
    const [ formData, setFormData ] = useState({
        ...userDetails,
        new_password: "",
        password_again: "",
        old_password: "",
    });

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const oldPasswordOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            old_password: e.target.value
        });
    }

    const newPasswordOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            new_password: e.target.value
        });
    }

    const passwordAgainOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            password_again: e.target.value
        });
    }

    const loginOnSubmit = async () => {
        setIsLoading(true);
        if(!formData.old_password) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter old password",
            });
            setIsLoading(false);
            return;
        }
        if(!formData.new_password) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter new password",
            });
            setIsLoading(false);
            return;
        }
        if(!formData.password_again) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "please re-enter password to confirm",
            });
            setIsLoading(false);
            return;
        }
        if(formData.new_password !== formData?.password_again) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "new passwords entered did not match",
            });
            setIsLoading(false);
            return;
        }
        let res = await updateAccountPassword(formData);
        if(res.isError){
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            });
            setIsLoading(false);
        } else {
            if(res._id){
                window.location.reload();
            }else{
                setFormValidation({
                    type: "error",
                    isError: true,
                    message: res.message,
                });
                setIsLoading(false);
            }
        }
        // Reset Password Field for Retries
        setFormData({
            ...formData,
            new_password: "",
            password_again: "",
        });
    }

    return <main>
        <div style={{display: "flex", maxWidth: 1000, margin: "auto", minHeight: "calc(100vh - 200px)", alignItems: "center"}}>
            <div style={{marginRight: 40}}>
                <div className="site_logo_container">
                    <div style={{height: "100%", display: "flex", justifyContent: "center"}}>
                        <p style={{marginRight: 10}}>
                            <img style={{width: 45}} src={wellgo_logo} alt="Logo"/></p>
                        <p>Welldugo
                            <sup style={{fontSize: 12}}>&reg;</sup></p>
                    </div>
                </div>
                <p style={{color: "white", textAlign: "center", marginTop: 5}}>
                    Affordable & Reliable Travel, & Trusted by Many.
                </p>
                <p style={{fontSize: 14, color: "skyblue", textAlign: "center", marginTop: 5}}>
                    Independent Travel Agent (ITA)
                </p>
                <a href="http://worksofbtc.com" rel="noreferrer" target="_blank" 
                    style={{textDecoration: "none"}}>
                    <p style={{fontSize: 13, color: "red", textAlign: "center", marginTop: 20}}>
                        <span style={{color: "rgba(255,255,255,0.5)"}}>
                            Developed by</span> BYTE THE CODE &copy; {new Date().getFullYear()}
                    </p>
                </a>
            </div>
            <div style={{width: "calc(50%)", background: "rgba(0, 102, 255, 0.2)", padding: 45, borderRadius: 9}}>
                <p style={{color: "rgba(0, 191, 255, 0.8)", textAlign: "center", fontSize: 19, marginBottom: 20, textDecoration: "underline"}}>
                    Create Password</p>
                    <p style={{color: "rgb(204, 255, 0)", textAlign: "center", fontSize: 13}}>
                        <i style={{color: "rgba(0, 191, 255, 0.8)", marginRight: 10}} 
                                className="fa-solid fa-user"></i>
                        Welcome, {userDetails?.first_name +" "+ userDetails?.last_name}
                    </p>
                    <p style={{backgroundColor: "rgba(0,255,0,0.1)", padding: 20, borderLeft: "4px solid lightgreen",
                            margin: "20px 0", cursor: "pointer", color: "lightgreen", fontSize: 14}}>
                        <span onClick={()=>alert("forgot password")}>
                            <i style={{fontSize: 19, color: "lightgreen", marginRight: 10}} 
                                className="fa-solid fa-exclamation-triangle"></i>
                                Please create new password
                        </span></p>
                {
                    !isLoading ?
                    <div>
                        <div>
                            <p style={{color: "white", marginBottom: 20, fontSize: 13}}>
                                <i style={{fontSize: 19, color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                    className="fa fa-lock"></i>
                                Old Password</p>
                            <input
                                className="focus-shadow-xtreme-dark-bg"
                                type="password"
                                onInput={oldPasswordOnInput}
                                style={{borderRadius: 50, color: "white", width: "100%", padding: 20, border: "none", background: "rgba(255,255,255,0.07)"}}
                                placeholder="enter your password here" 
                                value={formData.old_password}    
                            />
                        </div>
                        <div style={{marginTop: 30}}>
                            <p style={{color: "white", marginBottom: 20, fontSize: 13}}>
                                <i style={{fontSize: 19, color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                    className="fa fa-lock"></i>
                                New Password</p>
                            <input
                                className="focus-shadow-xtreme-dark-bg"
                                type="password"
                                onInput={newPasswordOnInput}
                                style={{borderRadius: 50, color: "white", width: "100%", padding: 20, border: "none", background: "rgba(255,255,255,0.07)"}}
                                placeholder="enter your password here" 
                                value={formData.new_password}    
                            />
                        </div>
                        <div style={{marginTop: 30}}>
                            <p style={{color: "white", marginBottom: 20, fontSize: 13}}>
                                <i style={{fontSize: 18, color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                    className="fa fa-lock"></i>
                                Confirm New Password</p>
                            <input type="password"
                                className="focus-shadow-xtreme-dark-bg"
                                onInput={passwordAgainOnInput}
                                style={{borderRadius: 50, color: "white", width: "100%", padding: 20, border: "none", background: "rgba(255,255,255,0.07)"}}
                                placeholder="confirm password here" 
                                value={formData.password_again}
                            />
                        </div>
                        {
                            formValidation.isError && <div style={{marginTop: 20}}>
                                <FormErrorCard 
                                    message={formValidation.message} 
                                    type={formValidation.type}
                                />
                            </div>
                        }
                        {
                            !isLoading && <>
                                <div onClick={loginOnSubmit} className="standard-action-button" style={{padding: 15, marginTop: 20, padding: 20}}>
                                    Create Password
                                </div>
                            </>
                        }
                    </div> :
                    <div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <i style={{color: "orange", marginRight: 10}} className="fa fa-spinner"></i>
                            <p style={{color: "white", fontSize: 14,}}>Logging in... Please wait...</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    </main>
}

export default CreateNewPasswordPage;