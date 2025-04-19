import restrictedIcon from "./icons/restricted-icon.png";

function PageRestricted(){
    return (
        <div style={{display: "flex", height: "calc(100vh - 80px)", flexDirection: "column", justifyContent: 'center', padding: "0 10px"}}>
            <div style={{position: "relative", width: "fit-content", margin: "auto", padding: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, border: "1px solid rgba(0, 136, 255, 0.2)", backgroundColor: "rgba(0, 136, 255, 0.1)"}}>
                <p style={{position: "absolute", top: -60}}>
                    <img src={restrictedIcon} style={{width: 100, height: 'auto'}}/>
                </p>
                <p style={{textAlign: "center", color: "red", fontWeight: "bolder"}}>
                    Page Restictred</p>
                <p style={{textAlign: "center", color: "white", fontSize: 14, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                    <i style={{color: "yellow", marginRight: 10}}
                        className="fa-solid fa-exclamation-triangle"></i>
                    Your privileges do not grant access to this page! Please contanct support for help.
                </p>
                <p style={{textAlign: "right", color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 10}}>
                    <span style={{color: "red", fontSize: 13, marginRight: 5}}>BYTE THE CODE</span> 
                    &reg; - all rights reserved</p>
            </div>
        </div>
    );
}

export default PageRestricted;