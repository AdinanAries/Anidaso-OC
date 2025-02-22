import { useState } from "react";
import wellgo_logo from "../WillgoLogo.png";
import {
    loginPost
} from "../services/accountServices";

import FormErrorCard from "../components/FormErrorCard";

const LoginPage = (props) => {

    const { 
        setFullPageLoading 
    } = props;

    const [ isLoading, setIsLoading ] = useState(false);
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

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

    const passwordOnInput = (e) => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
        setFormData({
            ...formData,
            password: e.target.value
        });
    }

    const loginOnSubmit = async () => {
        setIsLoading(true);
        setFullPageLoading(true);
        if(!formData.email) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter email",
            });
            setIsLoading(false);
            setFullPageLoading(false);
            return;
        }
        if(!formData.password) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "please enter password",
            });
            setIsLoading(false);
            setFullPageLoading(false);
            return;
        }
        let res = await loginPost(formData);
        if(res.isError){
            setFormValidation({
                type: "error",
                isError: true,
                message: res.message,
            });
        } else {
            if(res.token){
                localStorage.setItem("user_token", res.token);
                window.location.reload();
            }else{
                setFormValidation({
                    type: "error",
                    isError: true,
                    message: res.message,
                });
            }
        }
        setIsLoading(false);
        setFullPageLoading(false);
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
                    Operational Center (OC)
                </p>
                <a href="http://worksofbtc.com" rel="noreferrer" target="_blank" 
                    style={{textDecoration: "none"}}>
                    <p style={{fontSize: 13, color: "red", textAlign: "center", marginTop: 20}}>
                        <span style={{color: "rgba(255,255,255,0.5)"}}>
                            Developed by</span> BYTE THE CODE &copy; {new Date().getFullYear()}
                    </p>
                </a>
            </div>
            <div style={{width: "calc(50%)", border: "1px solid rgba(255,255,255,0.1)", padding: 25, borderRadius: 9}}>
                <p style={{color: "rgba(255,255,255,0.8)", textAlign: "center", fontSize: 19, marginBottom: 20}}>
                    Login</p>
                {
                    !isLoading ?
                    <div>
                        <div>
                            <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                <i style={{fontSize: 18, color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                    className="fa fa-envelope"></i>
                                Email</p>
                            <input type="email"
                                onInput={emailOnInput}
                                style={{borderRadius: 50, color: "white", width: "100%", padding: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.07)"}}
                                placeholder="enter you email here" 
                                value={formData.email}
                            />
                        </div>
                        <div style={{marginTop: 20}}>
                            <p style={{color: "white", marginBottom: 10, fontSize: 13}}>
                                <i style={{fontSize: 19, color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                    className="fa fa-lock"></i>
                                Password</p>
                            <input
                                type="password"
                                onInput={passwordOnInput}
                                style={{borderRadius: 50, color: "white", width: "100%", padding: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.07)"}}
                                placeholder="enter you password here" 
                                value={FormData.password}    
                            />
                        </div>
                        {
                            formValidation.isError && <div style={{marginTop: 10}}>
                                <FormErrorCard 
                                    message={formValidation.message} 
                                    type={formValidation.type}
                                />
                            </div>
                        }
                        <div onClick={loginOnSubmit} className="standard-action-button" style={{padding: 15}}>
                            login
                        </div>
                        <p style={{marginTop: 20, cursor: "pointer", textAlign: "center", color: "lightgreen", fontSize: 14}}>
                            <span onClick={()=>alert("forgot password")}>
                                Forgot Password?</span></p>
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

export default LoginPage;