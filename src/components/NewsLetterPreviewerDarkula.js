import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewer = (props) => {

    const {
        isEditMode,
        userDetails,
        currentElemToolsState,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleDragEnd,
        removeElement,
    } = props;

    const {
        business_name,
        logo_url,
        business_email,
        business_phone,
        business_facebook_link,
        business_twitter_link,
        business_instagram_link,
    } = userDetails.company_info;

    return <table onDragEnd={handleDragEnd} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragOver={handleDragOver} style={{width: "100%", borderSpacing: 0, backgroundColor: "rgb(0, 41, 59)"}}>
        <tbody>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" style={{background: "black", padding: 10}}>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                        <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{color: "white", fontSize: 13, textAlign: "center"}}>
                            Sed ut perspiciatis unde omnis iste natus error?</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" 
                        style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#003D4D", padding: "25px 20px"}}>
                        <img style={{height: 40, marginRight: 10}} src={LOGO_PLACEHOLDER} />
                        <h3 style={{color: "orange", fontFamily: 'courier'}} className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode}>
                            {business_name || "Company Name"}
                        </h3>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1"
                        style={{backgroundImage: `url('${currentElemToolsState?.background_image}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 400}}>
                        <div className="nl-focusable-container-elem" tabIndex="-1" style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                            <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                Text Examp</p>
                            <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                Text Examp</p>
                            <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                Text Examp</p>
                        </div>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: "40px 20px", paddingBottom: 0}}>
                        <h1 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} 
                            style={{fontSize: 33, fontWeight: "bolder", textAlign: "center", color: "rgb(134, 197, 255)"}}>
                            Travel Safe!</h1>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: 10}}>
                        <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} 
                            style={{textAlign: "center", color: "rgb(94, 217, 255)"}}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                            voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                        </p>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>
                        <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1" style={{marginTop: 10}}>
                            
                                <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1"
                                    style={{cursor: "pointer", width: 300, margin: "auto", textAlign: "center"}}>
                                    <a style={{textDecoration: "none"}} disabled={isEditMode} target="_blank" href={currentElemToolsState?.buttonElemUrl}>
                                        <p tabIndex="-1" contentEditable={isEditMode}
                                            style={{padding: 20, color: "white", backgroundColor: "black", borderRadius: 50}}>
                                            Visit Our Website</p>
                                    </a> 
                                    <div className="nl-button-settings-container">
                                        <p contentEditable={false} style={{fontSize: 13, color: "black", textAlign: "left"}}>
                                            <i style={{marginRight: 5}} className="fa-solid fa-globe"></i>
                                            Edit Button Link:</p>
                                        <div>
                                            <input
                                                style={{marginTop: 5, border: "none", backgroundColor: "rgba(0,0,0,0.07)", minWidth: 300, padding: 10, borderRadius: 50}} 
                                                value={currentElemToolsState?.buttonElemUrl} 
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            <div onClick={removeElement} className="nl-page-elem-delete-button">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{padding: 10, marginTop: 30}}>
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
                    <div tabIndex="-1" className="nl-focusable-container-elem" style={{padding: "30px 10px", marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{textAlign: "center", color: "rgb(134, 197, 255)"}}>
                            <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style={{marginRight: 10}} className="fa-solid fa-envelope"></i>
                            </span>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                youremail@server.com
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5, color: "rgb(134, 197, 255)"}}>
                            <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style={{marginRight: 10}} className="fa-solid fa-phone"></i>
                            </span>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                +1 234 322 3433
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5, color: "rgb(134, 197, 255)"}}>
                            <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style={{marginRight: 10}} className="fa-solid fa-globe"></i>
                            </span>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                https://yourwebsite.com
                            </span>
                        </p>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>;
}

export default NewsLetterPreviewer;