import errorIcon from "./icons/error-icon.png";

function PageNA(){
    return (
        <div style={{display: "flex", height: "calc(100vh - 80px)", flexDirection: "column", justifyContent: 'center', padding: "0 10px"}}>
            <div style={{position: "relative", width: "fit-content", margin: "auto", padding: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, border: "1px solid rgba(255,255,0,0.2)", backgroundColor: "rgba(255,255,0,0.1)"}}>
                <p style={{position: "absolute", top: -30}}><img src={errorIcon} style={{width: 50, height: 'auto'}}/></p>
                <p style={{textAlign: "center", color: "lightgreen", fontWeight: "bolder"}}>
                    Page Not Found</p>
                <p style={{textAlign: "center", color: "white", fontSize: 14, marginTop: 10}}>
                    This page is unable to load at the moment due to technical issues</p>
                <p style={{textAlign: "right", color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 20}}>
                    <span style={{color: "red", fontSize: 13, marginRight: 5}}>BYTE THE CODE</span> 
                    &reg; - all rights reserved</p>
            </div>
        </div>
    );
}

export default PageNA;