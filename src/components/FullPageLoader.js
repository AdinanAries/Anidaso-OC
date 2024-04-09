import loading_icon from "../loading.svg";

const FullPageLoader = () => {
    return (
        <div style={{display: "flex", zIndex: 100000, justifyContent: "center", alignItems: "center", background: "black", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0}}>
            <div style={{marginBottom: 20, padding: "20px"}}>
                <div style={{backgroundImage: `url(${loading_icon})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: 150, height: 150, margin: "auto"}}></div>
                <p style={{color: "white", fontFamily: "'Prompt', Sans-serif", textAlign: "center", marginTop: 20}}>
                    Please wait...</p>
            </div>
        </div>
    );
}

export default FullPageLoader