import wellgo_logo from "../WillgoLogo.png";

const LoginPage = (props) => {

    const {
        LoginOnClick,
    } = props;

    const loginOnSubmit = () => {
        let email="";
        let password="";
        LoginOnClick();
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
                <p style={{fontSize: 13, color: "red", textAlign: "center", marginTop: 20}}>
                    <span style={{color: "rgba(255,255,255,0.5)"}}>
                        Developed by</span> BYTE THE CODE &copy; {new Date().getFullYear()}
                </p>
            </div>
            <div style={{width: "calc(50%)", border: "1px solid rgba(255,255,255,0.1)", padding: 20}}>
                <p style={{color: "rgba(255,255,255,0.8)", textAlign: "center", fontSize: 19, marginBottom: 20}}>
                    Login</p>
                <div>
                    <div>
                        <p style={{color: "white", marginBottom: 10}}>
                            <i style={{color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                className="fa fa-envelope"></i>
                            Email</p>
                        <input type="email"
                            style={{borderRadius: 50, color: "white", width: "100%", padding: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.07)"}}
                            placeholder="enter you email here" />
                    </div>
                    <div style={{marginTop: 10}}>
                        <p style={{color: "white", marginBottom: 10}}>
                            <i style={{color: "rgba(255,255,255,0.5)", marginRight: 10}} 
                                className="fa fa-lock"></i>
                            Password</p>
                        <input
                            type="password"
                            style={{borderRadius: 50, color: "white", width: "100%", padding: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.07)"}}
                            placeholder="enter you password here" />
                    </div>
                    <div onClick={loginOnSubmit} className="standard-action-button">
                        login
                    </div>
                    <p style={{marginTop: 20, cursor: "pointer", textAlign: "center", color: "lightgreen"}}>
                        <span onClick={()=>alert("forgot password")}>
                            Forgot Password?</span></p>
                </div>
            </div>
        </div>
    </main>
}

export default LoginPage;