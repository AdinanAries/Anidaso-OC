import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewer = (props) => {

    const {
        isEditMode,
        currentElemToolsState,
        buttonUrlOnInput,
    } = props;

    return <table style={{width: "100%", borderSpacing: 0, backgroundColor: "white"}}>
        <tbody>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" style={{background: "black", padding: 10}}>
                        <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{color: "white", fontSize: 13, textAlign: "center"}}>
                            Sed ut perspiciatis unde omnis iste natus error?</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(133, 193, 239)", padding: "25px 20px"}}>
                        <img style={{height: 40, marginRight: 10}} src={LOGO_PLACEHOLDER} />
                        <h3 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode}>
                            Company Name
                        </h3>
                    </div>
                    <div className="nl-focusable-container-elem" tabIndex="-1" style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: "crimson"}}>
                        <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                            Text Examp</p>
                        <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                            Text Examp</p>
                        <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                            Text Examp</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{backgroundImage: `url('${currentElemToolsState?.hero_background}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", 
                            borderBottomLeftRadius: 50, borderBottomRightRadius: 50, overflow: "hidden", height: 400}}>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: 20}}>
                        <h1 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{fontSize: 33, fontWeight: "bolder", textAlign: "center"}}>
                            Travel Safe!</h1>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: 10}}>
                        <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center"}}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                        </p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>
                        <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1" contentEditable={isEditMode} style={{cursor: "pointer", width: 300, margin: "auto", backgroundColor: "black", color: "white", borderRadius: 50, padding: 20, textAlign: "center"}}>
                            Book Now
                            <div className="nl-button-settings-container">
                                <p style={{fontSize: 13, color: "black", textAlign: "left"}}>
                                    <i style={{marginRight: 5}} className="fa-solid fa-globe"></i>
                                    Edit Button Link:</p>
                                <div>
                                    <input onInput={buttonUrlOnInput}
                                        style={{marginTop: 5, border: "none", backgroundColor: "rgba(0,0,0,0.07)", minWidth: 300, padding: 10, borderRadius: 50}} 
                                        value={currentElemToolsState?.buttonElemUrl} 
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: 10, marginTop: 10}}>
                        <h3 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "crimson", fontWeight: "bolder", marginBottom: 10}}>
                            Important Notice
                        </h3>
                        <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "red"}}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                        </p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div tabIndex="-1" className="nl-focusable-container-elem" style={{background: "skyblue", padding: "30px 10px", marginTop: 20}}>
                        <p style={{textAlign: "center"}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-envelope"></i>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                youremail@server.com
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-phone"></i>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                +1 234 322 3433
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-globe"></i>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                https://yourwebsite.com
                            </span>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>;
}

export default NewsLetterPreviewer;